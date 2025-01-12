import { Controller } from "@hotwired/stimulus";
import * as TranslatorModule from "@symfony/ux-translator";

export default class extends Controller {
    static targets = ["output"]; // Déclare une cible pour afficher les traductions

    connect() {
        // Initialiser la langue par défaut
        TranslatorModule.setLocale(document.documentElement.lang || "en");
        this.updateTranslation();
    }

    switchLanguage(event) {
        const locale = event.target.dataset.locale; // Récupérer la langue depuis l'attribut data-locale
        TranslatorModule.setLocale(locale);
        this.updateTranslation();
    }

    updateTranslation() {
        // Met à jour le contenu traduit
        if (this.hasOutputTarget) {
            this.outputTarget.textContent = TranslatorModule.trans("navbar.home");
        }
    }
}
