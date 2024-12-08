import React from "react"
import ReactDOM from 'react-dom/client'
import PrereservPage from "./pages/PrereservPage";

require('bootstrap');

console.log('Démarrage du script presreserv.js');

const presreservElement = document.getElementById('presreserv');
if (!presreservElement) {
    console.error('Élément avec l\'id "presreserv" non trouvé');
} else {
    console.log('Élément "presreserv" trouvé');

    const root = ReactDOM.createRoot(presreservElement);
    root.render(
        <React.Fragment>
            <PrereservPage />
        </React.Fragment>
    );
    console.log('Composant React rendu');
}