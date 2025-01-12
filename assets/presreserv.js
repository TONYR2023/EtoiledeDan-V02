import React from "react"
import ReactDOM from 'react-dom/client'
import PrereservPage from "./pages/PrereservPage";

require('bootstrap');

console.log('Démarrage du script presreserv.js');
console.log("Valeur de window.locale avant passage à React :", window.locale);
const locale = window.locale;
console.log("Locale transmis à React :", locale);


const presreservElement = document.getElementById('presreserv');
if (!presreservElement) {
    console.error('Élément avec l\'id "presreserv" non trouvé');
} else {
    console.log('Élément "presreserv" trouvé');

    const root = ReactDOM.createRoot(presreservElement);
    root.render(
        <React.Fragment>
            <PrereservPage initialLocale={locale} />
        </React.Fragment>
    );
    console.log('Composant React rendu');
}


