<?php

namespace App\Form;

use App\Dto\PreReservationDto;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PreReservationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('contact', ContactType::class)
            ->add('dateDebut', DateType::class)
            ->add('dateFin', DateType::class)
            ->add('degustation', CheckboxType::class)
            ->add('degustation', CheckboxType::class)
            ->add('degustation', CheckboxType::class)
            ->add('degustation', CheckboxType::class)
            ->add('degustation', CheckboxType::class)
            ->add('degustation', CheckboxType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PreReservationDto::class
        ]);
    }
}
