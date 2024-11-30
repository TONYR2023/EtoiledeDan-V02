<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

/// class qui controlle la traduction
class LanguageController extends AbstractController
{
    #[Route('/switch-language/{_locale}', name: 'switch_language', requirements: ['_locale' => 'en|fr'])]
    public function switchLanguage(
        string $_locale,
        SessionInterface $session,
        Request $request
    ): RedirectResponse {
        /// Obtenir l'URL actuelle
        $referer = $request->headers->get('referer'); // Référence l'URL précédente

        if (!$referer) {
            // Si aucune URL précédente, rediriger vers l'accueil
            return $this->redirectToRoute('home_index', ['_locale' => $_locale]);
        }

        // Extraire uniquement le chemin à partir de l'URL référente
        $path = parse_url($referer, PHP_URL_PATH);

        // Remplacer la langue dans le chemin
        $updatedPath = preg_replace('/^\/[a-z]{2}/', '/' . $_locale, $path);


        // Mettre à jour la langue dans la session
        $session->set('_locale', $_locale);

        // Rediriger vers la bonne URL
        return $this->redirect($updatedPath);
    }
}
