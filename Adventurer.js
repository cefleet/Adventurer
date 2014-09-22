Phaser.Plugin.Adventurer = function (game, parent){
	
	Phaser.Plugin.call(this, game, parent);
	this.game.adv = this.game.adv || this;
	
	//The Adventurer Plugin assumes things here
	//this.player = game.add.advPlayer(60,60,'player');
	
}

Phaser.Plugin.Adventurer.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.Adventurer.prototype.constructor = Phaser.Plugin.Adventurer;
