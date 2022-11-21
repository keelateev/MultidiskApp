<?php

namespace App\Controllers;

use Pecee\Http\Request;
use Pecee\Http\Response;
use Pecee\SimpleRouter\SimpleRouter as Router;

abstract class AbstractController
{
    protected Response $response;
    protected Request $request;

    public function __construct()
    {
        $this->request = Router::router()->getRequest();
        $this->response = new Response($this->request);
    }

    public function renderTemplate($template)
    {
        ob_start();
        include $template;
        return ob_get_clean();
    }

    public function setCors()
    {
        $this->response->header('Access-Control-Allow-Origin: *');
        $this->response->header('Access-Control-Request-Method: OPTIONS');
        $this->response->header('Access-Control-Allow-Credentials: true');
        $this->response->header('Access-Control-Max-Age: 3600');
    }

    public function setDownloadHeader($file)
    {
        $this->response->header('Content-Description: File Transfer');
        $this->response->header('Content-Transfer-Encoding: binary');
        $this->response->header('Content-Type: ' . mime_content_type($file));
        $this->response->header('Content-Disposition: attachment; filename=' . basename($file));
        $this->response->header('Content-Length: ' . filesize($file));
    }
}