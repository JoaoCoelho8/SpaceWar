//import config from './config.js';
import FirstScene from './scenes/FirstScene.js';
import SecondScene from './scenes/SecondScene.js';
import ThirdScene from './scenes/ThirdScene.js';
import StartScene from './scenes/StartScene.js';
import MenuScene from './scenes/MenuScene.js';
import LevelScene from './scenes/LevelScene.js';
import AboutScene from './scenes/AboutScene.js';
import HelpScene from './scenes/HelpScene.js';

var game;
window.onload = function() {    
    var gameConfig = {
        width: 1000,
        height: 1200,        
        scene: [StartScene, MenuScene, LevelScene, AboutScene, HelpScene, FirstScene, SecondScene, ThirdScene],
        physics: {
            default: "arcade",
            arcade: {
              debug: false,
            }
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);
}

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