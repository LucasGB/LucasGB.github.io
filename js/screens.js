
class PlayState extends GameState {

    preload() {
        this.game.load.image('player', 'assets/sprites/pangball.png');
        this.game.load.image('arrow', 'assets/sprites/longarrow2.png');

        // teste
        this.game.load.tilemap('map', 'mapa2.json', null, Phaser.Tilemap.TILED_JSON);

    }

    create() {
        this.game.renderer.roundPixels = true
        //game.renderer.clearBeforeRender = false
        this.game.physics.startSystem(Phaser.Physics.ARCADE)

        this.stage.backgroundColor = '#2d2d2d';

        this.player = new Player(this.game, this.game.width*1/5, this.game.height/2, 'player')
        this.game.add.existing(this.player)

        this.arrow = new Arrow(this.game, this.player.x, this.player.y, 'arrow')
        this.game.add.existing(this.arrow)
        this.arrow.kill()


        // mapa com paredes
        this.createMap()

        this.game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)

        this.game.input.onDown.add(get_pressed_position, this);
        this.game.input.onUp.add(slingshot, this);

        this.fps = new FramesPerSecond(this.game, this.game.width/2, 50)
        this.game.add.existing(this.fps)

        // adicionar controles de full screen a tela
        super.initFullScreenButtons()
    }
    
    createMap() {
        let mapTmx = this.game.add.tilemap('map');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);

        this.map = this.game.add.group()   
        mapTmx.createFromObjects('Object Layer 1', 1, 'wall', 0, true, false, this.map, Block);
    }

    get_pressed_position(){
        this.arrow.reset(this.player.x, this.player.y)
        this.player.moves = false
        this.arrow.pressed_px = this.game.input.activePointer.position.x;
        this.arrow.pressed_py = this.game.input.activePointer.position.y;
    }

    slingshot(){
        this.arrow.kill();
        this.arrow.released_px = this.game.input.activePointer.position.x;
        this.arrow.released_py = this.game.input.activePointer.position.y;
    
        this.arrow.xVector = (this.arrow.released_px - this.arrow.pressed_px) * -1;
        this.arrow.yVector = (this.arrow.released_py - this.arrow.pressed_py) * -1;
    
        var norm = Math.pow(( Math.pow(this.arrow.xVector, 2) + Math.pow(this.arrow.yVector, 2) ), 1/2);
        var x_velocity = this.arrow.xVector/norm * 300;
        var y_velocity = this.arrow.yVector/norm * 300;
    
        this.player.body.moves = true;
    
        this.player.body.velocity.setTo(x_velocity, y_velocity);
    }




    update() { 
    
    }

    render() {

    }
}

window.onload = function() {
    // funciona como singleton
    const GAME = new Game()
}