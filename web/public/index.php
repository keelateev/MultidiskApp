<?php

use Pecee\SimpleRouter\SimpleRouter as Router;

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

require_once ($_SERVER['DOCUMENT_ROOT'] . '/../src/vendor/autoload.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/../src/config/routes.php');

try {
    Router::start();
} catch (Throwable $e) {

}