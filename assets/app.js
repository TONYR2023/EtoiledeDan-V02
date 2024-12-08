
// Importer le JS de Bootstrap
import 'bootstrap';

// Importer le CSS de Bootstrap (au cas où vous l'auriez besoin ici aussi)
import 'bootstrap/dist/css/bootstrap.css';

import './styles/app.scss';
import './styles/_backgroundImage.scss'
import './styles/_carousel.scss'
// import './styles/_custom.scss'
import './styles/_footer.scss'
import './styles/_header.scss'
import './styles/_options.scss'
import './styles/_preReserv.scss'
import './styles/_prestations.scss'

// import './bootstrap'
require('bootstrap')

import { setLocale, getLocale, trans } from '@symfony/ux-translator';
// Récupérer la locale actuelle
console.log('Current locale:', getLocale());
// Définir une nouvelle locale
setLocale('fr');
