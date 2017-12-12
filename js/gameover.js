class Gameover extends GameState {

  preload(){
    this.optionCount = 1;
    this.game.load.image('gameover', 'assets/sprites/gameover.png');
  }

  addMenuOption(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = this.game.add.text(400, (this.optionCount * 80) + 300, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;

  }

  create() {
    var sprite = this.game.add.sprite(0, 0, 'gameover');
    sprite.scale.setTo(0.6, 0.74);
    var titleStyle = { font: 'bold 60pt TheMinion', fill: '#FDFFB5', align: 'center'};
    var text = this.game.add.text(400, 300, "Game Over", titleStyle);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    text.anchor.set(0.5);
    this.addMenuOption('Play Again', function (e) {
      this.game.state.start("Level1");
    });
    this.world.resize(800, 600);
    this.addMenuOption('Main Menu', function (e) {
      this.game.state.start("MainMenu");
    })
  
};

}