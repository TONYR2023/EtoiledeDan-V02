import React, { useState } from "react";
import Calendar from "@demark-pro/react-booking-calendar";

const Prereserv = () => {
  const [selectedDates, setSelectedDates] = useState([]); //Etat pour selectionner les dates avec le range

  const [price, setPrice] = useState(0); // État pour stocker le prix
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
    } else {
      setOpenBreakfast(false);
    }
  };

  // Fonction pour ouvrir ou fermer la checkbox Visite Guidée
  const handleCheckboxGuide = () => {
    setOpenGuide(!openGuide);
  };

  const calculatePrice = (dates) => {
    // Calculer le nombre de jours sélectionnés
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[dates.length - 1]);
    const timeDiff = Math.abs(endDate - startDate);

    // Convertir en jours
    const numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    //conversion des boutons debut et fin
    const startDay = startDate.getDay();
    // console.log("start :", startDay)
    const endDay = endDate.getDay();
    // console.log("end :", endDay)

    setMessageCalendar("");

    // jours non possibles
    const jourNonPossibleHs = [2, 3, 4, 5];
    const jourNonPossiblePs = [0, 1, 2, 3, 4];

    let totalPrice1 = 3000;
    let totalPrice2 = 2000;
    let totalPrice3 = 3800;
    let totalPrice4 = 2850;

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

      switch (true) {
        //case 1 semaine
        case numberOfDays === 8 && startDay === 6 && endDay === 6:
          // console.log("prix", totalPrice3);
          return totalPrice3;
        //case 2 semaines
        case numberOfDays === 15 && startDay === 6 && endDay === 6:
          // console.log("prix", totalPrice3 * 2);
          return totalPrice3 * 2;
        //case 4 premiers jours ou 3 derniers jours
        case (startDay === 5 && endDay === 1) ||
          (startDay === 1 && endDay === 5):
          return totalPrice4;

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

          {messageCalendar.length > 0 && (
            <div className="p-3 mb-3 mt-3 text-bg-danger rounded-3">
              {messageCalendar}
            </div>
          )}

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

export default Prereserv;
