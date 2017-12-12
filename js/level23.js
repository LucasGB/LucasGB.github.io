
class Level23 extends GameState {

    preload() {
        

    }

    create() {
        var textIntrosBase = this.game.add.text(100, this.game.world.centerY - 70, 'Parabens por passar do Level 2', {
                font: "50px Calibri",
                //style: "bold",
                fill: "#ffffff",
                align: "center"
            });

        this.game.time.events.add(Phaser.Timer.SECOND*2, function() {
            textIntrosBase.text = 'Você esta indo para o Level 3'
            this.game.time.events.add(Phaser.Timer.SECOND*2, function() {
                this.game.state.start("Level3")
            }, this);
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