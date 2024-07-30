namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Presta\SitemapBundle\Service\SitemapServiceInterface;

class SitemapController extends AbstractController
{
public function index(SitemapServiceInterface $sitemap): Response
{
// Ajouter des URLs au sitemap
$sitemap->addUrl($this->generateUrl('homepage'), new \DateTime(), 'daily', 1.0);

// Ajoutez ici toutes les autres URLs que vous souhaitez inclure
$sitemap->addUrl($this->generateUrl('contact'), new \DateTime(), 'monthly', 0.8);

return $sitemap->renderResponse();
}
}