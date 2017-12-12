class Saw extends Phaser.TileSprite {
    constructor(game, x, y, asset) {
        super(game, x, y, 20, 20, asset)
        this.game.physics.arcade.enable(this)
        this.body.syncBounds = true
        this.tag = 'saw'
        this.autoCull = true
        this.anchor.setTo(0.5, 0.5)
    }

    setTarget(){
    
        this.game.add.tween(this)
            .to( { x: this.game.width-32, y: 32 }, this.game.width/0.2 )
            .to( { x: this.game.width-32, y: this.game.height-16 }, this.game.height/0.2 )
            .to( { x: 32, y: this.game.height-16 }, this.game.width/0.2 )
            .to( { x: 32, y: 32 }, this.game.height/0.2 )
            .loop(-1)
            .start()
    }

}