<?php

namespace App\Controllers\Disk;

use App\Controllers\AbstractController;
use App\Controllers\Application\Service;
use App\Controllers\Disk\Enum\DiskProviderEnum;
use App\Exceptions\DiskControllerException;
use UnexpectedValueException;

class DiskController extends AbstractController
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @throws DiskControllerException
     */
    public function diskAction($action)
    {
        try {
            $disk = Service::getSession()['login']['disk'];
            $controllerClass = DiskProviderEnum::$disk()->getValue();
            $controller = new $controllerClass(Service::getSession()['login']['token']);

            try {
                $handler = $this->request->getInputHandler();
                if ($action === 'download') {
                    $localResource = $controller->$action($handler);
                    $this->setDownloadHeader($localResource);
                    $controller->getDownloadFile($localResource);
                } else {
                    $this->response->json($controller->$action($handler));
                }
            } catch (\Exception $exception) {
                throw new DiskControllerException($exception->getMessage());
            }
        } catch (UnexpectedValueException $exception) {
            throw new DiskControllerException('Неизвестное облачно хранилище');
        }
    }
}