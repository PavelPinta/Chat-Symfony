<?php

namespace ChatBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Doctrine\ORM\EntityRepository;

class LastnameFormType extends AbstractType {

    public function buildForm(FormBuilderInterface $builder, array $options) {

        $builder->add('lastname', null, array('label' => 'form.lastname', 'translation_domain' => 'FOSUserBundle'));
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver) {
        $resolver->setDefaults(array(
            'required' => true,
            'label' => false,
            'compound' => true,
            'inherit_data' => true
        ));
    }

    public function getParent() {
        return 'text';
    }

    public function getName() {
        return 'test_lastname_type';
    }

}