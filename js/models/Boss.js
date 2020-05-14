export default class Boss extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'boss');        
        this.scene=scene;
        this.alive=true;
        this.setScale(0.3);
        this.lives=500;
        this.canBeKilled = true;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.setGravityY(0);        
    }

    dead() {
        let x = this.x;
        let y = this.y;
    }

    /**
     * replace the boss on-screen, change the bird color (tint) and re-enable collisions
     */
    revive() {

        this.x = 500;
        this.y = 500;

        let i = 0;
        let repetition = 200
        let changeTint = true;

        /**
         * timer to change the boss's color/tint 
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
                        this.tint = 0xFF0000
                    } else {
                        this.tint = 0xFFFFFF
                    }
                    if (i % 20 == 0) {
                        changeTint = !changeTint;
                    }

                }
                i++
            }
        });
    }
}