<?php

namespace ChatBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class LoginController extends Controller {

    public function indexAction() {
        return $this->render('ChatBundle:Login:index.html.twig');
    }

}
