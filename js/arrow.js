class Arrow extends Phaser.Sprite {
    constructor(game, x, y, asset) {
        super(game, x, y, asset)   
        this.anchor.setTo(0.5)
        this.inputEnabled = true
        //this.input.enableDrag(false, true)     
        this.game.physics.arcade.enable(this)
        this.body.fixedRotation = true
        this.pressed_px;
        this.pressed_py;
        this.released_px;
        this.released_py;
        this.xVector;
        this.yVector;
        this.angle;
        }

    update() {
        this.xVector = (this.game.input.activePointer.position.x - this.pressed_px) * -1;
    	this.yVector = (this.game.input.activePointer.position.y - this.pressed_py) * -1;
    	this.angle = Math.atan2(-this.yVector,  -this.xVector) * 180 / Math.PI;
    }
}
