class MainMenu extends GameState {

	preload(){
		this.game.load.script('WebFont', 'vendor/webfontloader.js');
		this.game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
    	this.game.load.image('options-bg', 'assets/images/options-bg.jpg');
    	this.game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
	}

	create(){
		this.stage.backgroundColor = '#2d2d2d';
		this.titleText = this.game.make.text(400, 100, "Oaoj Sacul", {
	      font: 'bold 60pt TheMinion',
	      fill: '#FDFFB5',
	      align: 'center'
	    });
	    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
	    this.titleText.anchor.set(0.5);
	    this.optionCount = 1;

	    this.game.stage.disableVisibilityChange = true;
    	this.game.add.sprite(0, 0, 'menu-bg');
    	this.game.add.existing(this.titleText);
	
    	this.addMenuOption('Start', function () {
      		this.game.state.start("Level1");
    	});
    	this.addMenuOption('Options', function () {
      		this.game.state.start("Options");
    	});
    	this.addMenuOption('Credits', function () {
      		this.game.state.start("Credits");
    	});
	}

	addMenuOption(text, callback){
	    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
	    var txt = this.game.add.text(400, (this.optionCount * 80) + 200, text, optionStyle);
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



}

window.onload = function() {
    GAME = new Game()
}