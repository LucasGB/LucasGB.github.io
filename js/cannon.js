class Cannon extends Phaser.TileSprite {
    constructor(game, x, y, asset, facing) {
        super(game, x, y, 32, 32, asset)
        this.game.physics.arcade.enable(this)
        this.body.syncBounds = true
        this.body.immovable = true
        this.tag = 'cannon'
        this.facing = facing
        this.fire_rate = 100;
        this.autoCull = true
        this.game = game
        this.next_fire = 1000
    }
}