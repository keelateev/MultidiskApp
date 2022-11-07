<?php

namespace App\Controllers;

class VueController extends AbstractController
{
    public function run()
    {
        return $this->renderTemplate($_SERVER['DOCUMENT_ROOT'] . '/../src/views/vue/vue_page.php');
    }
}