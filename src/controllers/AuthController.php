<?php

namespace App\controllers;

use App\exceptions\AuthControllerException;

class AuthController extends AbstractController
{
    /**
     * @throws AuthControllerException
     */
    public function login()
    {
        $handlers = $this->request->getInputHandler();
        switch ($handlers->get('disk')) {
            case 'yandex':
                if (empty($handlers->get('token'))) {
                    throw new AuthControllerException('Не указан token для авторизации YandexDisk');
                }
                $_SESSION['login'] = [
                    'disk' => 'yandex',
                    'token' => $handlers->get('token')
                ];
                break;
            default:
                throw new AuthControllerException('Не указан диск для авторизации');
        }
        return $this->response->json([
            'status' => 'success',
        ]);
    }

    public function unLogin()
    {
        unset($_SESSION['login']);
        return $this->response->json([
            'status' => 'success',
        ]);
    }

    public function check() {
        if(empty($_SESSION['login']['disk'])) {
           throw new AuthControllerException('Данные авторизации не найдены');
        }
        return $this->response->json([
            'status' => 'success',
            'disk' => $_SESSION['login']['disk']
        ]);
    }
}