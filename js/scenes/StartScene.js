export default class StartScene extends Phaser.Scene {
    constructor() {
		super("StartScene");
	}

    preload(){
		// carregar imagem fundo 
		this.load.image("backgroundstart","assets/background-menu-backup.png");
		
		// carregar som fundo do menu about
		this.load.audio("music", "assets/sounds/mistery.mp3");
		
		this.load.plugin('rexfadeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfadeplugin.min.js', true);
		
		this.load.plugin('rexflashplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexflashplugin.min.js', true);
	}

    create(){
		//adicionar a imagem de fundo
		this.add.image(500, 600,"backgroundstart");
		
		//adicionar o som de fundo
		this.backgroundSound = this.sound.add("music", { volume: 0.4, loop: true });
		this.backgroundSound.play();

		//space vai ser usado para avançar para o menu
		this.space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		//tecla para aumentar som
		this.songup = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		//tecla para diminuir som
		this.songdown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		//adicionar texto
		var string = ' Everything we thought we knew about the world,\n  space, the galaxy, just changed. An alienist army\n    is heading towards our planet, with the aim of\ndecimating it completely. You were sent into space\n  on a ship and you have to try to save our planet.\n                Good luck, you are our last hope!';

		//adicionar texto
		this.labelPlayNum = this.add.text(170, 60, "Saving Planet Earth", {
			font: "80px Cambria",
			fill: "white"
		});

		//adicionar texto
		this.labelPlayNum = this.add.text(400, 170, "SPACE WAR", {
			font: "40px Cambria",
			fill: "white"
		});

		//adicionar texto
        this.labelPlayNum1 = this.add.text (77, 500, string, {
			font: "40px Cambria",
			fill: "white"
		});

		//adicionar texto
        this.labelPlayNum2 = this.add.text (350, 900, "Press SPACE to start", {
			font: "40px Cambria",
			fill: "white"
		});
		this.i=0
		this.flag=true
		this.goToMenu=false
		this.divider=25
	}

	update(time) {
		//Press space text blinking
		if (time) {
			
			if (this.flag) {
				this.labelPlayNum2.setVisible(true);
			} else {
				this.labelPlayNum2.setVisible(false);
			}
			if (this.i % this.divider == 0) {
				this.flag = !this.flag;
			}

		}
		this.i++

		this.songUp();
		this.songDown();

		//quando clicar no space avança para o menu
		if (this.space_key.isDown) {
			this.labelPlayNum2.destroy();
			var fade = this.plugins.get('rexfadeplugin').fadeOutDestroy(this.labelPlayNum1, 2000);
			fade.on('complete', function(){
				this.goToMenu=true;
			}, this);
		}

		if(this.goToMenu){
			this.space_key.isDown=false;
			this.scene.stop();
			this.backgroundSound.stop();
			this.scene.start('MenuScene');
		}
	}

	songUp(){
		if(Phaser.Input.Keyboard.JustDown(this.songup)){
		  this.backgroundSound.setVolume(this.backgroundSound.volume+0.08);
		}
	  }
	
	  songDown(){
		if(Phaser.Input.Keyboard.JustDown(this.songdown)){
		  if((this.backgroundSound.volume-0.08)>0){
			this.backgroundSound.setVolume(this.backgroundSound.volume-0.08);
		  }else{
			this.backgroundSound.setVolume(0)
		  }
		}
	  }
}