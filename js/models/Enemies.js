export default class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children) {
        super(world, scene);
        this.scene = scene;
        this.alive = true;
        this.drop = false;
        this.x=123456;
        this.y=123456;
       
    }
      //adicionar os inimigos - entrar de cima
      addNewEnemy(){
        do{
          this.x = 100*Math.floor(Math.random() * 10) + 10;
          if(this.x <=20) this.x = 20;
        } while (this.x > 1000); 
        this.y = 0;
        var enemy=this.enemies.create(this.x,this.y,"enemy1");
        
        enemy.setFrame(2);
        enemy.setScale(0.4);
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
        enemy.setVelocityY(100);
      }

      //adicionar os inimigos que vao ser usado no nivel 2 - entrar dos lados
      addNewEnemy2(){
        do{
          this.y = 100*Math.floor(Math.random() * 10) + 10;
          if(this.y <=20) this.y = 20;  
        } while (this.y > 1300);
        this.opt = 0;
        this.opt = (Math.random()  > 0.5 ? 0 : 1000);
        this.x = this.opt;
        var enemy=this.enemies.create(this.x,this.y,"enemy1");
        
        if(this.opt == 0){
          enemy.setVelocityX(100);
          enemy.setFrame(3);
        }
        else {
          enemy.setVelocityX(-100);
          enemy.setFrame(1);
        }
        
        enemy.setScale(0.4);
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
        enemy.setVelocityY(0);
    
      }
}