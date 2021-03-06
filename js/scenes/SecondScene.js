import Ship from "../models/Ship.js";
import Enemies from "../models/Enemies.js";
import Comets from "../models/Comets.js";
import Lifes from "../models/Lifes.js"
import Stars from "../models/Stars.js";

export default class SecondScene extends Phaser.Scene {
  constructor() {
    super("SecondScene");
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

    // passar de nivel
    this.scoretowin = 1000;
   
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
    this.enemies = new Enemies(this.physics.world, this, []);
    this.comets = new Comets(this.physics.world,this,[]);
    this.lifes = new Lifes(this.physics.world,this,[]);
    this.stars = new Stars(this.physics.world,this,[]);

    this.song = this.sound.add("song", { volume: 0.4, loop: true });
    this.song.play();

    this.composeGUI();
    this.createShip();
    this.addInputs();
    this.addAnimations();
    this.checkWin();
    this.pause();
    this.songUp();
    this.songDown();
    this.addSounds();
    this.addEvents();
    this.addColisions();  
  }

  update(time,delta) {

    this.songUp();
    this.songDown();

    this.song.resume()

    // passar de nivel
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
  }

  //adicionar colisão
  addColisions() {  
    //se balas colidirem com inimigos ....
    this.enemiesCollider=this.physics.add.overlap(
      this.ship.bullets,
      this.enemies,
      (bullet, enemy) => {
        if(bullet.scale>1){
          this.enemies.killAndHide(enemy);
          enemy.setY(-2000); enemy.setX(-2000); enemy.setVelocity(0, 0);
          enemy.destroy();
        }else {
          this.enemies.killAndHide(enemy);
          this.ship.bullets.killAndHide(bullet);
          bullet.removeFromScreen();
          enemy.setY(-2000); enemy.setX(-2000); enemy.setVelocity(0, 0);
          enemy.destroy();
        }
      },
      () => {
        //.... score aumenta 10 pq matamos um inimigos
        this.score+=10;
        //.... atualiza o score
        this.labelScore.setText(this.score);
        //.... som de o inimigo eliminado
        this.enemyDown.play();
      }
    );

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
          //perde os poderes
          this.ship.specialBullets=0;
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

    // se a nava colidir com os coraçoes
    this.enemiesCollider3=this.physics.add.overlap(
      this.ship,
      this.lifes,
      //aquele coração é destruido
      this.colisionHandler3,
      () => {
        //coemça som da nave ter apanhado uma vida
        this.catchupS.play();
        //aumenta as vidas (+1)
        this.labelLives.setText(++this.ship.lives);
      },
      null,
      this
    );

    // se a nava colidir com as estrelas
    this.enemiesCollider4=this.physics.add.overlap(
      this.ship,
      this.stars,
      //aquele estrela é destruida
      this.colisionHandler4,
      () => {
        //adiciona 3x balas especiais
        this.ship.setBullets(1);
        this.time.addEvent({
          delay: 100,
          callback: () => {
            this.ship.special();
          }
        });
        //começa som da nave ter apanhado uma estrela
        this.catchupS.play();
        //aumenta score (+100)
          //this.score += 100;
        //atualiza label score
        this.labelScore.setText(this.score);
      },
      null,
      this
    );

    //se a nave colidir com os inimigos ....
    this.physics.add.overlap(
      this.ship,
      this.enemies,
      () => {
        if (this.ship.canBeKilled) {
          this.ship.dead();
          this.time.addEvent({
              delay: 100,
              callback: () => {
                this.ship.revive();
              }
          });
          //perde os poderes
          this.ship.specialBullets=0;
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
    //adiconar novos inimigos com delay de 350
    this.timer = this.time.addEvent({
      delay: 350,
      callback: this.enemies.addNewEnemy,
      callbackScope: this,
      repeat: -1
    });

    //adiconar novos inimigos com delay - vao entrar de lado
    this.timer2 = this.time.addEvent({
      delay: 500,
      callback: this.enemies.addNewEnemy2,
      callbackScope: this,
      repeat: -1
    });

    //adiconar novas vidas
    this.timer3 = this.time.addEvent({
      delay: 8000,
      callback: this.lifes.addLife,
      callbackScope: this,
      repeat: -1
    });

    //adiconar novos cometas com delay de 400
    this.timer4 = this.time.addEvent({
      delay: 400,
      callback: this.comets.addNewEnemy,
      callbackScope: this,
      repeat: -1
    });

    //adicionar novas estrelas
    this.timer5 = this.time.addEvent({
      delay: 12000,
      callback: this.stars.addStar,
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
    this.timer.destroy();
    this.timer2.destroy();
    this.timer3.destroy();
    this.timer4.destroy();
    this.timer5.destroy();
    this.timer6.destroy();
  }

  //reconstituir scene
  recreateScene(){
    //chamar os inimigos que estavam na scene
    Phaser.Actions.Call(this.enemies.getChildren(), function(p) {
      p.destroy();
    });

    //chamar os cometas que estavam na scene
    Phaser.Actions.Call(this.comets.getChildren(), function(p) {
      p.destroy();
    });

    //chamar os coraçoes que estavam na scene
    Phaser.Actions.Call(this.lifes.getChildren(), function(p) {
      p.destroy();
    });

    //chamar as estrelas que estavam na scene
    Phaser.Actions.Call(this.stars.getChildren(), function(p) {
      p.destroy();
    });

    //nave recomeça na posição inicial
      this.addEvents();
      this.ship.x=500;
      this.ship.y=900;
      this.ship.alive=true;
  }
 
  //colisão entre bala e inimigo, destroi os dois
  colisionHandler(bullet, enemy) {
    bullet.setPosition(9999, 9999); bullet.setVelocity(0, 0);
    bullet.destroy();
    enemy.setY(-2000); enemy.setX(-2000); enemy.setVelocity(0, 0);
    enemy.destroy();
  }

  //colisão entre nave e cometa, destroi o cometa
  colisionHandler2(ship, comet){
    comet.destroy();
  }

  //colisão entre nave e coraçao, destroi o coraçao
  colisionHandler3(ship,life){
    life.destroy();
  }

  //colisão entre nave e estrela, destroi o estrela
  colisionHandler4(ship,star){
    star.destroy();
  }

  composeGUI() {
    //adicionar imagem fundo
    this.add.image(0, 0, "background").setOrigin(0, 0);

    //score começa em 0
    this.score = 0;

    //adicionar texto
    this.highText = this.add.text((this.scale.width/2)-30, 10, "Level 2",{
      font: "30px Cambria",
      fill: "#ffffff"
    });

    //adicionar texto
    this.highText = this.add.text(750, 10, "Highscore:",{
      font: "30px Cambria",
      fill: "#ffffff"
    });

    //adicionar texto
    this.highScore1 = this.add.text(900,10, this.highScore,{
      font: "30px Cambria",
      fill: "#ffffff"
    });

    //adicionar texto
    this.labelScore = this.add.text(750, 1150, 0, {
      font: "30px Cambria",
      fill: "#ffffff"
    });

    //adicionar texto
    this.labelLives = this.add.text(930 , 1150, 5, {
      font: "30px Cambria",
      fill: "#ffffff"
    });

    //adicionar texto
    this.scText = this.add.text(650, 1150, "Score:",{
      font: "30px Cambria",
      fill: "#ffffff"
    });

    //adicionar texto
    this.lvText = this.add.text(830, 1150, "Lives:",{
      font: "30px Cambria",
      fill: "#ffffff"
    });
  }

  //criar a nave
  createShip() {
    //posição onde a nave vai começar
    this.ship = new Ship(this, 500, 900);
    this.ship.setSize(90,90,true);

    //resolução de problema que aumentava o score mesmo sem o utilizador ter disparado uma bala
    let badBullet = this.ship.bullets.getFirstAlive()
    this.ship.bullets.killAndHide(badBullet);
    badBullet.removeFromScreen();
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
    //se o score que temos for igual so score que é preciso para pssar de nivel
		if (this.score >= this.scoretowin) {
      localStorage.setItem("complete", "2");
      this.song.stop();
			this.scene.stop();
			this.scene.start('SecondNextLevelScene');
		}
  }
  
  //pausa no jogo
  pause(){
    if(Phaser.Input.Keyboard.JustDown(this.pauseKey)){
      this.cursors.isDown=false;
      this.scene.launch('PauseSecondScene');
      this.song.pause();
      this.scene.pause();
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

  //começar som
  playSong(){
    this.song.pause();
    this.song.play();
  }
}