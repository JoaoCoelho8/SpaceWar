import Bullets from './Bullets.js';

export default class Ship extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'ship');        
        this.scene=scene;
        this.alive=true;
        this.setScale(1.0);
        this.lives=5;
        this.nextTick=0;
        this.canBeKilled=true;
        this.bulletsMaxsize = 50;
        this.bullets=this.scene.physics.add.group({
            maxSize: this.bulletsMaxsize,
            classType: Bullets,
            key:"bullet"
          });
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.setGravityY(0);    
        this.specialBullets=0;    
    }

    setBullets(nr){
        this.specialBullets=nr;
    }
    //fire a bullet
    fire(time){
        console.log(this.specialBullets);
        
        if(this.specialBullets>0){
            if(time > this.nextTick) {
                var bullet = this.bullets.get();
                    if (bullet) {
                        bullet.setScale(5);
                        bullet.fire(this.x, this.y -30 ,0,-550);
                        this.specialBullets--;
                    }
                //tickFreq é a frequencia em ms com a qual o evento poderá acontecer
                var tickFreq=0;
                this.nextTick = time + tickFreq;
            }
        }else{
            //a nave rastreia o tempo entre "tics" e o tempo atual do jogo
            //o tempo do jogo é sempre atualizado. o próximo tic só será se for inferior ao tempo do jogo
            if(time > this.nextTick) {
                var bullet = this.bullets.get();
                    if (bullet) {
                        bullet.setScale(0.75);
                        bullet.fire(this.x, this.y -30 ,0,-550);
                    }
                //tickFreq é a frequencia em ms com a qual o evento poderá acontecer
                var tickFreq=0;
                this.nextTick = time + tickFreq;
            }    
        }    
    }

    update (cursors) {
        if(cursors.up.isDown && cursors.left.isDown){
            this.setVelocityX(-300);
            this.setVelocityY(-300);
            this.anims.play('up_left',true);
            if(this.x < 0){
                this.x = 0;
            }
            if(this.y < 0){
                this.y = 0;
            }
        }else if(cursors.up.isDown && cursors.right.isDown){
            this.setVelocityX(300);
            this.setVelocityY(-300);
            this.anims.play('up_right',true);
            if(this.x > 1000){
                this.x = 1000;
            }
            if(this.y < 0){
                this.y = 0;
            }
        }else if(cursors.down.isDown && cursors.left.isDown){
            this.setVelocityX(-300);
            this.setVelocityY(300);
            this.anims.play('left',true);
            if(this.x < 0){
                this.x = 0;
            }
            if(this.y > 1200){
                this.y = 1200;
            }
        }
        else if(cursors.down.isDown && cursors.right.isDown){
            this.setVelocityX(300);
            this.setVelocityY(300);
            this.anims.play('right',true);
            if(this.x > 1000){
                this.x = 1000;
            }
            if(this.y > 1200){
                this.y = 1200;
            }
        }
         else if(cursors.left.isDown){
            this.setVelocityY(0);
            this.setVelocityX(-300);
            this.anims.play('left',true);
            if(this.x < 0){
                this.x = 0;
            }
        } else if (cursors.right.isDown){
            this.setVelocityY(0);
            this.setVelocityX(300);
            this.anims.play('right',true);
            if(this.x > 1000){
                this.x = 1000;
            }
        } 
        else if(cursors.up.isDown) {
            this.setVelocityX(0);
            this.setVelocityY(-300);
            this.anims.play('up',true);
            if(this.y < 0){
                this.y = 0;
            }
        } else if(cursors.down.isDown) {
            this.setVelocityX(0);                
            this.setVelocityY(300);
            this.anims.play('turn',true);
            if(this.y > 1200){
                this.y = 1200;
            }
        } 
        else {
            this.setVelocityX(0);
            this.setVelocityY(0);
        }

        this.bullets.children.iterate(function (bullet) {
            if (bullet.isOutsideCanvas()) {
                //bullet.active = false;
                this.bullets.killAndHide(bullet);
                bullet.removeFromScreen();
            }
        }, this);
    }

    dead() {
        //prevents new collision
        this.canBeKilled = false;
    }

    /**
     * replace the bird on-screen, change the bird color (tint) and re-enable collisions
     */
    revive() {
        this.canBeKilled = false;
        let i = 0;
        let repetition = 200
        let changeTint = true;

        /**
         * timer to change the bird's color/tint 
         */
        this.scene.time.addEvent({
            repeat: repetition,
            loop: false,
            callback: () => {

                //in the last repetition replace the normal color (tint) and re-enables collision
                if (i >= repetition) {
                    this.tint = 0xFFFFFF
                    this.canBeKilled = true;
                } else {

                    if (changeTint) {
                        this.tint = 0xFFFFFF
                    } else {
                        this.tint = 0xFF0000
                    }
                    if (i % 20 == 0) {
                        changeTint = !changeTint;
                    }

                }
                i++
            }
        });
    }

    special() {
        let repetition = 12200

        /**
         * timer to change the bird's color/tint 
         */
        this.scene.time.addEvent({
            repeat: repetition,
            loop: false,
            callback: () => {
                if(this.specialBullets>0) {
                    this.tint = 0xECFC03
                }else{
                    this.tint = 0xFFFFFF
                }
            }
        });
    }
}