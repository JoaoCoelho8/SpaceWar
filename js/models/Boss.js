export default class Boss extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'boss'); 
        this.scene=scene;
        this.alive=true;
        this.setScale(0.2);
        this.lives=1000;
        this.canBeKilled = true;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.setGravityY(0);  
        this.flag=false   
        this.setVelocityX(150);
        this.timer= Math.floor(Math.random() * 400 + 100);
        this.i=0
        this.pararDescer=false
        this.esquerda=false
    }

    //mover o boss
    move(){
        if(this.i==this.timer){
            if(this.y==300 && this.pararDescer==false){  
                this.setVelocityX(0);
                this.setVelocityY(700);
            }
            else if(this.y>995 && this.y<1005){
                this.pararDescer=true;
                this.setVelocityY(-280);
            }
            else if(this.y>295 && this.y<305 && this.pararDescer){
                if(this.esquerda){
                    this.setVelocityX(-150);
                }else{
                    this.setVelocityX(150);
                }
                this.setVelocityY(0);
                this.y=300;
                this.pararDescer=false;
                this.i=0;
                this.timer = Math.floor(Math.random() * 400 + 100);
            }
        }else{
            this.y=300;
            if(this.x > 148 && this.x < 152){
                this.setVelocityX(150);  
                this.esquerda=false  
            } 
            if(this.x > 848 && this.x < 852) {
                this.setVelocityX(-150);
                this.esquerda=true
            }
            this.i++
        }
    }
    
    dead() {
        let x = this.x;
        let y = this.y;
    }

    /**
     * change the color (tint) and re-enable collisions
     */
    //nao irá ser usado
    revive() {
        if(this.y>305){
            this.canBeKilled=true;
            this.tint = 0xFFFFFF
            return;
        }else{
            this.canBeKilled = false;
        }
        
        let i = 0;
        let repetition = 40
        let changeTint = true;

        /**
         * timer to change the bird's color/tint 
         */
        this.scene.time.addEvent({
            repeat: repetition,
            loop: false,
            callback: () => {
                if(this.y>305){
                    this.canBeKilled=true;
                    this.tint = 0xFFFFFF
                    return;
                }else{
                    if(this.canBeKilled==false){
                        //in the last repetition replace the normal color (tint) and re-enables collision
                        if (i >= repetition) {
                            this.tint = 0xFFFFFF
                            this.canBeKilled = true;
                        } else {
                            this.tint = 0xFF0000
                        }
                        i++
                    }else{
                        this.tint = 0xFFFFFF
                    }
                }
            }
        });
    }
}