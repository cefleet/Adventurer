Phaser.Plugin.Adventurer.Item = function(game,x,y, key,frame, name){
	Phaser.Sprite.call(this, game, x, y, key, frame);
		
	this.game = game;

	game.physics.arcade.enable(this);	
	
	this.game.adv.player.nearItems = this.game.adv.player.nearItems || {};
	
	this.anchor.setTo(0.5,0.5);

	this.name = name || game.rnd.uuid();
	this.game.adv.items = this.game.adv.items || {};
	//TODO make this x,y please
	this.held = {
		left : {
			rotation : 0,
			position : [-16,-4]
		},		
		right : {
			rotation : 180,
			position : [24,-4],
			
		},
		up : {
			position : [0,0],
			rotation : 90
		},
		down : {
			position : [0,16],
			rotation : 270
		}
	}

}

Phaser.Plugin.Adventurer.Item.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.Plugin.Adventurer.Item.prototype.constructor = Phaser.Plugin.Adventurer.Item;

//The update function. No need to call it it does it by itself!
Phaser.Plugin.Adventurer.Item.prototype.update = function(){
	
	//check distance to player
	this.distToPlayer = game.physics.arcade.distanceBetween(this.game.adv.player, this);
	
	if(this.distToPlayer < 60){
		
		this.game.adv.player.nearItems[this.name] = this;
	} else {
		if(this.game.adv.player.nearItems[this.name]){
			delete this.game.adv.player.nearItems[this.name];
		}
	}
};


//Factory stuff
Phaser.GameObjectCreator.prototype.advItem = function (x, y, key, frame,name) {

    return new Phaser.Plugin.Adventurer.advItem(this.game, x, y, key, frame,name);

};


Phaser.GameObjectFactory.prototype.advItem = function (x, y, key, frame, name,group) {

    if (typeof group === 'undefined') {
        group = this.world;
    }

    return group.add(new Phaser.Plugin.Adventurer.Item(this.game, x, y, key, frame,name));

};
