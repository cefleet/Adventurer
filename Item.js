Phaser.Plugin.Adventurer.Item = function(game,x,y, key,frame, name){
	Phaser.Sprite.call(this, game, x, y, key, frame);
		
	this.game = game;

	game.physics.arcade.enable(this);	
	
	this.game.adv.player.nearItems = this.game.adv.player.nearItems || {};

	this.name = name || game.rnd.uuid();
	this.game.adv.items = this.game.adv.items || {};

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


Phaser.GameObjectFactory.prototype.advItem = function (x, y, key, frame, group) {

    if (typeof group === 'undefined') {
        group = this.world;
    }

    return group.add(new Phaser.Plugin.Adventurer.Item(this.game, x, y, key, frame,name));

};
