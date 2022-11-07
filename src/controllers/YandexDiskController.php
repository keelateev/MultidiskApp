<?php

namespace App\Controllers;

use App\Exceptions\YandexDiskException;
use Arhitector\Yandex\Disk;

class YandexDiskController extends AbstractController
{
    private string $token;
    private Disk $disk;
    private const PAGINATION_LIMIT = 20;

    public function __construct()
    {
        parent::__construct();
        $this->token = $_SESSION['login']['token'];
        $this->disk = new Disk($this->token);
    }

    private function prepareResponse($collection): array
    {
        $response = [];
        $items = $collection->get('items')->toArray();
        foreach ($items as $item) {
            $dataElement = $item->toArray();
            $response[] = [
                'type' => ($item->isDir()) ? 'dir' : 'file',
                'name' => $dataElement['name'],
                'path' => ltrim($dataElement['path'], 'disk:/'),
                'size' => ($dataElement['size']) ?? 0,
                'actions' => ['rename', 'delete', 'download']
            ];
        }
        return $response;
    }

    /**
     * @throws YandexDiskException
     */
    public function uploadFile()
    {
        $currentPath = ($_POST['currentPath']) ? $_POST['currentPath'] . '/' : 'disk:/';
        if (!$_FILES['files']) {
            throw new YandexDiskException('Ошибка при получении файла на сервере');
        }
        foreach ($_FILES['files']['name'] as $key => $fileName) {
            $newFile = basename($fileName);
            $collection = $this->disk->getResource($currentPath . $newFile);
            $collection->upload($_FILES['files']['tmp_name'][$key], true);
        }


        return $this->response->json([
            'status' => 'success',
        ]);
    }

    public function getDiskInfo()
    {
        return $this->response->json([
            'status' => 'success',
            'result' => [
                'user_name' => $this->disk->toArray()['user']['display_name'],
                'total_space' => $this->disk->toArray()['free_space'],
                'free_space' => $this->disk->toArray()['total_space'],
            ]
        ]);
    }

    /**
     * @throws YandexDiskException
     */
    public function deleteFile()
    {
        if (empty($_POST) || empty($_POST['resource'])) {
            throw new YandexDiskException('Ошибка в указании ресурса');
        }
        $resourcePath = $_POST['resource'];

        $resource = $this->disk->getResource('disk:/' . $resourcePath);
        $resource->delete();

        return $this->response->json([
            'status' => 'success',
        ]);
    }

    /**
     * @throws YandexDiskException
     */
    public function downloadFile()
    {
        if (empty($_POST) || empty($_POST['resource'])) {
            throw new YandexDiskException('Ошибка в указании ресурса');
        }
        $resourcePath = $_POST['resource'];
        $resourceName = basename($resourcePath);
        $localResource = $_SERVER['DOCUMENT_ROOT'] . '/../upload/' . $resourceName;

        $resource = $this->disk->getResource('disk:/' . $resourcePath);

        $resource->download($localResource, true);
        ob_end_clean();

        $this->setDownloadHeader($localResource);
        readfile($localResource);
        unlink($localResource);
        exit();
    }

    /**
     * @throws YandexDiskException
     */
    public function renameFile() {
        if (empty($_POST) || empty($_POST['resource']) || empty($_POST['newResourceName'])) {
            throw new YandexDiskException('Ошибка в указании ресурса или нового имени');
        }
        $resourcePath = $_POST['resource'];
        $newResource = explode('/',$resourcePath);
        $newResource[count($newResource) - 1] = $_POST['newResourceName'];
        $newResource = implode('/', $newResource);
        $resource = $this->disk->getResource('disk:/' . $resourcePath);
        $resource->move($newResource);

        return $this->response->json([
            'status' => 'success',
        ]);
    }

    public function getResource($path = '')
    {
        $paginationPage = $_POST['page'];
        $offset = self::PAGINATION_LIMIT * ($paginationPage - 1);
        $previousPath = '';
        if ($path) {
            $previousPath = explode('/', $path);
            array_pop($previousPath);
            $previousPath = (implode('/', $previousPath)) ?: '/';
        }
        $currentPath = urldecode($path);
        $data = $this->prepareResponse($this->disk->getResource('disk:/' . $currentPath,self::PAGINATION_LIMIT, $offset ));

        if ($previousPath) {
            $data = array_merge([
                -1 => [
                    'type' => 'dir',
                    'name' => 'Назад',
                    'path' => $previousPath,
                    'size' => 0,
                    'actions' => []
                ]
            ], $data);
        }
        return $this->response->json([
            'status' => 'success',
            'currentPath' => $currentPath,
            'pagination' => $this->paginationInfo($currentPath, $offset, $paginationPage),
            'result' => $data
        ]);
    }

    public function paginationInfo($currentPath, $offset, $paginationPage): array
    {
        $collection = $this->disk->getResource('disk:/' . $currentPath, 50, $offset)->get('items')->toArray();
        return [
            'current' => (int)$paginationPage,
            'allow' => (int)(count($collection) / 20)
        ];
    }
}