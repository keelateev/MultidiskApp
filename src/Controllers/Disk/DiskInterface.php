<?php

namespace App\Controllers\Disk;

use Pecee\Http\Input\InputHandler;

interface DiskInterface
{

    public function delete(InputHandler $handler): array;

    public function rename(InputHandler $handler): array;

    public function download(DiskController $controller, InputHandler $handler): string;

    public function upload(InputHandler $handler): array;

    public function info(InputHandler $handler): array;

    public function resource(InputHandler $handler): array;
}