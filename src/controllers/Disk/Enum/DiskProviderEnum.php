<?php

namespace App\Controllers\Disk\Enum;

use App\Controllers\Disk\YandexDiskController;
use MyCLabs\Enum\Enum;

class DiskProviderEnum extends Enum
{
    const YANDEX = YandexDiskController::class;
}