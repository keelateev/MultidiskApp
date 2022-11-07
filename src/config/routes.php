<?php

use App\Exceptions\{
    NotAuthorizedHttpException,
    YandexDiskException
};
use App\Middlewares\{
    ProccessRawBody
};
use Pecee\{
    Http\Request,
    SimpleRouter\SimpleRouter as Router
};

const PROD = false;

session_start();

Router::setDefaultNamespace('App\Controllers');

Router::get('/', 'VueController@run');

Router::group([
    'prefix' => 'api/v1',
    'middleware' => [
        ProccessRawBody::class
    ]
], function () {

    Router::get('/auth/check/', 'AuthController@check');
    Router::get('/auth/unlogin/', 'AuthController@unLogin');
    Router::get('/auth/login/', 'AuthController@login');
    Router::post('/disk/yandex/delete/', 'YandexDiskController@deleteFile');
    Router::post('/disk/yandex/rename/', 'YandexDiskController@renameFile');
    Router::post('/disk/yandex/download/', 'YandexDiskController@downloadFile');
    Router::post('/disk/yandex/upload/', 'YandexDiskController@uploadFile');
    Router::post('/disk/yandex/info/', 'YandexDiskController@getDiskInfo');
    Router::post('/disk/yandex/resource/', 'YandexDiskController@getResource');
    Router::post('/disk/yandex/resource/{path}', 'YandexDiskController@getResource')
        ->where(['path' => '.*|']);
});

Router::get('/controller', 'VueController@run')
    ->setMatch('/\/([\w]+)/');

Router::error(function (Request $request, Exception $exception) {
    $response = Router::response();
    switch (get_class($exception)) {
        case Exception::class:
        case YandexDiskException::class:
        {
            $response->httpCode(500);
            break;
        }
        case NotAuthorizedHttpException::class:
        {
            $response->httpCode(401);
            break;
        }
    }
    if (PROD) {
        return $response->json([]);
    } else {
        return $response->json([
            'status' => 'error',
            'message' => $exception->getMessage()
        ]);
    }
});

