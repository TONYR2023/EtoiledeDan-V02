// Initialisation de la carte Leaflet
if(document.getElementById('map')) {
    var map = L.map('map').setView([
        43.882820, 4.095884
    ], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; OpenStreetMap contributors'}).addTo(map);

    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    })

// Coordonnées de la destination (Crespian)
    var crespianCoords = [43.882820, 4.095884];


// Ajout d'un marqueur pour la destination
    var marker = L.marker(crespianCoords).addTo(map).bindPopup("<b>Gîte L'etoile de Dan !</b><br>Crespian, France.").openPopup();

    var routingControl;

    document.getElementById('calculate-route').addEventListener('click', calculateRoute);
    document.getElementById('toggle-instructions').addEventListener('click', toggleInstructions);
}

// Variable pour stocker l'itinéraire

// Fonction pour décoder la polyline
function decodePolyline(polyline) {
    let points = [];
    let index = 0,
        lat = 0,
        lng = 0;

    while (index < polyline.length) {
        let b,
            shift = 0,
            result = 0;
        do {
            b = polyline.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let deltaLat = ((result & 1) ? ~ (result >> 1) : (result >> 1));
        lat += deltaLat;

        shift = 0;
        result = 0;
        do {
            b = polyline.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let deltaLng = ((result & 1) ? ~ (result >> 1) : (result >> 1));
        lng += deltaLng;

        points.push([
            lat / 1e5,
            lng / 1e5
        ]);
    }

    return points;
}

// Fonction pour calculer l'itinéraire
async function calculateRoute() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
            var userCoords = [position.coords.latitude, position.coords.longitude];

// Supprimer l'ancien itinéraire s'il existe
            if (routingControl) {
                map.removeControl(routingControl);
            }

// URL de l'API GraphHopper
            var apiKey = "7573d57a-eb37-44bf-b64a-1c1cf4417327";
            var url = `https://graphhopper.com/api/1/route?point=${
                userCoords[0]
            },${
                userCoords[1]
            }&point=${
                crespianCoords[0]
            },${
                crespianCoords[1]
            }&vehicle=car&locale=fr&key=${apiKey}`;

            try {
                let response = await fetch(url);
                let data = await response.json();

                if (data.paths && data.paths.length > 0) {
                    let route = data.paths[0];
                    let distance = (route.distance / 1000).toFixed(2);
                    let duration = Math.round(route.time / 60000);

                    document.getElementById('distance').innerText = `Distance : ${distance} km`;
                    document.getElementById('duration').innerText = `Durée estimée : ${duration} min`;

// Décoder la polyline et afficher le tracé
                    let decodedPoints = decodePolyline(route.points);
                    let polyline = L.polyline(decodedPoints, {color: 'blue'}).addTo(map);

// Ajuster la carte sur l'itinéraire
                    map.fitBounds(polyline.getBounds());

// Afficher les instructions
                    displayInstructions(route.instructions);
                } else {
                    alert("Aucun itinéraire trouvé !");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du trajet :", error);
            }
        }, function (error) {
            alert("Erreur de géolocalisation : " + error.message);
        });
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
}

// Ajout d'un événement pour afficher le trajet au clic sur le bouton


// Fonction pour afficher les instructions
function displayInstructions(instructions) {
    let instructionsList = document.getElementById('instructions');
    instructionsList.innerHTML = '';
// Réinitialise le contenu précédent

// Afficher chaque instruction dans une liste
    instructions.forEach(function (instruction, index) {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
                <strong>Étape ${index + 1} :</strong><br>
                <strong>Text: </strong>${instruction.text}<br>
                <strong>Distance: </strong>${(instruction.distance / 1000).toFixed(2)} km<br>
               
                <br>
            `;
        instructionsList.appendChild(listItem);
    });
}
// Fonction pour afficher/masquer les instructions
function toggleInstructions() {
    let instructionsSection = document.getElementById('instructions');
    let toggleButton = document.getElementById('toggle-instructions');

    // Vérifier si les instructions sont actuellement visibles ou non
    if (instructionsSection.style.display === "none") {
        // Si cachées, les afficher
        instructionsSection.style.display = "block";
        toggleButton.innerText = "Cacher les instructions";
    } else {
        // Si visibles, les cacher
        instructionsSection.style.display = "none";
        toggleButton.innerText = "Itinéraire";
    }
}
