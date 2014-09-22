Phaser.Plugin.Adventurer.Trigger = function(game,x,y, key,frame,name){
	Phaser.Sprite.call(this, game, x, y, key, frame);
		
	this.game = game;

	game.physics.arcade.enable(this);	
	
	this.name = name || game.rnd.uuid();
	this.game.adv.triggers = this.game.adv.triggers || {};
	this.game.adv.player.nearTriggers = this.game.adv.player.nearTrigers || {};
	this.action = function(){
		console.log('The Trigger Has Been Pressed!');
	}
}

Phaser.Plugin.Adventurer.Trigger.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.Plugin.Adventurer.Trigger.prototype.constructor = Phaser.Plugin.Adventurer.Trigger;

//The update function. No need to call it it does it by itself!
Phaser.Plugin.Adventurer.Trigger.prototype.update = function(){
	//This is going to be a little different. Need to check for overlapping here.
	this.distToPlayer = game.physics.arcade.distanceBetween(this.game.adv.player, this);
	if(this.distToPlayer < 60){		
		this.game.adv.player.nearTriggers[this.name] = this;
	} else {
		if(this.game.adv.player.nearTriggers[this.name]){
			delete this.game.adv.player.nearTriggers[this.name];
		}
	}
};

Phaser.Plugin.Adventurer.Trigger.prototype.addAction = function(func){
	this.action = func;
};



//Factory stuff
Phaser.GameObjectCreator.prototype.advTrigger = function (x,y, key,frame, name) {

    return new Phaser.Plugin.Adventurer.advTrigger(this.game,x,y, key,frame, name);

};


Phaser.GameObjectFactory.prototype.advTrigger = function (x,y, key,frame, name,group) {

    if (typeof group === 'undefined') {
        group = this.world;
    }

    return group.add(new Phaser.Plugin.Adventurer.Trigger(this.game,x,y, key,frame, name));

};
