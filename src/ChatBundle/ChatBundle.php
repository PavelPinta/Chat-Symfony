<?php

namespace ChatBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class ChatBundle extends Bundle {

    public function getParent() {
        return 'FOSUserBundle';
    }

}
