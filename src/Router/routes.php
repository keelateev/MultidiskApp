<?php

use App\Controllers\VueController;
use App\Controllers\Disk\{AuthController, DiskController};
use App\Exceptions\{NotAuthorizedHttpException, YandexDiskException};
use App\Middlewares\{ProccessRawBody};
use Pecee\{Http\Request, SimpleRouter\SimpleRouter as Router};

session_start();

Router::get('/', [VueController::class, 'run']);

Router::group([
    'prefix' => 'api/v1',
    'middleware' => [
        ProccessRawBody::class
    ]
], function () {
    Router::get('/auth/check/', [AuthController::class, 'check']);
    Router::get('/auth/unlogin/', [AuthController::class, 'unLogin']);
    Router::get('/auth/login/', [AuthController::class, 'login']);
    Router::post('/disk/{action}/', [DiskController::class, 'diskAction']);
});

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
    $response->json([
        'status' => 'error',
        'message' => $exception->getMessage()
    ]);
});

