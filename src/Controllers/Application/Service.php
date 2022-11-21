<?php

namespace App\Controllers\Application;

class Service
{
    public static function getSession(): array
    {
        return ($_SESSION) ?: [];
    }

    public static function getServer(): array
    {
        return ($_SERVER) ?: [];
    }

    public static function getDocumentRoot()
    {
        return (self::getServer()['DOCUMENT_ROOT']) ?: '';
    }

    public static function setSessionValue($name, $value)
    {
        $_SESSION[$name] = $value;
    }

}