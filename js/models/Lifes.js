export default class Lifes extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children) {
        super(world, scene);
        this.scene = scene;
        this.alive = true;
        this.x;
        this.y;
    }
      //adicionar vidas que vao aparecer no nivel 2 - aumentam vida
      addLife(){
        do{
            this.x = 67*Math.floor(Math.random() * 10) + 10;
            if(this.x <=20) this.x = 20;  
          } while (this.x > 1000); 
        this.y = 0;
    
        var life=this.lifes.create(this.x,this.y,"life");
        life.setVelocityX(0);
        life.setVelocityY(250);
        life.setFrame(0);
        life.setScale(0.01);
        life.checkWorldBounds = true;
        life.outOfBoundsKill = true;
      }
}