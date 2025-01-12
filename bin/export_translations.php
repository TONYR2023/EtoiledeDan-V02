<?php 

use Symfony\Component\Translation\TranslatorInterface;
use Symfony\Component\Translation\Loader\YamlFileLoader;
use Symfony\Component\Filesystem\Filesystem;

$translator = $container->get(TranslatorInterface::class);

// Charger les fichiers YAML de traduction
$translator->addLoader('yaml', new YamlFileLoader());
$translator->addResource('yaml', 'translations/messages+intl-icu.fr.yaml', 'fr');
$translator->addResource('yaml', 'translations/messages+intl-icu.en.yaml', 'en');

// Extraire les traductions et les transformer en format JS
$translations = [];
foreach (['fr', 'en'] as $locale) {
    $translations[$locale] = [];
    $catalogue = $translator->getCatalogue($locale);
    foreach ($catalogue->all() as $domain => $messages) {
        foreach ($messages as $key => $value) {
            $translations[$locale][$key] = $value;
        }
    }
}

// Sauvegarder le fichier JavaScript avec les traductions
$fs = new Filesystem();
$fs->dumpFile('public/build/translations.js', 'window.translations = ' . json_encode($translations) . ';');

