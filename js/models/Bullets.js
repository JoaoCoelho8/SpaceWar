export default class Bullets extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y,"bullet");
      this.setScale(0.75);
      this.scene.add.existing(this);
      this.scene.physics.world.enable(this);
      this.setPosition(9999, 9999);
      this.setVelocityX(0);
      this.setVelocityY(0);
      this.setActive(false);
      this.setVisible(false);
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
      this.x = -100;
      this.setVelocityX(0);
      this.setVelocityY(0);
      this.setVelocity(0, 0);
    }

    isOutsideCanvas() {
      const width = this.scene.game.config.width;
      const height = this.scene.game.config.height;

      return this.x > width || this.y > height || this.x < 0 || this.y < 0;
    }

  }
  