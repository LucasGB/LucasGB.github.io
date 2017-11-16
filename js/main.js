
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('mushroom', 'assets/sprites/mushroom2.png');
    game.load.image('player', 'assets/sprites/pangball.png');
    game.load.image('arrow', 'assets/sprites/longarrow2.png');

    // teste
    game.load.tilemap('map', 'assets/tilemaps/maps/tulo.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('tiles', 'assets/tilemaps/tilesets/tiles.png');
}

var cursors;
var arrow = null;

var player;
var pressed_px;
var pressed_py;
var released_px;
var released_py;
var xVector;
var yVector;
var angle;

var map;
var layer;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(10, 1900, 'player');

    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.anchor.setTo(0.5);

    player.body.fixedRotation = true;

    game.stage.backgroundColor = '#2d2d2d';

//    //  Make our game world 2000x2000 pixels in size (the default is to match the game size)
//    game.world.setBounds(0, 0, 2000, 2000);
//
//    for (var i = 0; i < 150; i++)
//    {
//        game.add.sprite(game.world.randomX, game.world.randomY, 'mushroom');
//    }




//teste
    map = game.add.tilemap('map');

    map.addTilesetImage('tiles');

    layer = map.createLayer('Camada de Tiles 1');

    layer.resizeWorld();
    //  Here we create our ground group
    ground = game.add.group();
    ground.enableBody = true;

    //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the ground group
    map.createFromObjects('mapa', 2, 'tiles', 1, true, false, ground);

    // fim teste






    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    this.game.input.onDown.add(get_pressed_position, this);
    this.game.input.onUp.add(slingshot, this);

}

function update() {
    if(arrow != null){ rotate_arrow(); } 
}

function rotate_arrow(){
    xVector = (this.game.input.activePointer.position.x - pressed_px) * -1;
    yVector = (this.game.input.activePointer.position.y - pressed_py) * -1;
    arrow.angle = Math.atan2(-yVector,  -xVector) * 180 / Math.PI;
}

function get_pressed_position(){
    arrow = game.add.sprite(player.x, player.y, 'arrow');
    arrow.anchor.setTo(1, 0.5);
    player.body.moves = false;
    pressed_px = this.game.input.activePointer.position.x;
    pressed_py = this.game.input.activePointer.position.y;
    touch_held = true;
}

// RX Geometria Analítica!
function slingshot(){
    arrow.destroy();
    arrow = null;
    released_px = this.game.input.activePointer.position.x;
    released_py = this.game.input.activePointer.position.y;
    touch_held = false;

    xVector = (released_px - pressed_px) * -1;
    yVector = (released_py - pressed_py) * -1;

    var norm = Math.pow(( Math.pow(xVector, 2) + Math.pow(yVector, 2) ), 1/2);
    var x_velocity = xVector/norm * 300;
    var y_velocity = yVector/norm * 300;

    player.body.moves = true;

    player.body.velocity.setTo(x_velocity, y_velocity);
}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);

}
