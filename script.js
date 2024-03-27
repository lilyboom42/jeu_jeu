const divResultat = document.querySelector("#resultat");

let tabJeu = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let tabResultat = genereTableauAleatoire();

let oldSelection = [];
let nbAffiche = 0;
let ready = true;

afficherTableau();

function afficherTableau() {
    let txt = "";
    for (let i = 0; i < tabJeu.length; i++) {
        txt += "<div>";
        for (let j = 0; j < tabJeu[i].length; j++) {
            const valeur = tabJeu[i][j];
            if (valeur === 0) {
                txt += "<button class='btn btn-primary m-2' style='width:100px;height:100px' onClick ='verif(\"" + i + "-" + j + "\")' >Afficher</button>";
            } else {
                txt += "<img src='" + getImage(valeur) + "' style='width:100px;height:100px' class='m-2'>";
            }
        }
        txt += "</div>";
    }
    
    divResultat.innerHTML = txt;
}

function getImage(valeur) {
    let imgTxt = "assets/";
    switch (valeur) {
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

function updateTourCount() {
    if (ready) {
        document.getElementById("count").innerHTML = "Nombre de tours : " + V1;
    }
}

function verif(bouton) {
    if (ready) {
        nbAffiche++;
        let indices = bouton.split("-");
        let ligne = parseInt(indices[0]);
        let colonne = parseInt(indices[1]);
        tabJeu[ligne][colonne] = tabResultat[ligne][colonne];
        afficherTableau();
        if (nbAffiche > 1) {
            ready = false;
            setTimeout(() => {
                if (tabJeu[ligne][colonne] !== tabResultat[oldSelection[0]][oldSelection[1]]) {
                    tabJeu[ligne][colonne] = 0;
                    tabJeu[oldSelection[0]][oldSelection[1]] = 0;
                }
                afficherTableau();
                ready = true;
                nbAffiche = 0;
                oldSelection = [ligne, colonne];
            }, 1000)
        } else {
            oldSelection = [ligne, colonne];
        }
        updateTourCount(count); // Call the function to update tour count
    }
}

// Call the function initially
updateTourCount();

function genereTableauAleatoire() {
    let tab = [];
    let nbImagePositions = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 4; i++) {
        let ligne = [];
        for (let j = 0; j < 4; j++) {
            let fin = false;
            while (!fin) {
                let randomImage = Math.floor(Math.random() * 8);
                if (nbImagePositions[randomImage] < 2) {
                    ligne.push(randomImage + 1);
                    nbImagePositions[randomImage]++;
                    fin = true;
                }
            }
        }
        tab.push(ligne);
    }
    return tab;
}


