<?php

namespace App\Controllers;

use App\Controllers\Application\Service;

class VueController extends AbstractController
{
    public function run()
    {
        return $this->renderTemplate(Service::getDocumentRoot() . '/../src/views/vue/vue_page.php');
    }
}