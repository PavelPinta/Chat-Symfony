<?php

namespace ChatBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class MessagesController extends Controller {

    public function indexAction() {
        return $this->render('<h1>Hello!!! Ajax</h1>');
    }

    public function sendmsgAction() {

        $userid = 1;
        $c = new \ChatBundle\Entity\Message();
        $c->setUserid($userid);
        $c->setText($_POST['message']);
        $c->setCreateAt(new \DateTime(date('Y-m-d H:i:s')));
        $em = $this->getDoctrine()->getManager();
        $em->persist($c);
        $em->flush();

        return new JsonResponse($_POST);
    }

    public function loadMsgsAction($id, $action) {

        $msgs = array('data' => array(), 'action' => array());
        if ($id && !is_int($id))
            $id = explode('-', $id)[1];

        if (intval($id)) {
            if ($action == 'load-one') {
                $repository = $this->getDoctrine()->getRepository('ChatBundle:Message');
                $query = $repository->createQueryBuilder('p')
                        ->where('p.id > :id')
                        ->setParameter('id', $id)
                        ->orderBy('p.id', 'ASC')
                        ->getQuery();
                $getMsgs = $query->getResult();
                $msgs['action'] = 'load-one';
            } else if ($action == 'show-more') {
                $repository = $this->getDoctrine()->getRepository('ChatBundle:Message');
                $query = $repository->createQueryBuilder('p')
                        ->where('p.id < :id')
                        ->setParameter('id', $id)
                        ->orderBy('p.id', 'DESC')
                        ->setFirstResult(0)
                        ->setMaxResults(5)
                        ->getQuery();
                $getMsgs = $query->getResult();
                $msgs['action'] = 'show-more';
            } else {
                return new JsonResponse([false]);
            }
        } else {
            $count = count($this->getDoctrine()->getRepository('ChatBundle:Message')->findAll());
            if ($count < 11) {
                $count = 10;
            }
            $getMsgs = $this->getDoctrine()->getRepository('ChatBundle:Message')->findBy([], [], 10, ($count - 10));
            $msgs['action'] = 'load';
        }

        foreach ($getMsgs as $key => $val) {
            $msgs['data'][$key]['id'] = $val->getId();
            $msgs['data'][$key]['userid'] = $val->getUserId();
            $msgs['data'][$key]['text'] = $val->getText();
            $msgs['data'][$key]['create_at'] = $val->getCreateAt();
        }

        return new JsonResponse($msgs);
    }

    public function editMsgAction() {

        $userid = 1;

        $getMsg = $this->getDoctrine()->getRepository('ChatBundle:Message')->findBy(['id' => $_POST['id']])[0];

        if ($getMsg->getUserId() == $userid) {
            $getMsg->setText($_POST['message']);
            $getMsg->setEditAt(new \DateTime(date('Y-m-d H:i:s')));
            $em = $this->getDoctrine()->getManager();
            $em->persist($getMsg);
            $em->flush();

            return new JsonResponse(['action' => true, 'id' => $getMsg->getId(), 'text' => $getMsg->getText()]);
        } else {
            return new JsonResponse(['action' => false]);
        }

        return new JsonResponse(['action' => false]);
    }

}
