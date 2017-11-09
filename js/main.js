
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('mushroom', 'assets/sprites/mushroom2.png');
}

var cursors;

function create() {

    game.stage.backgroundColor = '#2d2d2d';

    //  Make our game world 2000x2000 pixels in size (the default is to match the game size)
    game.world.setBounds(0, 0, 2000, 2000);

    for (var i = 0; i < 150; i++)
    {
        game.add.sprite(game.world.randomX, game.world.randomY, 'mushroom');
    }


}

function update() {

    if (this.game.input.activePointer.isDown) { 
        if (this.game.origDragPoint) {      
            // move the camera by the amount the mouse has moved since last update      
            this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;     
            this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.position.y; 
        }   
    // set new drag origin to current position  
    this.game.origDragPoint = this.game.input.activePointer.position.clone();

    } else {    
        this.game.origDragPoint = null;
}


}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);

}
