<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;


class AccueilController extends AbstractController
{
    // Route de redirection pour la racine '/'
    #[Route('/', name: 'app_home_redirect', requirements: ['_locale' => 'fr|en'])]
    public function redirectToDefaultLanguage(Request $request): Response
    {
        // Utilise la langue par défaut (fr) ou la langue du navigateur
        $locale = $request->getPreferredLanguage(['fr', 'en']) ?: 'fr';  // Choisit 'fr' par défaut si aucune langue préférée
        return $this->redirectToRoute('accueil', ['_locale' => $locale]);  // Redirige vers la page d'accueil avec la langue choisie
    }

    // Route pour la page d'accueil dans la langue spécifiée
    #[Route('/{_locale}/', name: 'accueil', requirements: ['_locale' => 'fr|en'])]
    public function index(): Response
    {
        return $this->render('accueil/index.html.twig');
    }

    #[Route('/{_locale}/notre-gite', name: 'gite', requirements: ['_locale' => 'fr|en'])]
    public function gite(): Response
    {
        return $this->render('landingpage/gite.twig');
    }

    #[Route('/{_locale}/prestations', name: 'prestations', requirements: ['_locale' => 'fr|en'])]
    public function prestations(): Response
    {
        return $this->render('landingpage/prestations.twig');
    }

    #[Route('/{_locale}/tourisme', name: 'tourisme', requirements: ['_locale' => 'fr|en'])]
    public function tourisme(): Response
    {
        return $this->render('landingpage/tourisme.twig');
    }

    #[Route('/{_locale}/informations', name: 'informations', requirements: ['_locale' => 'fr|en'])]
    public function informations(): Response
    {
        return $this->render('landingpage/informations.twig');
    }

    #[Route('/{_locale}/magazine', name: 'magazine', requirements: ['_locale' => 'fr|en'])]
    public function magazine(): Response
    {
        return $this->render('landingpage/magazine.twig');
    }

    #[Route('/{_locale}/pmr', name: 'pmr', requirements: ['_locale' => 'fr|en'])]
    public function pmr(): Response
    {
        return $this->render('landingpage/pmr.twig');
    }
    #[Route('/{_locale}/famille', name: 'famille', requirements: ['_locale' => 'fr|en'])]
    public function famille(): Response
    {
        return $this->render('landingpage/famille.twig');
    }
    #[Route('/{_locale}/architecture', name: 'architecture', requirements: ['_locale' => 'fr|en'])]
    public function architecture(): Response
    {
        return $this->render('landingpage/architecture.twig');
    }
    #[Route('/{_locale}/cgu', name: 'cgu')]
    public function cgu(): Response
    {
        return $this->render('landingpage/cgu.twig', requirements: ['_locale' => 'fr|en']);
    }

    #[Route('/{_locale}/mentions-legales', name: 'mentionsLegales', requirements: ['_locale' => 'fr|en'])]
    public function mentionsLegales(): Response
    {
        return $this->render('landingpage/mentionsLegales.twig');
    }
}
