import React, { useState } from "react";
import Calendar from "@demark-pro/react-booking-calendar";

const PrereservPage = () => {
  const [selectedDates, setSelectedDates] = useState([]); //Etat pour selectionner les dates avec le range
<<<<<<< HEAD
=======
  const [displayedPrice, setDisplayedPrice] = useState(0);

>>>>>>> 934c314924fad945bb73f051126fbd4564a29d9c
  const [price, setPrice] = useState(""); // État pour stocker le prix
  const [priceHT, setPriceHT] = useState(0); // Définir le prix HT comme état
  const [totalPetitDej, setTotalPetitDej] = useState(200);
  const prixDej = 25;
  const [messageCalendar, setMessageCalendar] = useState("");
  const [messageGeneral, setMessageGeneral] = useState("");
  const [nbrPersonne, setNbrPersonne] = useState(8);
  const [openBreakfast, setOpenBreakfast] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);
  const [checkedPrixHt, setCheckedPrixHt] = useState(false);
  const [disabledOptionsAssurances, setDisabledOptionsAssurances] =
    useState(true);
  const [dataEmail, setDataEmail] = useState();
  let [isLoaded, setLoaded] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    nom: "",
    prenom: "",
    mail: "",
    tel: "",
    description: "",
  });

<<<<<<< HEAD
  // fonction pour incrementer et decrementer le petit-dejeuner
const increment = () => {
  if (openBreakfast && nbrPersonne < 12) {
    setNbrPersonne((prevNbrPersonne) => prevNbrPersonne + 1);
    setTotalPetitDej((prevTotalPetitDej) => prevTotalPetitDej + prixDej);
    setPrice((oldPrice) => oldPrice + prixDej);
  }
};

const decrement = () => {
  if (openBreakfast && nbrPersonne > 8) {
    setNbrPersonne((prevNbrPersonne) => prevNbrPersonne - 1);
    setTotalPetitDej((prevTotalPetitDej) => prevTotalPetitDej - prixDej);
    setPrice((oldPrice) => oldPrice - prixDej);
  }
}
  
// Fonction pour ouvrir ou fermer la checkbox Breakfast
const handleCheckboxBreakfast = () => {
  let check = !openBreakfast;

  if (price) {
    if (check) {
      setPrice((oldPrice) => oldPrice + totalPetitDej);
=======
    // Calculer le nombre de jours sélectionnés
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[dates.length - 1]);
    const timeDiff = Math.abs(endDate - startDate);

    // Convertir en jours
    const numberOfDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    //conversion des boutons debut et fin
    const startDay = startDate.getDay();
    const endDay = endDate.getDay();
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("numberOfDays", numberOfDays);

    setMessageCalendar("");

    // Jours non valides pour la réservation (mardi, mercredi, jeudi, dimanche)
    const joursNonValides = [2, 3, 4, 0]; // 0 = dimanche, 2 = mardi, 3 = mercredi, 4 = jeudi

    // Nombres de jours non valides pour la réservation (1, 2, 3, 6, 7 jours)
    const joursNonPossibles = [1, 2, 3, 6, 7];

    // Vérification si le jour de début ou de fin est invalide
    const isInvalidDay =
      joursNonValides.includes(startDay) || joursNonValides.includes(endDay);

    // Vérification si la durée de la réservation est invalide
    const isInvalidDuration = joursNonPossibles.includes(numberOfDays);

    // Si une des conditions est remplie, afficher le message d'erreur
    if (isInvalidDay || isInvalidDuration) {
      setMessageCalendar(
        "Vous devez choisir des dates comprenant :\n" +
          "- Une semaine complète (du samedi au samedi)\n" +
          "- Les 4 premiers jours de la semaine (du lundi au vendredi)\n" +
          "- Les 3 derniers jours de la semaine (du vendredi au lundi)\n" +
          "- Tarif dégressif à partir de deux semaines.\n" +
          "\n" +
          "En dehors de toutes ces périodes:"
      );
      setPrice("");
    } else {
      setMessageCalendar("");
    }

    // Périodes de vacances
    const periods = {
      toussaint: {
        start: new Date(startDate.getFullYear(), 9, 18), // 19 Octobre -1
        end: new Date(endDate.getFullYear(), 10, 5), // 4 Novembre +1
        priceOneWeek: 3600,
        pricePartialWeek: 2400,
      },
      noel: {
        start: new Date(startDate.getFullYear(), 11, 20), // 21 Décembre -1
        end: new Date(endDate.getFullYear() + 1, 0, 5), // 4 Décembre +1
        priceOneWeek: 3600,
        pricePartialWeek: 2400,
      },
      fevrier: {
        start: new Date(startDate.getFullYear(), 1, 7), // 8 fevrier
        end: new Date(endDate.getFullYear(), 2, 11), // 10 mars
        priceOneWeek: 3600,
        pricePartialWeek: 2400,
      },
      paque: {
        start: new Date(startDate.getFullYear(), 3, 4), // 4 avril
        end: new Date(endDate.getFullYear(), 4, 6), // 5 mai
        priceOneWeek: 3600,
        pricePartialWeek: 2400,
      },
    };

    // Vérification si la période est du 26 octobre au 2 novembre (Toussaint spécial)
    const isToussaintSpecial =
      startDate.getFullYear() === 2024 &&
      startDate.getMonth() === 9 && // Mois d'octobre (0-indexé, donc 9 = octobre)
      startDate.getDate() === 26 &&
      endDate.getFullYear() === 2024 &&
      endDate.getMonth() === 10 && // Mois de novembre (0-indexé, donc 10 = novembre)
      endDate.getDate() === 2;

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("isToussaintSpecial:", isToussaintSpecial);

    if (isToussaintSpecial) {
      if (numberOfDays === 9 && startDay === 6 && endDay === 6) {
        console.log("Prix semaine spéciale Toussaint: 3600");
        return 3600;
      }
    }

    // Boucle sur les périodes pour appliquer les prix
    for (const [periodName, period] of Object.entries(periods)) {
      if (startDate >= period.start && endDate <= period.end) {
        console.log(`Période sélectionnée : ${periodName}`);

        if (numberOfDays === 8 && startDay === 6 && endDay === 6) {
          return period.priceOneWeek;
          console.log(`Prix ${periodName} une semaine:`, price);
        } else if (
          (startDay === 1 && endDay === 5) ||
          (startDay === 5 && endDay === 1)
        ) {
          return period.pricePartialWeek;
          console.log(`Prix ${periodName} partielle:`, price);
        } else if (jourNonPossiblePs.includes(numberOfDays)) {
          return (
            "Vous devez choisir des dates comprenant :\n" +
            "- Une semaine complète (du samedi au samedi)\n" +
            "- Les 4 premiers jours de la semaine (du lundi au vendredi)\n" +
            "- Les 3 derniers jours de la semaine (du vendredi au lundi)\n" +
            "- Tarif dégressif à partir de deux semaines.\n" +
            "En dehors de toutes ces périodes, veuillez nous contacter. "
          );
        } else {
          return 0;
        }
      }
    }

    // Hors saison
    if (![6, 7].includes(startDate.getMonth())) {
      if (numberOfDays === 8 && startDay === 6 && endDay === 6) {
        const priceOffSeasonOneWeek = 3000;
        console.log("Prix une semaine hors saison:", priceOffSeasonOneWeek);
        return priceOffSeasonOneWeek;
      } else if (
        (startDay === 1 && endDay === 5) ||
        (startDay === 5 && endDay === 1)
      ) {
        const priceOffSeasonPartialWeek = 2000;
        console.log("Prix partielle hors saison:", priceOffSeasonPartialWeek);
        return priceOffSeasonPartialWeek;
      } else if (jourNonPossibleHs.includes(numberOfDays)) {
        return (
          "Vous devez choisir des dates comprenant :\n" +
          "- Une semaine complète (du samedi au samedi)\n" +
          "- Les 4 premiers jours de la semaine (du lundi au vendredi)\n" +
          "- Les 3 derniers jours de la semaine (du vendredi au lundi)\n" +
          "- Pour 2 semaines et plus tarif DEGRESSIF, veuillez nous contacter directement par email"
        );
      } else {
        return 0;
      }
    }

    // Pleine saison
    else if ([6, 7].includes(startDate.getMonth())) {
      console.log("Pleine saison:", startDate.getMonth());
      if (numberOfDays === 8 && startDay === 6 && endDay === 6) {
        const priceFullSeasonOneWeek = 3800;
        console.log("Prix pleine saison une semaine:", priceFullSeasonOneWeek);
        return priceFullSeasonOneWeek;
      } else if (
        (startDay === 1 && endDay === 5) ||
        (startDay === 5 && endDay === 1)
      ) {
        const priceFullSeasonPartialWeek = 2550;
        console.log(
          "Prix pleine saison partielle:",
          priceFullSeasonPartialWeek
        );
        return priceFullSeasonPartialWeek;
      } else if (jourNonPossiblePs.includes(numberOfDays)) {
        return (
          "Vous devez choisir des dates comprenant :\n" +
          "- Une semaine complète (du samedi au samedi)\n" +
          "- Les 4 premiers jours de la semaine (du lundi au vendredi)\n" +
          "- Les 3 derniers jours de la semaine (du vendredi au lundi)"
        );
      } else {
        return "nous contacter";
      }
    }
    return 0;
  };

  // selection des dates pour afficher le prix
  const handleCalendarChange = (dates) => {
    setSelectedDates(dates);
    // console.log("dates:", dates)

    const totalPrice = calculatePrice(dates); // Passer les dates sélectionnées à calculatePrice
    console.log("Total Price:", totalPrice);

    if (openBreakfast && totalPrice) {
      setPrice(totalPrice + totalPetitDej);
    } else {
      setPrice(totalPrice);
    }

    if (totalPrice) {
      setDisabledOptionsAssurances(false);
    } else {
      setDisabledOptionsAssurances(true);
    }
  };

  // Fonction pour ouvrir ou fermer la checkbox Breakfast
  const handleCheckboxBreakfast = () => {
    let check = !openBreakfast;

    if (price) {
      if (check) {
        setPrice((oldPrice) => oldPrice + totalPetitDej);
      } else {
        setPrice((oldPrice) => oldPrice - totalPetitDej);
      }

      setOpenBreakfast(check);
>>>>>>> 934c314924fad945bb73f051126fbd4564a29d9c
    } else {
      setPrice((oldPrice) => oldPrice - totalPetitDej);
    }

<<<<<<< HEAD
    setOpenBreakfast(check);
  } else {
    setOpenBreakfast(false);
  }
}

// Fonction pour ouvrir ou fermer la checkbox Visite Guidée
const handleCheckboxGuide = () => {
  setOpenGuide(!openGuide);
}
  
// Fonction pour calculer le prix en fonction du nombres de jours
const calculatePrice = (dates) => {
=======
  // fonction pour incrementer et decrementer le breakfast
  const increment = () => {
    if (openBreakfast && nbrPersonne < 12) {
      setNbrPersonne((prevNbrPersonne) => prevNbrPersonne + 1);
      setTotalPetitDej((prevTotalPetitDej) => prevTotalPetitDej + prixDej);

      setPrice((oldPrice) => oldPrice + prixDej);
    }
  };

  const decrement = () => {
    if (openBreakfast && nbrPersonne > 8) {
      setNbrPersonne((prevNbrPersonne) => prevNbrPersonne - 1);
      setTotalPetitDej((prevTotalPetitDej) => prevTotalPetitDej - prixDej);

      setPrice((oldPrice) => oldPrice - prixDej);
    }
  };

  // Fonction pour ouvrir ou fermer la checkbox Visite Guidée
  const handleCheckboxGuide = () => {
    setOpenGuide(!openGuide);
  };
  
  // Fonction pour calculer le prix en fonction du nombres de jours
  const calculatePrice = (dates) => {
    if (!dates || dates.length < 2) {
      return 0;
    }
  const calculatePrice = (dates) => {
>>>>>>> 934c314924fad945bb73f051126fbd4564a29d9c
    // Calculer le nombre de jours sélectionnés
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[dates.length - 1]);
    const timeDiff = Math.abs(endDate - startDate);

    // Convertir en jours
    const numberOfDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    //conversion des boutons debut et fin
    const startDay = startDate.getDay();
    // console.log("start :", startDay)
    const endDay = endDate.getDay();
    // console.log("end :", endDay)

    setMessageCalendar("");

<<<<<<< HEAD
  // Jours non valides pour la réservation (mardi, mercredi, jeudi, dimanche)
  const joursNonValides = [2, 3, 4, 0]; // 0 = dimanche, 2 = mardi, 3 = mercredi, 4 = jeudi

  // Nombres de jours non valides pour la réservation (1, 2, 3, 6, 7 jours)
  const joursNonPossibles = [1, 2, 3, 6, 7];
=======
    // jours non possibles
    const jourNonPossibleHs = [2, 3, 4, 5];
    const jourNonPossiblePs = [0, 1, 2, 3, 4];
>>>>>>> 934c314924fad945bb73f051126fbd4564a29d9c

    let totalPrice1 = 3000;
    let totalPrice2 = 2000;
    let totalPrice3 = 3800;
    let totalPrice4 = 2850;
    let totalPrice5 = 3600;
<<<<<<< HEAD

  // Vérification si le jour de début ou de fin est invalide
  const isInvalidDay =
    joursNonValides.includes(startDay) || joursNonValides.includes(endDay);

  // Vérification si la durée de la réservation est invalide
  const isInvalidDuration = joursNonPossibles.includes(numberOfDays);
=======

    //constante pour les vacances hors saison
    const specificStartDate = new Date(startDate.getFullYear(), 9, 22); // 22 octobre
    const specificEndDate = new Date(startDate.getFullYear(), 10, 4); // 4 novembre

    if (startDate >= specificStartDate && endDate <= specificEndDate) {
      return totalPrice5;
    }

    //hors saison
    if (![6, 7].includes(startDate.getMonth())) {
      switch (true) {
        case numberOfDays === 8 && startDay === 6 && endDay === 6:
          console.log("prix", totalPrice1);
          return totalPrice1;
        //case 2 semaines
        case numberOfDays === 15 && startDay === 6 && endDay === 6:
          console.log("prix", totalPrice1 * 2);
          return totalPrice1 * 2;
        //case 4 premiers jours ou 3 derniers jours
        case (startDay === 5 && endDay === 1) ||
          (startDay === 1 && endDay === 5):
          // console.log("prix", totalPrice2);
          return totalPrice2;
        case jourNonPossibleHs.includes(numberOfDays):
        default:
          resetCheckbox();
          const messageCalendarTemplate = `
             "vous devez choisir des dates comprenant : \n
              - Une semaine complète : du samedi soir au Samedi matin  \n
              - Les 4 premiers jours de la semaine : du Lundi soir au Vendredi matin \n
              - Le week-end : du Vendredi soir au Lundi matin \n
              - Pour plus de 2 semaines, veuillez nous contacter directement par email"
          `;
          setMessageCalendar(messageCalendarTemplate);
      }
    } else if ([6, 7].includes(startDate.getMonth())) {
      //pleine saison
      // console.log("pleine saison:", startDate.getMonth())
>>>>>>> 934c314924fad945bb73f051126fbd4564a29d9c

  // Si une des conditions est remplie, afficher le message d'erreur
  if (isInvalidDay || isInvalidDuration) {
    setMessageCalendar(
      "Vous devez choisir des dates comprenant :\n" +
        "- Une semaine complète (du samedi au samedi)\n" +
        "- Les 4 premiers jours de la semaine (du lundi au vendredi)\n" +
        "- Les 3 derniers jours de la semaine (du vendredi au lundi)\n" +
        "- Tarif dégressif à partir de deux semaines.\n" +
        "\n" +
        "En dehors de toutes ces périodes:"
    );
    setPrice("");
  } else {
    setMessageCalendar("");
  };

<<<<<<< HEAD
  // Périodes de vacances
  const periods = {
    toussaint: {
      start: new Date(startDate.getFullYear(), 9, 18), // 19 Octobre -1
      end: new Date(endDate.getFullYear(), 10, 5), // 4 Novembre +1
      priceOneWeek: 3600,
      pricePartialWeek: 2400,
    },
    noel: {
      start: new Date(startDate.getFullYear(), 11, 20), // 21 Décembre -1
      end: new Date(endDate.getFullYear() + 1, 0, 5), // 4 Décembre +1
      priceOneWeek: 3600,
      pricePartialWeek: 2400,
    },
    fevrier: {
      start: new Date(startDate.getFullYear(), 1, 7), // 8 fevrier
      end: new Date(endDate.getFullYear(), 2, 11), // 10 mars
      priceOneWeek: 3600,
      pricePartialWeek: 2400,
    },
    paque: {
      start: new Date(startDate.getFullYear(), 3, 4), // 4 avril
      end: new Date(endDate.getFullYear(), 4, 6), // 5 mai
      priceOneWeek: 3600,
      pricePartialWeek: 2400,
    },
  };

  // Vérification si la période est du 26 octobre au 2 novembre (Toussaint spécial)
  const isToussaintSpecial =
    startDate.getFullYear() === 2024 &&
    startDate.getMonth() === 9 && // Mois d'octobre (0-indexé, donc 9 = octobre)
    startDate.getDate() === 26 &&
    endDate.getFullYear() === 2024 &&
    endDate.getMonth() === 10 && // Mois de novembre (0-indexé, donc 10 = novembre)
    endDate.getDate() === 2;

  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);
  console.log("isToussaintSpecial:", isToussaintSpecial);

  if (isToussaintSpecial) {
    if (numberOfDays === 9 && startDay === 6 && endDay === 6) {
      console.log("Prix semaine spéciale Toussaint: 3600");
      return 3600;
    }
  }

  // Boucle sur les périodes pour appliquer les prix
  for (const [periodName, period] of Object.entries(periods)) {
    if (startDate >= period.start && endDate <= period.end) {
      console.log(`Période sélectionnée : ${periodName}`);

      if (numberOfDays === 8 && startDay === 6 && endDay === 6) {
        return period.priceOneWeek;
        console.log(`Prix ${periodName} une semaine:`, price);
      } else if (
        (startDay === 1 && endDay === 5) ||
        (startDay === 5 && endDay === 1)
      ) {
        return period.pricePartialWeek;
        console.log(`Prix ${periodName} partielle:`, price);
      } else if (jourNonPossiblePs.includes(numberOfDays)) {
        return (
          "Vous devez choisir des dates comprenant :\n" +
          "- Une semaine complète (du samedi au samedi)\n" +
          "- Les 4 premiers jours de la semaine (du lundi au vendredi)\n" +
          "- Les 3 derniers jours de la semaine (du vendredi au lundi)\n" +
          "- Tarif dégressif à partir de deux semaines.\n" +
          "En dehors de toutes ces périodes, veuillez nous contacter. "
        );
      } else {
        return 0;
=======
        case jourNonPossiblePs.includes(numberOfDays):
        default:
          resetCheckbox();
          setMessageCalendar(
            // "vous devez choisir des dates comprenant une semaine complète \n" +
            //  "- Du samedi soir au Samedi matin \n" +
            "vous devez choisir des dates comprenant : \n" +
              "- Une semaine complète : du samedi soir au Samedi matin  \n" +
              "- Les 4 premiers jours de la semaine : du Lundi soir au Vendredi matin \n" +
              "- Le week-end : du Vendredi soir au Lundi matin \n" +
              "- Pour plus de 2 semaines, veuillez nous contacter directement par email"
          );
>>>>>>> 934c314924fad945bb73f051126fbd4564a29d9c
      }
    }
  }

  // Hors saison
  if (![6, 7].includes(startDate.getMonth())) {
    if (numberOfDays === 8 && startDay === 6 && endDay === 6) {
      const priceOffSeasonOneWeek = 3000;
      console.log("Prix une semaine hors saison:", priceOffSeasonOneWeek);
      return priceOffSeasonOneWeek;
    } else if (
      (startDay === 1 && endDay === 5) ||
      (startDay === 5 && endDay === 1)
    ) {
      const priceOffSeasonPartialWeek = 2000;
      console.log("Prix partielle hors saison:", priceOffSeasonPartialWeek);
      return priceOffSeasonPartialWeek;
    } else if (jourNonPossibleHs.includes(numberOfDays)) {
      return (
        "Vous devez choisir des dates comprenant :\n" +
        "- Une semaine complète (du samedi au samedi)\n" +
        "- Les 4 premiers jours de la semaine (du lundi au vendredi)\n" +
        "- Les 3 derniers jours de la semaine (du vendredi au lundi)\n" +
        "- Pour 2 semaines et plus tarif DEGRESSIF, veuillez nous contacter directement par email"
      );
    } else {
      return 0;
    }
  }

  // Pleine saison
  else if ([6, 7].includes(startDate.getMonth())) {
    console.log("Pleine saison:", startDate.getMonth());
    if (numberOfDays === 8 && startDay === 6 && endDay === 6) {
      const priceFullSeasonOneWeek = 3800;
      console.log("Prix pleine saison une semaine:", priceFullSeasonOneWeek);
      return priceFullSeasonOneWeek;
    } else if (
      (startDay === 1 && endDay === 5) ||
      (startDay === 5 && endDay === 1)
    ) {
      const priceFullSeasonPartialWeek = 2550;
      console.log("Prix pleine saison partielle:", priceFullSeasonPartialWeek);
      return priceFullSeasonPartialWeek;
    } else if (jourNonPossiblePs.includes(numberOfDays)) {
      return (
        "Vous devez choisir des dates comprenant :\n" +
        "- Une semaine complète (du samedi au samedi)\n" +
        "- Les 4 premiers jours de la semaine (du lundi au vendredi)\n" +
        "- Les 3 derniers jours de la semaine (du vendredi au lundi)"
      );
    } else {
      return "nous contacter";
    }
  }
  return 0;
};

  // selection des dates pour afficher le prix
  const handleCalendarChange = (dates) => {
    setSelectedDates(dates);
    // console.log("dates:", dates)
    const totalPrice = calculatePrice(dates); // Passer les dates sélectionnées à calculatePrice

    if (openBreakfast && totalPrice) {
      setPrice(totalPrice + totalPetitDej);
    } else {
      setPrice(totalPrice);
    }

    if (totalPrice) {
      setDisabledOptionsAssurances(false);
    } else {
      setDisabledOptionsAssurances(true);
    }
  };

  // Evenement sur la Checkbox
  const handleChangePrixHt = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Calculer le prix HT en soustrayant la TVA (20%) du prix total
      const totalPriceHT = price / 1.2; // Soustraire 20% du prix total
      setCheckedPrixHt(true);
      setPriceHT(totalPriceHT);
    } else {
      // Si la case est décochée, réinitialiser le prix HT à 0
      setCheckedPrixHt(false);
      setPriceHT(0);
    }
  };

  let resetCheckbox = () => {
    setOpenBreakfast(false);
    setDisabledOptionsAssurances(true);
    setOpenGuide(false);
    setCheckedPrixHt(false);

    setPrice(0);
    setPriceHT(0);
  };

  // reinitialiser le calendrier
  const handleReset = () => {
    setSelectedDates([]);
    resetCheckbox();
    setMessageCalendar("");
    setMessageGeneral("");
    setPrice("");
  };

  const validateNom = (nom) => {
    // Votre expression régulière pour valider le nom
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;
    if (!regex.test(nom)) {
      setValidationErrors((prevState) => ({
        ...prevState,
        nom: "Nom invalide.",
      }));
      return false;
    }
    setValidationErrors((prevState) => ({ ...prevState, nom: "" }));
    return true;
  };

  const validatePrenom = (prenom) => {
    // Votre expression régulière pour valider le prénom
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;
    if (!regex.test(prenom)) {
      setValidationErrors((prevState) => ({
        ...prevState,
        prenom: "Prénom invalide.",
      }));
      return false;
    }
    setValidationErrors((prevState) => ({ ...prevState, prenom: "" }));
    return true;
  };

  const validateEmail = (email) => {
    // Votre expression régulière pour valider l'email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setValidationErrors((prevState) => ({
        ...prevState,
        email: "Email invalide.",
      }));
      return false;
    }
    setValidationErrors((prevState) => ({ ...prevState, email: "" }));
    return true;
  };

  const validateTelephone = (telephone) => {
    // Votre expression régulière pour valider le numéro de téléphone
    const regex = /^\d{10}$/;
    if (!regex.test(telephone)) {
      setValidationErrors((prevState) => ({
        ...prevState,
        telephone: "Numéro de téléphone invalide.",
      }));
      return false;
    }
    setValidationErrors((prevState) => ({ ...prevState, telephone: "" }));
    return true;
  };

  const validateDescription = (description) => {
    // Votre expression régulière pour valider la description
    // Vous pouvez ajuster cette validation selon vos besoins
    if (description.trim() === "") {
      setValidationErrors((prevState) => ({
        ...prevState,
        description: "Veuillez entrer une description.",
      }));
      return false;
    }
    setValidationErrors((prevState) => ({ ...prevState, description: "" }));
    return true;
  };

  async function checkForm(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    setLoaded(true);

    await fetch("/email", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((result) => {
            setLoaded(false);

            if (result.success) {
              handleReset();
              form.reset();
              setMessageGeneral("Votre email est bien envoyé");
            } else {
              setMessageGeneral(result.messageError);
              console.log(result);
            }
          });
        } else {
          handleReset();
          form.reset();
          setLoaded(false);
          setMessageGeneral("Problème de serveur " + response.status);
        }
      })
      .catch((e) => {
        setLoaded(false);
        setMessageGeneral(e);
        console.error(e);
        // setError(e)
      });
  }

  return (
    <form method="post" action="" onSubmit={checkForm}>
      <div className="row mb-4">
        {/*------------------bloc1----------------*/}
        <div className="col-lg-4 mb-3">
          <h3 className="visually-hidden">Calendrier</h3>
          <div className="d-flex justify-content-center">Étape 1</div>
          {/*------------------Calendrier----------------*/}

          <div className="calendarContainer">
            <Calendar
              selected={selectedDates}
              onChange={handleCalendarChange}
              onOverbook={(e, err) => setMessageCalendar(err)}
              disabled={(date, state) => !state.isSameMonth}
              reserved={reserved}
              // variant="events"
              dateFnsOptions={{ weekStartsOn: 1 }}
              range={true}
            />
            <input
              type="hidden"
              name="selectedDates"
              value={selectedDates.toString()}
            />
          </div>

          {/*------button reinitialisation calendrier-------*/}
          <div className="d-flex justify-content-center">
            <button
              type="button"
              onClick={handleReset}
              className="but-reset btn-warning mt-1"
            >
              Réinitialiser le calendrier
            </button>
          </div>

          {/*------Message d'erreur calendrier-------*/}
          {messageCalendar.length > 0 && (
            <div className="p-3 m-3 text-bg-danger rounded-3">
              {messageCalendar.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br /> {/* Saut de ligne */}
                </span>
              ))}
              <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-light m-1">
                  <a href="/contact" style={{ textDecoration: "none" }}>
                    Nous contacter
                  </a>
                </button>
              </div>
            </div>
          )}
        </div>

        {/*------------------bloc2----------------*/}
        <div className="col-lg-4 mb-3">
          <h3 className="visually-hidden">Options & Assurance</h3>
          <div className="d-flex justify-content-center">Étape 2</div>

          {/*------------------options----------------*/}
          <div className="bla">
            <h4>Options</h4>

            {/*----------------- Proposées par L’Étoile de Dan ------------*/}

            <p>
              <strong>
                <u> Proposées par L’Étoile de Dan</u>
              </strong>

              <br />

              <a className="btn-plus" href="/informations">
                <span> En savoir plus</span>
              </a>
            </p>

            {/*-----------------Petit dejeuner ------------*/}
            <div>
              <input
                type="checkbox"
                id="breakfast"
                name="breakfast"
                checked={openBreakfast}
                onChange={handleCheckboxBreakfast}
                disabled={disabledOptionsAssurances}
              />
              <label htmlFor="breakfast">Petit Dejeuner</label>
            </div>
            {openBreakfast && (
              <>
                <p>
                  <b>- Petit déjeuner par jour</b> (minimum de 8 personnes)
                </p>
                <div>
                  <p>
                    Nombre de personnes : {nbrPersonne}
                    <input
                      type="hidden"
                      name="nbrPersonne"
                      value={nbrPersonne}
                    />
                    <button
                      type="button"
                      onClick={increment}
                      className="mx-1 btn-reduit"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={decrement}
                      className="btn-reduit"
                    >
                      ▼
                    </button>
                    <div className="my-2 text-end">
                      <b className="bla">Prix : {totalPetitDej} € / jours</b>
                    </div>
                  </p>
                </div>
              </>
            )}

            {/*-----------------Guide Touristique------------*/}
            <div>
              <input
                type="checkbox"
                id="visite"
                name="visite"
                checked={openGuide}
                onChange={handleCheckboxGuide}
                disabled={disabledOptionsAssurances}
              />
              <label htmlFor="visite">Visite Guidée</label>
            </div>
            <div>
              {openGuide && (
                <>
                  <p>
                    <b>- Guide Touristique</b> (maximum 8 personnes) <br />A
                    définir avec L'étoile de Dan
                  </p>
                </>
              )}
            </div>

            {/*------------------ Proposées par Les Prestataires---------------- */}
            <div className="mt-4">
              <p>
                <strong>
                  <u> Proposées par nos prestataires</u>
                </strong>

                <br />

                <a className="btn-plus" href="/prestations">
                  <span>En savoir plus</span>
                </a>
              </p>

              <div>
                <input
                  type="checkbox"
                  id="degustation"
                  name="degustation"
                  disabled={disabledOptionsAssurances}
                />
                <label htmlFor="degustation"> Service de Dégustation</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="massage"
                  name="massage"
                  disabled={disabledOptionsAssurances}
                />
                <label htmlFor="massage"> Service de Massage</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="chef"
                  name="chef"
                  disabled={disabledOptionsAssurances}
                />
                <label htmlFor="chef">Service de Chef à domicile</label>
              </div>
            </div>
          </div>
        </div>

        {/*------------------bloc3----------------*/}
        <div className="col-lg-4 mb-3">
          <div className="">
            <h3 className="visually-hidden">Formulaire de Contact</h3>
            <div className="d-flex justify-content-center">Étape 3</div>
            <div className="bla">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    * Nom
                  </span>
                </div>
                <input
                  type="text"
                  name="nom"
                  className="form-control"
                  placeholder="Entrez votre nom"
                  minLength={2}
                  required={true}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                    required={true}
                  >
                    * Prenom
                  </span>
                </div>
                <input
                  type="text"
                  name="prenom"
                  className="form-control"
                  placeholder="Entrez votre prénom"
                  minLength={2}
                  required={true}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    * Email
                  </span>
                </div>
                <input
                  type="mail"
                  name="mail"
                  className="form-control"
                  placeholder="Entrez votre email"
                  required={true}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    * Telephone
                  </span>
                </div>
                <input
                  type="tel"
                  name="telephone"
                  className="form-control"
                  placeholder="Entrez votre téléphone"
                  minLength={10}
                  required={true}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    * Commentaires
                  </span>
                </div>
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  minLength={10}
                  required={true}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/*------------------fin----------------*/}
      </div>

      <div className="d-flex justify-content-center mb-3">
        <div className="row">
          <hr />
          {/*------Prix TTC-------*/}
          <h6>PRIX TTC : {price}€</h6>

          <input type="hidden" name="prix" value={price} />

          {/*------checkbox Prix HT-------*/}
          <div>
            <p>
              Convertir le prix en HT
              <input
                type="checkbox"
                className="checkboxHt"
                checked={checkedPrixHt}
                onChange={handleChangePrixHt}
                disabled={disabledOptionsAssurances}
              />
              PRIX HT : {priceHT}€
            </p>
          </div>

          {/*------Nos prix comprennent-------*/}
          <div className="comprend">
            <p className="mt-2">
              Nos prix comprennent :<br />
              - Le linge de maison <br />- Le ménage en fin de séjour
            </p>
          </div>

          {messageGeneral.length > 0 && (
            <div className="p-3 mb-3 mt-3 text-bg-danger rounded-3">
              {messageGeneral}
            </div>
          )}

          {!isLoaded && (
            <>
              <button type="submit" className="btn btn-primary">
                Pré-réserver
              </button>
            </>
          )}
          {isLoaded && <>Veuillez patienter</>}
        </div>
      </div>
    </form>
  );
};

export default PrereservPage;
