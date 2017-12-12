class Block extends Phaser.TileSprite {
    constructor(game, x, y, asset) {
        super(game, x, y, 20, 20, asset)
        this.game.physics.arcade.enable(this)
        this.body.syncBounds = true
        this.body.immovable = true
        this.tag = 'wall'
        this.autoCull = true
    }

    setTarget(){
		this.game.add.tween(this)
                .to({x: this.target_x, y: this.target_y}, 3000)
                .to({x: this.x, y: this.y}, 3000)
                .loop(-1)
                .start()
    }

}