<?php

namespace App\Controller;

use App\Service\CacheClearer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted("ROLE_ADMIN")]
class CacheController extends AbstractController
{
    #[Route('/cacheClear', 'cache-clear')]
    public function cacheClear(CacheClearer $cacheClearer): Response
    {
        try {
            $cacheClearer->cacheClear();

            return new Response('Cache cleared successfully!');
        } catch (\Exception $e) {
            return new Response('An error occurred: ' . $e->getMessage());
        }
    }
}