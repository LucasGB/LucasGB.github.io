class Block extends Phaser.TileSprite {
    constructor(game, x, y, asset) {
        super(game, x, y, 20, 20, asset)
        this.game.physics.arcade.enable(this)
        this.body.syncBounds = true
        this.body.immovable = true
        this.tag = 'wall'
        this.autoCull = true
    }
}