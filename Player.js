Phaser.Plugin.Adventurer.Player = function(game,x,y, key,frame, speed, controls){

	Phaser.Sprite.call(this, game, x, y, key, frame);
	
	this.controls = controls || new Phaser.Plugin.Adventurer.Control(this);
	
	game.camera.follow(this);
	game.physics.arcade.enable(this);
	
	this.speed = speed || 500;
	
}

Phaser.Plugin.Adventurer.Player.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.Plugin.Adventurer.Player.prototype.constructor = Phaser.Plugin.Adventurer.Player;

//The update function. No need to call it it does it by itself!
Phaser.Plugin.Adventurer.Player.prototype.update = function(){
	//console.log('Bleh');
	this.controls.move();
	
	for(var layer in this.game.adv.tilemap.advLayers){
		var l =  this.game.adv.tilemap.advLayers[layer];
		if(l.advCollision){
			game.physics.arcade.collide(this, l);
		}
	}
};


//Factory stuff
Phaser.GameObjectCreator.prototype.advPlayer = function (x, y, key, frame) {

    return new Phaser.Plugin.Adventurer.advPlayer(this.game, x, y, key, frame);

};


Phaser.GameObjectFactory.prototype.advPlayer = function (x, y, key, frame, group) {

    if (typeof group === 'undefined') {
        group = this.world;
    }

    return group.add(new Phaser.Plugin.Adventurer.Player(this.game, x, y, key, frame));

};
