import Ship from "../models/Ship.js";
import Enemies from "../models/Enemies.js";
import Comets from "../models/Comets.js";

export default class FirstScene extends Phaser.Scene {
  constructor() {
    super("FirstScene");
    this.highScore = 0;
	}
  preload() {
    this.load.spritesheet("ship", "assets/ship.png", {
      frameWidth: 396/4,
      frameHeight: 308/2,
    });
    this.load.spritesheet("enemy1", "assets/enemies.png", {
      frameWidth: 96,
      frameHeight: 96
    });
    this.load.spritesheet("comet", "assets/comet.png", {
      frameWidth: 960/5,
      frameHeight: 1344/7,
      
    });
    this.load.spritesheet("comet1", "assets/comet1.png", {
      frameWidth: 1344/7,
      frameHeight: 959/5,
      
    });
   
    this.load.image("background", "assets/background.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.audio("catchup", "assets/catchup.wav");
    this.load.audio("shoot", "assets/shoot.mp3");
    this.load.audio("eDown", "assets/enemyDown.wav");
    this.load.audio("song","assets/song.wav");
    this.load.audio("dead","assets/dead.wav");
  }
  create() {
    this.composeGUI();
    this.createShip();
    this.addInputs();
    this.addAnimations();
    //https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Group.html
    this.enemies = new Enemies(this.physics.world, this, []);
    this.comets = new Comets(this.physics.world,this,[]);
    this.addSounds();
    this.addEvents();
    this.addColisions();  
  }

  //função update pode ter como parametros o tempo do jogo e a variação em milisegundos entre as frames
  //será usado aqui para marcar a duração entre dois tiros consecutivos
  //https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html#update__anchor
  update(time,delta) {
    var flag = false;
    if (this.ship.lives > 0) {
      this.ship.update(this.cursors);
      this.checkInputs(time);
      this.checkBorders();

    } else {
      if(this.score > this.highScore){
        this.highScore = this.score;
        this.highScore1.setText(this.highScore);
      }
      this.add.text(350, 500, "Game Over", {
        font: "50px Cambria",
        fill: "#ffffff"
      });
      this.add.text(300, 600, "Press <enter> to restart", {
        font: "35px Cambria",
        fill: "#ffffff"
      });
      this.stopEvents();
      this.ship.x = 500;
      this.ship.y = 900;
      this.ship.setGravityY(0);
      if (Phaser.Input.Keyboard.JustDown(this.menuKey)) {
        this.song.stop();
        this.scene.restart();
      }
    }
  }

  addSounds(){
    this.catchupS = this.sound.add("catchup");
    this.catchupS.setVolume(0.05);
    this.shootS = this.sound.add("shoot");
    this.shootS.setVolume(0.10);
    this.enemyDown = this.sound.add("eDown");
    this.enemyDown.setVolume(0.25);
    this.song = this.sound.add("song");
    this.song.play();
    this.dead = this.sound.add("dead");
    this.dead.setVolume(0.25);
  }

  addColisions() {  
    this.enemiesCollider=this.physics.add.overlap(
      this.ship.bullets,
      this.enemies,
      this.colisionHandler,
      () => {
        this.score+=10;
        this.labelScore.setText(this.score);
        this.enemyDown.play();
      },
      null,
      this
    );
    this.enemiesCollider2=this.physics.add.overlap(
      this.ship,
      this.comets,
      this.colisionHandler2,
      () => {
        this.stopEvents();
        this.recreateScene();
        this.labelLives.setText(--this.ship.lives);
        this.dead.play();
      },
      null,
      this
    );
 
    this.physics.add.overlap(
      this.ship,
      this.enemies,
      () => {
        this.stopEvents();
        this.recreateScene();
        this.labelLives.setText(--this.ship.lives);
        this.dead.play();
      },
      null,
      this
    );  
  }

  addEvents(){
    this.timer = this.time.addEvent({
      delay: 350,
      callback: this.enemies.addNewEnemy,
      callbackScope: this,
      repeat: -1
    });
  
    this.timer4 = this.time.addEvent({
      delay: 350,
      callback: this.comets.addNewEnemy,
      callbackScope: this,
      repeat: -1
    });

    this.timer6 = this.time.addEvent({
      delay: 50000,
      callback: this.playSong,
      callbackScope: this,
      repeat: -1
    });
  }

  stopEvents(){
    this.timer.destroy();
    this.timer4.destroy();
    this.timer6.destroy();
  }

  recreateScene(){
    Phaser.Actions.Call(this.enemies.getChildren(), function(p) {
      p.destroy();
    });
    Phaser.Actions.Call(this.comets.getChildren(), function(p) {
      p.destroy();
    });
    
      this.addEvents();
      this.ship.x=500;
      this.ship.y=900;
      this.ship.alive=true;
  }
 
  colisionHandler(bullet, enemy) {
    bullet.destroy();
    enemy.destroy();
  }
  colisionHandler2(ship, comet){
    comet.destroy();
  }

  composeGUI() {
    this.add.image(0, 0, "background").setOrigin(0, 0);
    this.score = 0;
    
    this.highText = this.add.text(730, 10, "Highscore:",{
      font: "30px Cambria",
      fill: "#ffffff"
    });
    this.highScore1 = this.add.text(880,10, this.highScore,{
      font: "30px Cambria",
      fill: "#ffffff"
    });
    this.labelScore = this.add.text(90, 1150, 0, {
      font: "30px Cambria",
      fill: "#ffffff"
    });
    this.labelLives = this.add.text(950 , 1150, 5, {
      font: "30px Cambria",
      fill: "#ffffff"
    });
    this.scText = this.add.text(5, 1150, "Score:",{
      font: "30px Cambria",
      fill: "#ffffff"
    });
    this.lvText = this.add.text(850, 1150, "Lives:",{
      font: "30px Cambria",
      fill: "#ffffff"
    });
  }
  createShip() {
    this.ship = new Ship(this, 500, 900);
    this.ship.setSize(90,90,true);
  }

  addInputs() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.menuKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  addAnimations(){
    this.anims.create({
        key:'turn',
        frames: [{key:'ship' , frame: 0}],
        frameRate:1,
    });

    this.anims.create({
        key:'left',
        frames: [{key:'ship' , frame: 1}],
        frameRate:1,
        repeat: -1
    });

    this.anims.create({
        key:'right',
        frames: [{key:'ship' , frame: 3}],
        frameRate:1,
        repeat: -1
    });

    this.anims.create({
        key:'up',
        frames: [{key:'ship' , frame: 4}],
        frameRate:10,
        repeat: -1
    });

    this.anims.create({
        key:'up_left',
        frames: [{key:'ship' , frame: 5}],
        frameRate:10,
        repeat: -1
    });

    this.anims.create({
        key:'up_right',
        frames: [{key:'ship' , frame: 7}],
        frameRate:10,
        repeat: -1
    });
  }

  checkInputs(time) {
    this.ship.update(this.cursors);
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      //tempo do jogo será passado para o objeto nave
      this.ship.fire(time);
      this.shootS.play();
    }
  }

  // se sair das bordas perde vidas
  checkBorders() {
    if (this.ship.y < -60 || this.ship.y > 1225) {
      this.ship.lives--;
      this.labelLives.setText(this.ship.lives);
    }
  }

  playSong(){
    this.song.stop();
    this.song.play();
  }
  
}
 
