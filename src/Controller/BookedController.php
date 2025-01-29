<?php

namespace App\Controller;

use App\Entity\Booked;
use App\Entity\Review;
use App\Form\BookedType;
use App\Repository\BookedRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/booked')]
#[IsGranted("ROLE_ADMIN")]
class BookedController extends AbstractController
{
    #[Route('/', name: 'app_booked_index', methods: ['GET'])]
    public function index(BookedRepository $bookedRepository, EntityManagerInterface $entityManager): Response
    {
        // Récupérer toutes les réservations
        $bookeds = $bookedRepository->findAll();

        // Récupérer les avis qui ne sont pas encore validés
        $reviewsToValidate = $entityManager->getRepository(Review::class)->findBy([
            'isApproved' => false,
        ]);

        // Récupérer les avis validés
        $approvedReviews = $entityManager->getRepository(Review::class)->findBy([
            'isApproved' => true,
        ]);

        return $this->render('booked/index.html.twig', [
            'bookeds' => $bookeds,
            'reviewsToValidate' => $reviewsToValidate,
            'approvedReviews' => $approvedReviews,
        ]);
    }


    #[Route('/new', name: 'app_booked_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $booked = new Booked();
        $form = $this->createForm(BookedType::class, $booked);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $booked->setUser($this->getUser());
            $entityManager->persist($booked);
            $entityManager->flush();

            return $this->redirectToRoute('app_booked_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('booked/new.html.twig', [
            'booked' => $booked,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_booked_show', methods: ['GET'])]
    public function show(Booked $booked): Response
    {
        return $this->render('booked/show.html.twig', [
            'booked' => $booked,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_booked_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Booked $booked, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(BookedType::class, $booked);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $booked->setUser($this->getUser());
            $entityManager->flush();

            return $this->redirectToRoute('app_booked_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('booked/edit.html.twig', [
            'booked' => $booked,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_booked_delete', methods: ['POST'])]
    public function delete(Request $request, Booked $booked, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$booked->getId(), $request->getPayload()->get('_token'))) {
            $entityManager->remove($booked);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_booked_index', [], Response::HTTP_SEE_OTHER);
    }
}
