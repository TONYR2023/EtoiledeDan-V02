// assets/translator.js

/*
 * This file is part of the Symfony UX Translator package.
 *
 * If folder "../var/translations" does not exist, or some translations are missing,
 * you must warmup your Symfony cache to refresh JavaScript translations.
 *
 * If you use TypeScript, you can rename this file to "translator.ts" to take advantage of types checking.
 */

import { trans, getLocale, setLocale, setLocaleFallbacks } from '@symfony/ux-translator';
import { localeFallbacks } from '../var/translations/configuration';

setLocaleFallbacks(localeFallbacks);

export { trans };

<<<<<<< HEAD
export * from '../var/translations';


import { setLocale, getLocale, trans } from '@symfony/ux-translator';
// Récupérer la locale actuelle
console.log('Current locale:', getLocale());
// Définir une nouvelle locale
setLocale('fr');
=======
export * from '../var/translations';
>>>>>>> 934c314924fad945bb73f051126fbd4564a29d9c
