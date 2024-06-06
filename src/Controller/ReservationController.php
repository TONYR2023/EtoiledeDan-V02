<?php

namespace App\Controller;

use App\Repository\BookedRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ReservationController extends AbstractController
{
    #[Route('/reservation', name: 'app_reservation')]
    public function index(BookedRepository $bookedRepository): Response
    {
        $bookeds = $bookedRepository->findAllById();

        $reserved = [];

        foreach ($bookeds as $booked) {
            $endDate = $booked->getDateFin();
            $endDate->modify('+1 day');

            $reserved [] = [
                'startDate' => date('M d Y', $booked->getDateDebut()->getTimestamp()),
                'endDate' => date('M d Y', $endDate->getTimestamp())];
        }

        return $this->render('reservation/reservation.twig', [
            'reserved' => $reserved,
        ]);
    }
}
