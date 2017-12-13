class Vida extends Phaser.TileSprite {
    constructor(game, x, y, asset) {
        super(game, x, y, 16, 16, asset)
        this.game.physics.arcade.enable(this)
        this.scale.setTo(1.5)
        this.body.syncBounds = true
        this.body.immovable = true
        this.tag = 'vida'
        this.autoCull = true
    }

}