<?php

namespace App\Controller;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Attribute\Route;

class ContactController extends AbstractController
{
    private const MY_EMAIL = 'contact@etoilededan.fr';

    #[Route('/contact', name: 'app_contact')]
    public function index(Request $r, MailerInterface $mailer): Response
    {
        $datas = $r->request->all();

        if ($datas) {
            if ($this->checkField($datas['nom']) &&
                $this->checkField($datas['prenom']) &&
                filter_var($datas['mail'], FILTER_VALIDATE_EMAIL) &&
                $this->checkField($datas['telephone'], 10) &&
                $this->checkField($datas['description'], 10)) {
                $email = (new TemplatedEmail())
                    ->from($datas['mail'])
                    ->to(self::MY_EMAIL)
                    ->subject("Contact pour le gîte étoile de dan")
                    ->context($datas)
                    ->htmlTemplate('contact/contact.html.twig')
                    ->textTemplate('contact/contact.text.twig');
                try {
                    $mailer->send($email);

                    $this->addFlash("info", "Votre email à bien été envoyé");
                    return $this->redirectToRoute('accueil');
                } catch (TransportExceptionInterface $e) {
                    $this->addFlash("info", "Une erreur est survenue lors de l'envoi du mail <br>" . $e->getMessage());

                    return $this->redirectToRoute('accueil');
                }
            } else {
                $this->addFlash("info", "Veuillez remplir tous les champs correctement");
                return $this->redirectToRoute('accueil');
            }
        }

        return $this->render('contact/index.html.twig');
    }

    #[Route('/email', methods: ['POST'])]
    public function sendEmail(Request $r, MailerInterface $mailer): Response
    {
        $datas = $r->request->all();

        if ($datas) {

            if ($this->checkField($datas['selectedDates']) &&
                $this->checkField($datas['prix']) && (int)$datas['prix'] > 2000 &&
                $this->checkField($datas['nom']) &&
                $this->checkField($datas['prenom']) &&
                filter_var($datas['mail'], FILTER_VALIDATE_EMAIL) &&
                $this->checkField($datas['telephone'], 10) &&
                $this->checkField($datas['description'], 10)) {
                $datas['dates'] = explode(',', $datas['selectedDates']);
                $datas['dates'][0] = (new \DateTime(substr($datas['dates'][0], 0, 34)))->format("d/m/Y");
                $datas['dates'][1] = (new \DateTime(substr($datas['dates'][1], 0, 34)))->format("d/m/Y");

                // TODO Refaire le même calcul que celui qui est fait en JS
//            if(isset($datas['nbrPersonne'])) {
//                $datas['prix'] += 25*$datas['nbrPersonne'];
//            }

                $email = (new TemplatedEmail())
                    ->from($datas['mail'])
                    ->to(self::MY_EMAIL)
                    ->subject("Pré-réservation gîtes de l'étoile de dan")
                    ->context($datas)
                    ->htmlTemplate('contact/email.reservation.twig')
                    ->textTemplate('contact/email.text.reservation.twig');

                try {
                    $mailer->send($email);

                    return $this->json(['success' => true]);
                } catch (TransportExceptionInterface $e) {
                    return $this->json([
                        'messageError' => $e->getMessage(),
                        'success' => false
                    ]);
                }
            } else {
                return $this->json([
                        'success' => false,
                        'messageError' => "Veuillez remplir tous les champs correctement",
                        'selectedDates' => $this->checkField($datas['selectedDates']),
                        'prix' => (int)$datas['prix'],
                        'nom' => $this->checkField($datas['nom']),
                        'prenom' => $this->checkField($datas['prenom']),
                        'mail' => filter_var($datas['mail'], FILTER_VALIDATE_EMAIL),
                        'telephone' => $this->checkField($datas['telephone'], 10),
                        'description' => $this->checkField($datas['description'], 10),
                        'options' => [
                            'visite' => $this->checkField($datas['visite']),
                            'degustation' => $this->checkField($datas['degustation']),
                            'breakfast' => $this->checkField($datas['breakfast']),
                            'nbrPersonne' => $this->checkField($datas['nbrPersonne']),
                            'massage' => $this->checkField($datas['massage']),
                            'chef' => $this->checkField($datas['chef']),
                        ]
                    ]
                );
            }
        }

        return $this->json([
            'success' => false,
            'messageError' => "Veuillez remplir les champs "
        ]);
    }

    private function checkField(mixed &$field, $length = 2): bool
    {
        return (!empty($field) && strlen($field) >= $length) ? true : false;
    }
}
