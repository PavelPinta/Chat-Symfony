<?php

namespace ChatBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ChatController extends Controller {

    public function indexAction() {
        return $this->render('ChatBundle:Chat:main.html.twig');
    }

}
