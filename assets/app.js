// Importer le JS de Bootstrap
import 'bootstrap';
import 'leaflet'

// import 'flag-icons/css/flag-icons.min.css';

// Importer le JS
import './js/scrollToTop.js';
import './js/carte.js';

// Importer le SCSS

import './styles/_carousel.scss'
import './styles/_pmr.scss'
import './styles/_preReserv.scss'
import './styles/_prestations.scss'
import './styles/_reviews.scss'
import './styles/_home.scss'
import './styles/_buttons.scss'
import './styles/_gite.scss'

import './styles/app.scss';
// Importer les variables de traductions
import { trans, setLocale, getLocale } from '@symfony/ux-translator';
// Définir la langue courante
setLocale(getLocale());