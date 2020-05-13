export default class Boss extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'boss');        
        this.scene=scene;
        this.alive=true;
        this.setScale(0.3);
        this.lives=100;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.setGravityY(0);        
    }

    update () {
    }
}