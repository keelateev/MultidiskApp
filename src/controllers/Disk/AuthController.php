<?php

namespace App\Controllers\Disk;

use App\Controllers\AbstractController;
use App\Controllers\Application\Service;
use App\Controllers\Disk\Enum\DiskProviderEnum;
use App\exceptions\AuthControllerException;

class AuthController extends AbstractController
{
    /**
     * @throws AuthControllerException
     */
    public function login()
    {
        $handlers = $this->request->getInputHandler();
        switch ($handlers->value('disk')) {
            case 'yandex':
                if (empty($handlers->value('token'))) {
                    throw new AuthControllerException('Не указан token для авторизации YandexDisk');
                }
                Service::setSessionValue('login', [
                    'disk' => 'YANDEX',
                    'token' => $handlers->value('token')
                ]);
                break;
            default:
                throw new AuthControllerException('Не указан диск для авторизации');
        }
        $this->response->json([
            'status' => 'success',
        ]);
    }

    public function unLogin()
    {
        Service::setSessionValue('login', null);
        $this->response->json([
            'status' => 'success',
        ]);
    }

    /**
     * @throws AuthControllerException
     */
    public function check()
    {
        $session = Service::getSession();
        if (empty($session['login']['disk'])) {
            throw new AuthControllerException('Данные авторизации не найдены');
        }
        $this->response->json([
            'status' => 'success',
        ]);
    }
}