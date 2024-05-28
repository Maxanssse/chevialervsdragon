'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/

const facile = 1;
const normal = 2;
const difficile = 3;

let level
let pvJoueur
let pvDragon
let premierAttaquant
let multiplicateur

let partie = new Object()

/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/

function niveau(choix) {
    switch (choix) {
        case '1':
            partie.pvJoueur = 100 + throwDices(10, 10);
            partie.pvDragon = 100 + throwDices(5, 10);
            partie.level = "facile";
            break;
        case '2':
            partie.pvJoueur = 100 + throwDices(10, 10);
            partie.pvDragon = 100 + throwDices(10, 10);
            partie.level = "normal";
            break;
        case '3':
            partie.pvJoueur = 100 + throwDices(7, 10);
            partie.pvDragon = 100 + throwDices(10, 10);
            partie.level = "difficile";
            break;
    }
    return partie;
}

function attaque() {
    let degats = throwDices(3, 6);
    let multiplicateur = 0;
    switch (partie.level) {
        case "facile":
            multiplicateur = throwDices(2, 6);
            break;
        case "normal":
            break;
        case "difficile":
            multiplicateur = throwDices(1, 6);
            break;
    }
    if (partie.premierAttaquant === "joueur") {
        partie.pvDragon -= degats + (degats * multiplicateur / 100);
        if (partie.pvDragon <= 0) {
            partie.pvDragon = 0;
        }
    } else if (partie.premierAttaquant === "dragon") {
        partie.pvJoueur -= degats + (degats * multiplicateur / 100);
        if (partie.pvJoueur <= 0) {
            partie.pvJoueur = 0;
        }
    }
}

function attaquant() {
    let joueur = throwDices(10, 6);
    let dragon = throwDices(10, 6);

    if (joueur > dragon) {
        return "joueur";
    } else {
        return "dragon";
    }
}

function showGameState() {

    // Au départ du jeu, les joueurs sont encore en bonne état !
    let joueur = "knight.png";
    let dragon = "dragon.png";
  

    if (partie.pvDragon < 50) {
      dragon = "dragon-wounded.png";
    }
  

    if (partie.pvJoueur < 50) {
      joueur = "knight-wounded.png";
    }

    document.write('<div class="game-state">');
    document.write('<figure class"game-state_player">');
    document.write('<img src="images/' + joueur + '" alt="Chevalier">');
  
    // Si le joueur est toujours vivant, on affiche ses points de vie
    if (partie.pvJoueur > 0) {
      document.write('<p>' + partie.pvJoueur + '</p>');
    } else {
      document.write("<p>Game Over</p>");
    }
  
    document.write("</figure>");
  
    // Affichage de l'état du dragon
    document.write('<figure class="game-state_player">');
    document.write('<img src="images/' + dragon + '" alt="Dragon">');
  
    // Si le dragon est toujours vivant on affiche ses points de vie
    if (partie.pvDragon > 0) {
      document.write(
        '<p>' + partie.pvDragon + '</p>'
      );
    } else {
      document.write("<p>Game Over</p>");
    }
  
    document.write("</figure>");
    document.write("</div>");
  }

function deroulementPartie() {
    while (partie.pvDragon > 0 && partie.pvJoueur > 0) {
        partie.premierAttaquant = attaquant();
        attaque();
        showGameState();
        partie.tour++;
    }

    showWinner()
}

function showWinner() {

    let dragon = 'dragon.png'
    let joueur = 'knight.png'

    if (partie.pvDragon < 1) {
        document.write('<img src="images/' + dragon + '" alt="Dragon">')
        document.write('<h2>Le dragon a gagné !</h2>')
    }

    if (partie.pvJoueur < 1) {
        document.write('<img src="images/' + joueur + '" alt="Dragon">')
        document.write('<h2>Le dragon a gagné !</h2>')
    }
}

function démarrerPartie() {

    let choix = window.prompt("Choisir la difficulté du jeu (1 pour facile, 2 pour normal et 3 pour difficile")

    attaque(premierAttaquant);

    partie.tour = 1

    let niveauResult = niveau(choix)

    partie.niveau = niveauResult.level

    partie.attaquant = premierAttaquant

    partie.pvDragon = niveauResult.pvDragon
    partie.pvJoueur = niveauResult.pvJoueur
    
    console.log(partie)

    deroulementPartie()

}

démarrerPartie()

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/