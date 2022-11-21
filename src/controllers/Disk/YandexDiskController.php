<?php

namespace App\Controllers\Disk;

use App\Controllers\AbstractController;
use App\Controllers\Application\Service;
use App\Exceptions\YandexDiskException;
use Arhitector\Yandex\Disk;

class YandexDiskController extends AbstractController implements DiskInterface
{
    private Disk $disk;
    private const PAGINATION_LIMIT = 20;

    public function __construct($token)
    {
        parent::__construct();
        $this->disk = new Disk($token);
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
    public function upload($handler): array
    {
        $currentPath = $handler->value('currentPath');
        $currentPath = ($currentPath) ? $currentPath . '/' : 'disk:/';

        if (!$_FILES['files']) {
            throw new YandexDiskException('Ошибка при получении файла на сервере');
        }

        foreach ($_FILES['files']['name'] as $key => $fileName) {
            $newFile = basename($fileName);
            $collection = $this->disk->getResource($currentPath . $newFile);
            $collection->upload($_FILES['files']['tmp_name'][$key], true);
        }


        return [
            'status' => 'success',
        ];
    }

    public function info($handler): array
    {
        return [
            'status' => 'success',
            'result' => [
                'user_name' => $this->disk->toArray()['user']['display_name'],
                'total_space' => $this->disk->toArray()['free_space'],
                'free_space' => $this->disk->toArray()['total_space'],
            ]
        ];
    }

    /**
     * @throws YandexDiskException
     */
    public function delete($handler): array
    {
        $resourcePath = $handler->value('resource');
        if (!$resourcePath) {
            throw new YandexDiskException('Ошибка в указании ресурса');
        }

        $resource = $this->disk->getResource('disk:/' . $resourcePath);
        $resource->delete();

        return [
            'status' => 'success',
        ];
    }

    /**
     * @throws YandexDiskException
     */
    public function download(DiskController $controller, $handler): string
    {
        $resourceDiskPath = $handler->value('path');
        $resourceType = $handler->value('type');
        $resourcePath = ($resourceType == 'dir') ? $resourceDiskPath . '.zip' : $resourceDiskPath;

        $localResource = $_SERVER['DOCUMENT_ROOT'] . '/../upload/' . basename($resourcePath);
        $resource = $this->disk->getResource('disk:/' . $resourceDiskPath);
        $resource->download($localResource, true);

        ob_end_clean();
        $controller->setDownloadHeader($localResource);
        readfile($localResource);
        unlink($localResource);
        exit();
    }

    /**
     * @throws YandexDiskException
     */
    public function rename($handler): array
    {
        $resourcePath = $handler->value('resource');
        if (!$resourcePath) {
            throw new YandexDiskException('Ошибка в указании ресурса');
        }

        $resource = $this->disk->getResource('disk:/' . $resourcePath);

        $newResource = explode('/', $resourcePath);
        $newResource[count($newResource) - 1] = $handler->value('newResourceName');
        $newResource = implode('/', $newResource);

        $resource->move($newResource);

        return [
            'status' => 'success',
        ];
    }

    public function resource($handler): array
    {
        $path = $handler->value('diskPath');
        $path = ($path !== '/') ? $path : '';
        $paginationPage = $handler->value('paginationPage');

        $offset = self::PAGINATION_LIMIT * ($paginationPage - 1);
        $previousPath = '';
        if ($path) {
            $previousPath = explode('/', $path);
            array_pop($previousPath);
            $previousPath = (implode('/', $previousPath)) ?: '/';
        }
        $currentPath = urldecode($path);
        $data = $this->prepareResponse(
            $this->disk->getResource('disk:/' . $currentPath, self::PAGINATION_LIMIT, $offset)
        );

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

        return [
            'status' => 'success',
            'currentPath' => $currentPath,
            'pagination' => $this->paginationInfo($currentPath, $offset, $paginationPage),
            'result' => $data
        ];
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