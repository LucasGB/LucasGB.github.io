
class PlayState extends GameState {

    preload() {
        this.game.load.image('player', 'assets/sprites/pangball.png');
        this.game.load.image('arrow', 'assets/sprites/longarrow2.png');

        this.game.load.image('black_square', 'assets/tilemaps/tilesets/black_square.png');
        this.game.load.image('red_square', 'assets/tilemaps/tilesets/red_square.png');
        this.game.load.image('blue_square', 'assets/tilemaps/tilesets/blue_square.png');
        this.game.load.image('green_square', 'assets/tilemaps/tilesets/green_square.png');

        // Sprites
        this.game.load.image('bad_cannon', 'assets/sprites/bad_cannon.png');
        this.game.load.image('bad_cannon_laser', 'assets/sprites/cannon_laser.png');

        this.game.load.tilemap('map', 'assets/tilemaps/maps/mapacerto.json', null, Phaser.Tilemap.TILED_JSON);

    }

    create() {
        this.game.renderer.roundPixels = true
        //game.renderer.clearBeforeRender = false
        this.game.physics.startSystem(Phaser.Physics.ARCADE)

        this.stage.backgroundColor = '#2d2d2d';

        this.player = new Player(this.game, 50, 685, 'player')
        this.game.add.existing(this.player)
        this.player.body.moves = false;

        this.arrow = new Arrow(this.game, this.player.x, this.player.y, 'arrow')
        this.game.add.existing(this.arrow)
        this.arrow.kill()

        // mapa com paredes
        this.createMap()

        // Sets camera to follow player
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)

        this.game.input.onDown.add(this.get_pressed_position, this);
        this.game.input.onUp.add(this.slingshot, this);

        //this.fps = new FramesPerSecond(this.game, this.game.width/2, 50)
        //this.game.add.existing(this.fps)

        // adicionar controles de full screen a tela
        //super.initFullScreenButtons()

        this.hops = 0;
        this.next_fire = 0;
        this.fire_rate = 2000;

        //this.game.time.advancedTiming = true;
    }
    
    createMap() {
        let mapTmx = this.game.add.tilemap('map');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);

        // Groups
        this.map = this.game.add.group()
        this.wall_group = this.game.add.group()
        this.sliding_box = this.game.add.group()
        this.bullets = this.game.add.group()
        this.cannons = this.game.add.group()

        // Walls
        mapTmx.createFromObjects('Object Layer 1', 1, 'black_square', 0, true, false, this.sliding_box, Block);
        mapTmx.createFromObjects('Object Layer 1', 2, 'red_square', 1, true, false, this.wall_group, Block);
        mapTmx.createFromObjects('Object Layer 1', 3, 'blue_square', 2, true, false, this.wall_group, Block);
        mapTmx.createFromObjects('Object Layer 1', 4, 'green_square', 3, true, false, this.map, Block);

        // Static enemies
        this.cannons.add(new Cannon(this.game, 640, 655, 'bad_cannon', 'up'))
        this.cannons.children[0].anchor.setTo(0.5);
        this.cannons.children[0].angle = 180;

        this.cannons.add(new Cannon(this.game, 50, 50, 'bad_cannon', 'right'))
        this.cannons.children[1].anchor.setTo(0.5);
        this.cannons.children[1].angle = -90;

        this.cannons.add(new Cannon(this.game, 1170, 545, 'bad_cannon', 'down'))
        //this.game.add.existing(this.cannon)

        this.create_tweens();
    }

    create_tweens(){
        this.sliding_box.callAll('setTarget');
    }

    get_pressed_position(){
        if(!this.player.body.moves){
            this.arrow.reset(this.player.x, this.player.y)
            this.arrow.pressed_px = this.game.input.activePointer.position.x;
            this.arrow.pressed_py = this.game.input.activePointer.position.y;
        }
    }

    slingshot(){
        if(!this.player.body.moves){
            this.arrow.kill();
            this.arrow.released_px = this.game.input.activePointer.position.x;
            this.arrow.released_py = this.game.input.activePointer.position.y;
        
            this.arrow.xVector = (this.arrow.released_px - this.arrow.pressed_px) * -1;
            this.arrow.yVector = (this.arrow.released_py - this.arrow.pressed_py) * -1;
        
            var norm = Math.pow(( Math.pow(this.arrow.xVector, 2) + Math.pow(this.arrow.yVector, 2) ), 1/2);
            var x_velocity = this.arrow.xVector/norm * 500;
            var y_velocity = this.arrow.yVector/norm * 500;
        
            this.player.body.moves = true;
        
            this.player.body.velocity.setTo(x_velocity, y_velocity);
        }
    }

    update() { 
        this.game.physics.arcade.collide(this.player, this.wall_group, this.stick, null, this);
        this.game.physics.arcade.collide(this.bullets, this.wall_group, this.kill, null, this);
        this.fire_cannons();

        //console.log('x: ',this.player.x, 'y: ', this.player.y);
        //console.log(this.player.body.moves)
    }

    stick() {
        this.player.body.moves = false; 
        this.hops += 1;
    }

    fire_cannons(){
        if(this.game.time.now > this.next_fire){
            this.next_fire = this.game.time.now + this.fire_rate
            var gameInstance = this.game            
            for(var i = 0; i < this.cannons.children.length; i++){
                var cannon = this.cannons.children[i]
                if(cannon.alive){                    
                    var bullet = new Bullet(gameInstance, cannon.x, cannon.y+5, 'bad_cannon_laser');
                    bullet.anchor.setTo(0.5, 0.5)
                    if(cannon.facing == 'down'){
                        bullet.body.velocity.y = 200;
                    } else if(cannon.facing == 'up'){
                        bullet.body.velocity.y = -200;
                    } else if(cannon.facing == 'left'){
                        bullet.body.velocity.x = -200;
                    } else {
                        bullet.body.velocity.x = 200;
                    }
                    this.game.add.existing(bullet);
                    this.bullets.add(bullet);                    
                }
            }            

        }
    }

    kill(object){
        object.kill()
    }

    render() {
        //this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");

    }
}

window.onload = function() {
    // funciona como singleton
    const GAME = new Game()
}