class Options extends GameState {

  preload() {
    this.titleText = this.game.make.text(400, 100, "Game Title", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  }
  
  create() {
    var playSound = gameOptions.playSound,
        playMusic = gameOptions.playMusic;

    this.game.add.sprite(0, 0, 'options-bg');
    this.game.add.existing(this.titleText);
    this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
      playMusic = !playMusic;
      target.text = playMusic ? 'Mute Music' : 'Play Music';
      musicPlayer.volume = playMusic ? 1 : 0;
    });
    this.addMenuOption(playSound ? 'Mute Sound' : 'Play Sound', function (target) {
      playSound = !playSound;
      target.text = playSound ? 'Mute Sound' : 'Play Sound';
    });
    this.addMenuOption('<- Back', function () {
      this.game.state.start("GameMenu");
    });
  }

}