<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\HttpFoundation\Response;

class LanguageController extends AbstractController
{
   #[Route('/public-translations/messages+intl-icu.{_locale}.yaml', name: 'public_translations', requirements: ['_locale' => 'en|fr'])]
public function publicTranslation(string $_locale): Response
{
    $path = __DIR__.'/../../public/messages+intl-icu.' . $_locale . '.yaml';

    if (!file_exists($path)) {
        return new Response('Fichier introuvable', 404);
    }

    $translations = Yaml::parseFile($path);
    return new Response(json_encode($translations), 200, ['Content-Type' => 'application/json']);
}


    #[Route('/test', name: 'test_route')]
public function test(): Response
{
    return new Response('Test réussi!');
}


    #[Route('/switch-language/{_locale}', name: 'switch_language', requirements: ['_locale' => 'en|fr'])]
    public function switchLanguage(
        string $_locale,
        SessionInterface $session,
        Request $request
    ): RedirectResponse {
        $referer = $request->headers->get('referer');
        if (!$referer) {
            return $this->redirectToRoute('home_index', ['_locale' => $_locale]);
        }

        $path = parse_url($referer, PHP_URL_PATH);
        $updatedPath = preg_replace('/^\/[a-z]{2}/', '/' . $_locale, $path);
        $session->set('_locale', $_locale);

        return $this->redirect($updatedPath);
    }
}
