class Credits extends GameState {

  preload() {
    this.game.load.video('creditos', 'assets/video/creditos.mp4');

    }

    create() {
    var video = this.game.add.video('creditos');
   
    video.play(true);

    //  x, y, anchor x, anchor y, scale x, scale y
    video.addToWorld(0,0, 0, 0, 0.7, 0.9);
       this.game.time.events.add(Phaser.Timer.SECOND*7.3, function() {
                video.play(false)
                video.destroy()
                this.game.state.start("MainMenu")
            }, this);
    }

    update() { 





        //console.log('x: ',this.player.x, 'y: ', this.player.y);
        //console.log(this.player.body.moves)
        //console.log('x: ', this.game.input.activePointer.position.x, ' y: ', this.game.input.activePointer.position.y);
    }

}
window.onload = function() {
    // funciona como singleton
    const GAME = new Game()
}