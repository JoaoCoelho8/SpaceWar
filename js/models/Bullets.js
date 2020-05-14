export default class Bullets extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y,"bullet");
      this.setScale(0.75);
      this.scene.add.existing(this);
      this.scene.physics.world.enable(this);
    }
  
    //função de disparo
    fire(x, y,vx,vy) {
      this.setActive(true);
      this.setVisible(true);
      this.setPosition(x, y);
      this.setVelocityX(vx);
      this.setVelocityY(vy);
    }

    removeFromScreen() {
      this.y = -100;
      this.x = -100;
      this.setVelocity(0, 0);
  }

  }
  