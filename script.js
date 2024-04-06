const divResultat = document.querySelector("#resultat");

// Déclaration du tableau vide
let tabJeu = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

// Le tableau contenant les cartes générées aléatoirement
let tabResultat = generateArrayRandom();

// Variables pour garder la trace de la sélection précédente
let oldSelection = [];
let nbAffiche = 0;
let ready = true;
let count = 0; // Initialisation du compteur de tours
let seconds = 0;
let minutes = 0;
let timerInterval;

// Afficher le tableau initial
showTable();
updateTourCount(); // Appel initial de la fonction pour afficher le nombre initial de tours
startTimer(); // Démarrage du chronomètre au début du jeu

// Fonction pour mettre en forme le tableau de jeu
function showTable() {
    let txt = "";
    for (let i = 0; i < tabJeu.length; i++) {
        txt += "<div>";
        for (let j = 0; j < tabJeu[i].length; j++) {
            const valeur = tabJeu[i][j];
            if (valeur === 0) {
                // Afficher un bouton avec une image par défaut
                txt += "<button class='btn btn-primary m-2' style='width:50px;height:50px' onClick ='verif(\"" + i + "-" + j + "\")'><img src='assets/default.png' style='width:50%;height:50%; object-fit: cover;'></button>";
            } else {
                // Afficher l'image correspondant à la carte
                txt += "<img src='" + getImage(valeur) + "' style='width:50px;height:50px' class='m-2'>";
            }
        }
        txt += "</div>";
    }
    divResultat.innerHTML = txt;
}

// Fonction pour récupérer le chemin de l'image en fonction de la valeur de la carte
function getImage(value) {
    let imgTxt = "assets/";
    switch (value) {
        case 1:
            imgTxt += "css.png";
            break;
        case 2:
            imgTxt += "git.png";
            break;
        case 3:
            imgTxt += "html.png";
            break;
        case 4:
            imgTxt += "js.png";
            break;
        case 5:
            imgTxt += "node.png";
            break;
        case 6:
            imgTxt += "php.png";
            break;
        case 7:
            imgTxt += "react.png";
            break;
        case 8:
            imgTxt += "vue.png";
            break;
        default:
            imgTxt += "default.png";
    }
    return imgTxt;
}

// Fonction pour mettre à jour le compteur de tours
function updateTourCount() {
    if (ready) {
        document.getElementById("count").innerHTML = "Nombre de tours : " + count;
    }
}

// Vérifier si toutes les cartes ont été trouvées
function allCardsFound() {
    for (let i = 0; i < tabJeu.length; i++) {
        for (let j = 0; j < tabJeu[i].length; j++) {
            if (tabJeu[i][j] === 0) {
                return false; // Il reste des cartes non trouvées
            }
        }
    }
    return true; // Toutes les cartes ont été trouvées
}

// Fonction pour vérifier si les cartes retournées correspondent
function verif(bouton) {
    if (ready) {
        nbAffiche++;
        let indices = bouton.split("-");
        let line = parseInt(indices[0]);
        let column = parseInt(indices[1]);
        tabJeu[line][column] = tabResultat[line][column];
        showTable();
        if (nbAffiche > 1) {
            ready = false;
            setTimeout(() => {
                if (tabJeu[line][column] !== tabResultat[oldSelection[0]][oldSelection[1]]) {
                    tabJeu[line][column] = 0;
                    tabJeu[oldSelection[0]][oldSelection[1]] = 0;
                }
                showTable();
                ready = true;
                nbAffiche = 0;
                oldSelection = [line, column];
                count++; // Incrémentation du compteur à chaque tour
                updateTourCount(); // Mettre à jour le compteur de tours

                // Vérifier si toutes les cartes ont été trouvées
                if (allCardsFound()) {
                    congratulations(); // Afficher un message de félicitations
                }
            }, 1000)
        } else {
            oldSelection = [line, column];
        }
    }
}

// Fonction pour générer le tableau de jeu aléatoirement
function generateArrayRandom() {
    let tab = [];
    let nbImagePositions = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 4; i++) {
        let line = [];
        for (let j = 0; j < 4; j++) {
            let fin = false;
            while (!fin) {
                let randomImage = Math.floor(Math.random() * 8);
                if (nbImagePositions[randomImage] < 2) {
                    line.push(randomImage + 1);
                    nbImagePositions[randomImage]++;
                    fin = true;
                }
            }
        }
        tab.push(line);
    }
    return tab;
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    // Réinitialiser le tableau de jeu
    tabJeu = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // Réinitialiser le tableau de résultat
    tabResultat = generateArrayRandom();

    // Réinitialiser les variables
    oldSelection = [];
    nbAffiche = 0;
    ready = true;
    count = 0;

    // Afficher le tableau de jeu
    showTable();

    // Mettre à jour le compteur de tours
    updateTourCount();

    // Redémarrer le chronomètre
    seconds = 0;
    minutes = 0;
    clearInterval(timerInterval);
    startTimer();
}

// Fonction pour sauvegarder la partie
function saveGame() {
    const gameState = {
        tabJeu: tabJeu,
        tabResultat: tabResultat,
        oldSelection: oldSelection,
        nbAffiche: nbAffiche,
        ready: ready,
        count: count,
        seconds: seconds,
        minutes: minutes
    };
    localStorage.setItem('memoryGame', JSON.stringify(gameState));
    alert('La partie a été sauvegardée avec succès.');
}

// Fonction pour charger la partie sauvegardée
function loadGame() {
    const savedGameState = localStorage.getItem('memoryGame');
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        tabJeu = gameState.tabJeu;
        tabResultat = gameState.tabResultat;
        oldSelection = gameState.oldSelection;
        nbAffiche = gameState.nbAffiche;
        ready = gameState.ready;
        count = gameState.count;
        seconds = gameState.seconds;
        minutes = gameState.minutes;
        showTable();
        updateTourCount();
        alert('La partie a été chargée avec succès.');
        startTimer(); // Démarrer le chronomètre chargé
    } else {
        alert('Aucune partie sauvegardée.');
    }
}

// Fonction pour démarrer le chronomètre
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

// Fonction pour arrêter le chronomètre
function stopTimer() {
    clearInterval(timerInterval);
}

// Fonction pour mettre à jour le chronomètre chaque seconde
function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('timer').innerHTML = 'Temps écoulé : ' + formattedMinutes + ':' + formattedSeconds;
}

// Fonction appelée lorsque toutes les paires de cartes ont été trouvées
function congratulations() {
    stopTimer(); // Arrêter le chronomètre lorsque la partie est terminée
    resetGame(); // Réinitialiser le jeu lorsque la partie est terminée
    alert("Félicitations ! Vous avez trouvé toutes les paires !");
}
