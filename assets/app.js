// Importer le JS de Bootstrap
import 'bootstrap';

// Importer le CSS de Bootstrap (au cas où vous l'auriez besoin ici aussi)
import 'bootstrap/dist/css/bootstrap.css';

import './styles/app.scss';
import './styles/_backgroundImage.scss'
import './styles/_carousel.scss'
import './styles/_pmr.scss'
import './styles/_footer.scss'
import './styles/_header.scss'
import './styles/_preReserv.scss'
import './styles/_prestations.scss'
import './styles/_reviews.scss'
import './styles/_home.scss'
import './styles/_buttons.scss'

// import './bootstrap'
//require('bootstrap')

import { trans, setLocale, getLocale } from '@symfony/ux-translator';

// Définir la langue courante
setLocale('fr');

