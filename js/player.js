class Player extends Phaser.Sprite {
    constructor(game, x, y, asset) {
        super(game, x, y, asset)   
        this.anchor.setTo(0.5)
        this.inputEnabled = true
        //this.input.enableDrag(false, true)     
        this.game.physics.arcade.enable(this)
        this.body.fixedRotation = true
        }

    update() {
        // logica do player
    }
}
