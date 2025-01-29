<?php

namespace App\Controller;

use App\Entity\Review;
use App\Form\ReviewType; // Assure-toi d'avoir créé le formulaire ReviewType
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Annotation\Route;

class ReviewController extends AbstractController
{
    #[Route('/review/new', name: 'review_new')]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        // Création d'une nouvelle entité Review
        $review = new Review();

        // Création du formulaire
        $form = $this->createForm(ReviewType::class, $review);
        $form->handleRequest($request);

        // Si le formulaire est soumis et valide
        if ($form->isSubmitted() && $form->isValid()) {
            // Sauvegarder le commentaire en base de données
            $entityManager->persist($review);
            $entityManager->flush();

            // Ajouter un message flash de succès
            $this->addFlash('success', 'Votre commentaire a été ajouté avec succès.');

            // Redirection après l'ajout du commentaire
            return $this->redirectToRoute('accueil'); // Redirige vers la page accueil
        }

        // Si le formulaire n'est pas soumis ou n'est pas valide, afficher la page de formulaire
        return $this->render('review/new.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/review/approve/{id}', name: 'review_approve')]
    public function approve(Review $review, EntityManagerInterface $entityManager): RedirectResponse
    {
        $review->setIsApproved(true);
        $entityManager->flush();

        $this->addFlash('success', 'L\'avis a été approuvé.');

        return $this->redirectToRoute('app_booked_index');
    }

    #[Route('/review/reject/{id}', name: 'review_reject')]
    public function reject(Review $review, EntityManagerInterface $entityManager): RedirectResponse
    {
        $entityManager->remove($review);
        $entityManager->flush();

        $this->addFlash('success', 'L\'avis a été rejeté.');

        return $this->redirectToRoute('app_booked_index');
    }
}
