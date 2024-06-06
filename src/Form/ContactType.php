<?php

namespace App\Form;

use App\Dto\ContactDto;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nom', TextType::class, [
                'mapped' => false,
                'required' => true,
                'constraints' => [
                    new Length([
                        'min' => 2,
                        'max' => 20
                    ]),

                ]
            ])
            ->add('prenom', TextType::class, [
                'mapped' => false,
                'required' => true,
                'constraints' => [
                    new Length([
                        'min' => 2,
                        'max' => 20
                    ]),

                ]
            ])
            ->add('email', EmailType::class, [
                'mapped' => false,
                'required' => true,
                'constraints' => [
                    new Email(),
                ]
            ])
            ->add('phone', TextType::class, [
                'mapped' => false,
                'required' => true,
                'constraints' => [
                    new Length([
                        'min' => 2,
                        'max' => 20
                    ]),
                    new Regex(
                        '/^\+31\(0\)([0-9]{10})$/',
                    )
                ]
            ])
            ->add('message', TextareaType::class, [
                'mapped' => false,
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ContactDto::class
        ]);
    }
}
