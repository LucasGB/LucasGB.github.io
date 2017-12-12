class Bullet extends Phaser.TileSprite {
    constructor(game, x, y, asset) {
        super(game, x, y, 8, 10, asset)
        this.game.physics.arcade.enable(this)        
        this.tag = 'bullet'   
        this.body.moves = true;
    }
}