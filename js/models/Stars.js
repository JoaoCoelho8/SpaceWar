export default class Stars extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children) {
        super(world, scene);
        this.scene = scene;
        this.alive = true;
        this.x;
        this.y;
    }

    //adicionar estrelas que vao aparecer no nivel 2 - aumentam score
    addStar(){
    do{
        this.x = Math.floor(Math.random() * 900 + 50);
        if(this.x <=20) this.x = 20;  
        } while (this.x > 1000); 
    this.y = 0;

    var star=this.stars.create(this.x,this.y,"star");
    star.setVelocityX(0);
    star.setVelocityY(250);
    star.setFrame(0);
    star.setScale(0.1);
    star.checkWorldBounds = true;
    star.outOfBoundsKill = true;
    }
}