import Ship from "../models/Ship.js";
import Enemies from "../models/Enemies.js";
import Comets from "../models/Comets.js";
import Lifes from "../models/Lifes.js"
import Stars from "../models/Stars.js";
import Boss from "../models/boss.js";

export default class ThirdScene extends Phaser.Scene {
  constructor() {
    super("ThirdScene");
    this.highScore = 0;
  }
  
  preload() {
    //adicionar a nave
    this.load.spritesheet("ship", "assets/ship.png", {
      frameWidth: 64,
      frameHeight: 255/4,
    });

    //adicionar inimigo
    this.load.spritesheet("enemy1", "assets/enemies.png", {
      frameWidth: 96,
      frameHeight: 96
    });

    //adicionar cometas lado direito
    this.load.spritesheet("comet", "assets/comet.png", {
      frameWidth: 960/5,
      frameHeight: 1344/7,
    });

    //adicionar cometas lado esquerdo
    this.load.spritesheet("comet1", "assets/comet1.png", {
      frameWidth: 1344/7,
      frameHeight: 959/5,
    });

    //adicionar vidas
    this.load.spritesheet("life", "assets/life.png", {
      frameWidth: 2555,
      frameHeight: 2391
    });

    //adicionar estrelas
    this.load.spritesheet("star", "assets/star.png", {
      frameWidth: 300,
      frameHeight: 300
    });

    //adicionar vidas
    this.load.spritesheet("boss", "assets/boss.png", {
      frameWidth: 1331,
      frameHeight: 1463
    });
   
    //adicionar imagens e sons
    this.load.image("background", "assets/background.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.audio("catchup", "assets/catchup.wav");
    this.load.audio("shoot", "assets/shoot.mp3");
    this.load.audio("eDown", "assets/enemyDown.wav");
    this.load.audio("song","assets/song.wav");
    this.load.audio("dead","assets/dead.wav");
  }

  create() {
    this.comets = new Comets(this.physics.world,this,[]);
    this.composeGUI();
    this.createShip();
    this.createBoss();
    this.addInputs();
    this.addAnimations();
    this.checkWin();
    this.pause();
    this.songUp();
    this.songDown();
    this.addSounds();
    this.addEvents();
    this.addColisions();
    this.moveBoss();
  }

  //função update pode ter como parametros o tempo do jogo e a variação em milisegundos entre as frames
  //será usado aqui para marcar a duração entre dois tiros consecutivos
  //https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html#update__anchor
  update(time,delta) {
    this.song.resume();

    this.moveBoss();

    this.songUp();
    this.songDown();

    // ganha o jogo - acaba
    this.checkWin();

    //fazer pausa 
    this.pause();

    //se ainda tiver vidas, continua
    if (this.ship.lives > 0) {
      this.ship.update(this.cursors);
      this.checkInputs(time);
      this.checkBorders();

      //senão se ja não tiver vidas ....
    } else {
      //....atualizar score se o highScore for maior
      if(this.score > this.highScore){
        this.highScore = this.score;
        this.highScore1.setText(this.highScore);
      }

      //.... adicionar texto a dizer game over pq nao tem mais vidas
      this.add.text(350, 500, "Game Over", {
        font: "50px Cambria",
        fill: "#ffffff"
      });

      //.... adicionar texto para recomeçar
      this.add.text(300, 600, "Press <enter> to restart", {
        font: "35px Cambria",
        fill: "#ffffff"
      });

      //.... nave vai para a posição inicial
      this.stopEvents();
      this.ship.x = 500;
      this.ship.y = 900;
      this.ship.setGravityY(0);

       //.... clicar no enter para recmeçar
       if (Phaser.Input.Keyboard.JustDown(this.menuKey)) {
        this.song.stop();
        this.scene.stop();
        this.scene.start('FirstScene');
      }
    }
  }

  //adicionar sons
  addSounds(){
    this.catchupS = this.sound.add("catchup");
    this.catchupS.setVolume(0.05);
    this.shootS = this.sound.add("shoot");
    this.shootS.setVolume(0.10);
    this.enemyDown = this.sound.add("eDown");
    this.enemyDown.setVolume(0.25);
    this.dead = this.sound.add("dead");
    this.dead.setVolume(0.25);
    this.song = this.sound.add("song");
    this.song.play();
  }

  //adicionar colisão
  addColisions() { 
    //se a nave colidir com os cometas ....
    this.enemiesCollider2=this.physics.add.overlap(
      this.ship,
      this.comets,
      //eliminar o cometa
      this.colisionHandler2,
      () => {
        if (this.ship.canBeKilled) {
          this.ship.dead();
          this.time.addEvent({
              delay: 100,
              callback: () => {
                this.ship.revive();
              }
          });
          //para tudo
          this.stopEvents();
          //scene começa onde estava pq ainda tem vidas
          this.recreateScene();
          //perdemos uma vida
          this.labelLives.setText(--this.ship.lives);
          //começa som da nossa nave que foi atingida
          this.dead.play();
        }
      },
      null,
      this
    );

    //se balas colidirem com inimigos ....
    this.enemiesCollider=this.physics.add.overlap(
      this.ship.bullets,
      this.boss,
      (boss, bullet) => {
        if (this.boss.canBeKilled) {
          this.ship.bullets.killAndHide(bullet);
          bullet.setX(-1000);
          bullet.setVelocityX(0);
          bullet.setVelocityY(0);
          bullet.setVelocity(0, 0);
          bullet.destroy();
          this.dead.play();
          this.boss.lives=this.boss.lives-10;
          this.labelLivesBoss.setText(this.boss.lives);
        }
      },
    );

    //se a nave colidir com os inimigos ....
    this.physics.add.overlap(
      this.ship,
      this.boss,
      () => {
        if (this.ship.canBeKilled) {
          this.ship.dead();
          this.time.addEvent({
              delay: 10,
              callback: () => {
                this.ship.revive();
              }
          });
          //para tudo
          this.stopEvents();
          //scene começa onde estava pq ainda tem vidas
          this.recreateScene();
          //perdemos uma vida
          this.labelLives.setText(--this.ship.lives);
          //começa som da nossa nave que foi atingida
          this.dead.play();
        }
      },
      null,
      this
    );  
  }

  //adicionar eventos
  addEvents(){
    //adiconar novos cometas com delay de 350
    this.timer4 = this.time.addEvent({
      delay: 450,
      callback: this.comets.addNewEnemy,
      callbackScope: this,
      repeat: -1
    });

    //adiconar som
    this.timer6 = this.time.addEvent({
      delay: 50000,
      callback: this.playSong,
      callbackScope: this,
      repeat: -1
    });
  }

  //parar os eventos
  stopEvents(){
    this.timer4.destroy();
    this.timer6.destroy();
  }

  //reconstituir scene
  recreateScene(){

    //chamar os cometas que estavam na scene
    Phaser.Actions.Call(this.comets.getChildren(), function(p) {
      p.destroy();
    });

    //nave recomeça na posição inicial
      this.addEvents();
      this.ship.x=500;
      this.ship.y=900;
      this.ship.alive=true;
  }

  //colisão entre bala e inimigo, destroi os dois
  colisionHandler(bullet) {
    bullet.destroy();
  }

  //colisão entre nave e cometa, destroi o cometa
  colisionHandler2(ship, comet){
    comet.destroy();
  }

  composeGUI() {
    //adicionar imagem fundo
    this.add.image(0, 0, "background").setOrigin(0, 0);

    //score começa em 0
    this.score = 0;

    //adicionar texto
    this.highText = this.add.text(440, 10, "Boss Level",{
      font: "30px Cambria",
      fill: "#ffffff"
    });

    //adicionar texto
    this.labelLives = this.add.text(930 , 1150, 5, {
      font: "30px Cambria",
      fill: "#ffffff"
    });

    //adicionar texto
    this.labelLivesBoss = this.add.text(650 , 1150, 1000, {
      font: "30px Cambria",
      fill: "#ffffff"
    });

    //adicionar texto
    this.scText = this.add.text(850, 1150, "Lives:",{
      font: "30px Cambria",
      fill: "#ffffff"
    });

    //adicionar texto
    this.lvText = this.add.text(500, 1150, "Boss Lives:",{
      font: "30px Cambria",
      fill: "#ffffff"
    });
  }

  //criar a nave
  createShip() {
    //posição onde a nave vai começar
    this.ship = new Ship(this, 500, 900);
    this.ship.setSize(90,90,true);
  }

  //criar boss
  createBoss() {
    //posição onde a boss vai começar
    this.boss = new Boss(this, 500, 240);
    this.boss.setSize(1331,1463,true);
    this.boss.alive=true;
    this.boss.setGravityY(0);
  }

  addInputs() {
    this.cursors = this.input.keyboard.createCursorKeys();
    //space vai ser usado para disparar
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //enter vai ser usado para recomeçar scne
    this.menuKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    //tecla para pausar o jogo
    this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    //tecla para aumentar som
    this.songup = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    //tecla para diminuir som
    this.songdown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  //adicionar animaçoes na nave
  addAnimations(){
    this.anims.create({
        key:'turn',
        frames: [{key:'ship' , frame: 3}],
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
        frames: [{key:'ship' , frame: 2}],
        frameRate:1,
        repeat: -1
    });

    this.anims.create({
        key:'up',
        frames: [{key:'ship' , frame: 0}],
        frameRate:10,
        repeat: -1
    });

    this.anims.create({
        key:'up_left',
        frames: [{key:'ship' , frame: 1}],
        frameRate:10,
        repeat: -1
    });

    this.anims.create({
        key:'up_right',
        frames: [{key:'ship' , frame: 2}],
        frameRate:10,
        repeat: -1
    });
  }

  //disparar 
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

  // passar de nivel
  checkWin() {
    //se o score que temos for igual so score que é preciso, ganhou o jogo
		if (this.boss.lives <= 0) {
        localStorage.setItem("complete", "3");
        this.song.stop();
        this.scene.stop();
			  this.scene.start('WinScene');
		}
  }

  //pausa no jogo
  pause(){
    if(Phaser.Input.Keyboard.JustDown(this.pauseKey)){
      this.scene.launch('PauseThirdScene');
      this.scene.pause();
      this.song.pause();
    }
  }

  songUp(){
    if(Phaser.Input.Keyboard.JustDown(this.songup)){
      this.song.setVolume(this.song.volume+0.08);
      this.catchupS.setVolume(this.catchupS.volume+0.01);
      this.shootS.setVolume(this.shootS.volume+0.02);
      this.enemyDown.setVolume(this.enemyDown.volume+0.05);
      this.dead.setVolume(this.dead.volume+0.05);
    }
  }

  songDown(){
    if(Phaser.Input.Keyboard.JustDown(this.songdown)){
      if((this.song.volume-0.08)>0){
        this.song.setVolume(this.song.volume-0.08);
      }else{
        this.song.setVolume(0)
      }

      if((this.catchupS.volume-0.01)>0){
        this.catchupS.setVolume(this.catchupS.volume-0.01);
      }else{
        this.catchupS.setVolume(0)
      }

      if((this.shootS.volume-0.02)>0){
        this.shootS.setVolume(this.shootS.volume-0.02);
      }else{
        this.shootS.setVolume(0)
      }

      if((this.enemyDown.volume-0.05)>0){
        this.enemyDown.setVolume(this.enemyDown.volume-0.05);
      }else{
        this.enemyDown.setVolume(0)
      }

      if((this.dead.volume-0.05)>0){
        this.dead.setVolume(this.dead.volume-0.05);
      }else{
        this.dead.setVolume(0)
      }
    }
  }

  //mover o boss para a esquerda e depois para a direita
  moveBoss(){
    this.boss.move();
  }

  //começar som
  playSong(){
    this.song.stop();
    this.song.play();
  }
}