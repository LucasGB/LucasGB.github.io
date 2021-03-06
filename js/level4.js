
class Level4 extends GameState {

    preload() {
        this.game.load.image('player', 'assets/sprites/pangball.png');
        this.game.load.image('arrow', 'assets/sprites/longarrow2.png');
        this.game.load.image('boss', 'assets/sprites/orb-red.png');

        this.game.load.image('black_square', 'assets/tilemaps/tilesets/black_square.png');
        this.game.load.image('red_square', 'assets/tilemaps/tilesets/red_square.png');
        this.game.load.image('blue_square', 'assets/tilemaps/tilesets/blue_square.png');
        this.game.load.image('green_square', 'assets/tilemaps/tilesets/green_square.png');
        

        // Sprites
        this.game.load.image('fullscreen-button', 'assets/images/fullscreen-button.png');
        this.game.load.image('bad_cannon', 'assets/sprites/bad_cannon.png');
        this.game.load.image('bad_cannon_laser', 'assets/sprites/cannon_laser.png');
        this.game.load.image('diamond', 'assets/sprites/diamond.png');
        this.game.load.image('vid', 'assets/sprites/vid.png');
        this.game.load.image('vida', 'assets/sprites/vida.png');
        this.game.load.image('scor', 'assets/sprites/score.png');
        this.game.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);

        this.game.load.tilemap('map', 'assets/tilemaps/maps/level4.json', null, Phaser.Tilemap.TILED_JSON);

        //Audio
        this.game.load.audio('bounces', 'assets/audio/ballBounce.mp3')
        this.game.load.audio('shoot', 'assets/audio/blaster.mp3')
        this.game.load.audio('fundo', 'assets/audio/fundo.mp3')
        this.game.load.audio('punch', 'assets/audio/punch.mp3')


    }

    create() {
        this.game.renderer.roundPixels = true
        //game.renderer.clearBeforeRender = false
        this.game.physics.startSystem(Phaser.Physics.ARCADE)

        this.stage.backgroundColor = '#2d2d2d';



        this.player = new Player(this.game, 320, 590, 'player')
        this.game.add.existing(this.player)
        this.player.body.moves = false;
        this.player.body.bounce.setTo(1);

        this.arrow = new Arrow(this.game, this.player.x, this.player.y, 'arrow')
        this.game.add.existing(this.arrow)
        this.arrow.kill()

        // mapa com paredes
        this.createMap()
        this.diamonds = 0


        this.game.input.onDown.add(this.get_pressed_position, this);
        this.game.input.onUp.add(this.slingshot, this);

        //this.fps = new FramesPerSecond(this.game, this.game.width/2, 50)
        //this.game.add.existing(this.fps)

        // adicionar controles de full screen a tela
        super.initFullScreenButtons()

        this.create_consumables()

        this.hops = 0;
        this.next_spawn = 0;
        this.spawn_rate = 2000;
        this.score = 0;

        this.ballBounce = this.game.add.audio('bounces')
        this.shoot = this.game.add.audio('shoot')
        this.punch = this.game.add.audio('punch')
        this.fundo = this.game.add.audio('fundo')
        this.fundo.volume = 0.2
        this.ballBounce.volume = 0.2
        this.shoot.volume = 0.005
        this.punch.volume = 0.35
        this.game.sound.setDecodedCallback([this.ballBounce, this.fundo,this.shoot, this.punch],this.update, this);
        this.fundo.play()

        //this.game.time.advancedTiming = true;

        // Sets camera to follow player
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
    }

    create_consumables(){
        var coin = new Coin(this.game, 320, 672, 'coin')
        var anim = coin.animations.add('spin')
        coin.animations.play('spin', 15, true)
        this.consumables.add(coin)

    }
    
    createMap() {
        let mapTmx = this.game.add.tilemap('map');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);

        // Groups
        this.map = this.game.add.group()
        this.wall_group = this.game.add.group()
        this.damaging_wall_group = this.game.add.group()
        this.consumables = this.game.add.group()
        this.enemies = this.game.add.group()

        // Walls
        mapTmx.createFromObjects('Object Layer 1', 1, 'black_square', 0, true, false, this.sliding_box, Block);
        mapTmx.createFromObjects('Object Layer 1', 2, 'red_square', 1, true, false, this.damaging_wall_group, Block);
        mapTmx.createFromObjects('Object Layer 1', 3, 'blue_square', 2, true, false, this.wall_group, Block);
        mapTmx.createFromObjects('Object Layer 1', 4, 'green_square', 3, true, false, this.goal_group, Block);

        this.createHUD();
        this.vidas = this.game.add.group();
        this.plotLives();

        this.boss = this.game.add.sprite(400, 300, 'boss')
        this.game.physics.arcade.enable(this.boss)
        this.enemies.add(this.boss)
        this.boss.scale.setTo(3)

    }

    
    createHUD() {
        this.LEVEL = 2;
        this.scoreBase = this.game.add.sprite(23, 23, 'scor');
        this.scoreBase.alpha = 0.7
        this.scoreBase.scale.setTo(3.5, 2.9);
        this.scoreBase1 = this.game.add.sprite(650, 20, 'vid');
        this.scoreBase1.scale.setTo(2.4, 2.2);
        this.scoreBase1.alpha = 0.7
        this.scoreBase.fixedToCamera = true;
        this.scoreBase1.fixedToCamera = true;
        this.LEVELBase = this.game.add.sprite(350, 23, 'scor')
        this.LEVELBase.scale.setTo(2.4, 2.4);
        //this.LEVELBase.anchor.setTo(0.5, 0.5)
        this.LEVELBase.fixedToCamera = true;

        this.LEVELText = this.game.add.text(370, 27, 'LEVEL: ' + this.LEVEL, {
            font: "28px Calibri",
            //style: "bold",
            fill: "#ffffff",
            align: "center"
        });
        this.LEVELText.fixedToCamera = true;

        this.scoreText = this.game.add.text(32, 30, 'SCORE: 0', {
            font: "28px Calibri",
            //style: "bold",
            fill: "#ffffff",
            align: "left"
        });
        this.scoreText.fixedToCamera = true;
        this.livesText = this.game.add.text(670, 30, 'VIDAS', {
            font: "28px Calibri",
            fill: "#ffffff",
            align: "left"
        });
        this.livesText.fixedToCamera = true;
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

    plotLives() {
        this.vidas.removeAll()
        for (var i = 0; i < this.game.lives; i++) {
            var v = this.vidas.create(670 + i * 18 * 1.5, 60, 'vida')
            v.fixedToCamera = true;
            v.scale.setTo(1.5)
        }
    }

    update() { 
        this.game.physics.arcade.collide(this.player, this.wall_group, this.stick, null, this);
        this.game.physics.arcade.collide(this.player, this.damaging_wall_group, this.reset_level, null, this);
        this.game.physics.arcade.collide(this.player, this.enemies, this.reset_level, null, this);
        this.game.physics.arcade.overlap(this.player, this.consumables, this.kill_sprite, null, this);

        this.game.physics.arcade.moveToObject(this.boss, this.player, 150);

        if(this.game.time.now >= this.next_spawn){
            this.next_spawn = this.game.time.now + this.spawn_rate
            var diamond = new Coin(this.game, Math.floor(Math.random() * 600), Math.floor(Math.random() * 600), 'diamond')
            this.diamonds += 1

            this.consumables.add(diamond)
        }

        if(this.diamonds >= 20){
            this.next_level()
        }
        

        //console.log('x: ',this.player.x, 'y: ', this.player.y);
        //console.log(this.player.body.moves)
        //console.log('x: ', this.game.input.activePointer.position.x, ' y: ', this.game.input.activePointer.position.y);
    }

    stick() {
        this.player.body.moves = false;
        this.ballBounce.play()
        this.hops += 1;
    }

    reset_level(){
        this.punch.play()
        this.player.x = 320;
        this.player.y = 595;
        this.player.body.moves = false;
        this.hops = 0;
        this.vidas.getFirstExists().destroy();
        if(this.vidas.countLiving() == 0){
            this.fundo.stop()
            this.game.state.start("Gameover");
        }
    }

    next_level(){
        this.fundo.stop()
        this.game.state.start("Credits");
    }

    kill(object){
        object.kill()        
    }

    kill_sprite(player, sprite){
        if(sprite.tag == 'cannon'){
            this.score += 5
        } else if(sprite.tag == 'diamante'){
            this.score += 100

        } else if(sprite.tag == 'coin'){
            this.score += 20
        }
        this.scoreText.text = 'SCORE: ' + this.score
        sprite.kill()
    }

    render() {
        //this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
    }
}

window.onload = function() {
    // funciona como singleton
    const GAME = new Game()
}