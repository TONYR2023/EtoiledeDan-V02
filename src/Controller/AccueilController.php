<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AccueilController extends AbstractController
{

    #[Route('/', name: 'accueil')]
    public function index(): Response
    {
        return $this->render('accueil/index.html.twig');
    }

    #[Route('/notre-gite', name: 'gite')]
    public function gite(): Response
    {
        return $this->render('landingpage/gite.twig');
    }

    #[Route('/prestations', name: 'prestations')]
    public function prestations(): Response
    {
        return $this->render('landingpage/prestations.twig');
    }

    #[Route('/tourisme', name: 'tourisme')]
    public function tourisme(): Response
    {
        return $this->render('landingpage/tourisme.twig');
    }

    #[Route('/informations', name: 'informations')]
    public function informations(): Response
    {
        return $this->render('landingpage/informations.twig');
    }

    #[Route('/magazine', name: 'magazine')]
    public function magazine(): Response
    {
        return $this->render('landingpage/magazine.twig');
    }

    #[Route('/pmr', name: 'pmr')]
    public function pmr(): Response
    {
        return $this->render('landingpage/pmr.twig');
    }
    #[Route('/cgu', name: 'cgu')]
    public function cgu(): Response
    {
        return $this->render('landingpage/cgu.twig');
    }

    #[Route('/mentions-legales', name: 'mentionsLegales')]
    public function mentionsLegales(): Response
    {
        return $this->render('landingpage/mentionsLegales.twig');
    }
}
