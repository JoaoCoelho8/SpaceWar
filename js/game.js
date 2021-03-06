import FirstScene from './scenes/FirstScene.js';
import SecondScene from './scenes/SecondScene.js';
import ThirdScene from './scenes/ThirdScene.js';
import StartScene from './scenes/StartScene.js';
import MenuScene from './scenes/MenuScene.js';
import LevelScene from './scenes/LevelScene.js';
import AboutScene from './scenes/AboutScene.js';
import HelpScene from './scenes/HelpScene.js';
import NextLevelScene from './scenes/NextLevelScene.js';
import SecondNextLevelScene from './scenes/SecondNextLevelScene.js';
import PauseFirstScene from './scenes/PauseFirstScene.js';
import PauseSecondScene from './scenes/PauseSecondScene.js';
import PauseThirdScene from './scenes/PauseThirdScene.js';
import WinScene from './scenes/WinScene.js';
import MenuFinalScene from './scenes/MenuFinalScene.js'

var game;
window.onload = function() {    
    var gameConfig = {
        width: 1000,
        height: 1200,        
        scene: [StartScene, MenuScene, LevelScene, AboutScene, HelpScene, FirstScene, SecondScene, ThirdScene, NextLevelScene, SecondNextLevelScene, PauseFirstScene, PauseSecondScene, PauseThirdScene, WinScene, MenuFinalScene],
        physics: {
            default: "arcade",
            arcade: {
              debug: false,
            }
        }
    }
    
    // Carregar informação que poderá estar guardada no computador
    localStorage.setItem("complete", localStorage.getItem("complete"));
    localStorage.setItem("completedGame", localStorage.getItem("completedGame"));
    console.log(localStorage.getItem("complete"));      //resultado é o último nível passado
    console.log(localStorage.getItem("completedGame")); //resultado 3 -> já passou o jogo; outro (provavelmente null) significa que ainda não passou o jogo
    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);
}

//função para adaptar o jogo à janela onde ele esta aberto
function resizeGame(){
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}