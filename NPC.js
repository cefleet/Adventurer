Phaser.Plugin.Adventurer.NPC = function(game,x,y, key,frame, name, speed, patrol){
	Phaser.Sprite.call(this, game, x, y, key, frame);
		
	this.game = game;

	game.physics.arcade.enable(this);	
	
	this.name = name || game.rnd.uuid();
	this.game.adv.npcs = this.game.adv.npcs || {};
	this.patrol = patrol || null;
	this.patrolIndex = 0;
	if(this.patrol){
		this.gotoPoint = this.patrol[this.patrolIndex];
	}
	this.patrolling = false;
	this.game.adv.player.nearNPCs = this.game.adv.player.nearNPCs || {};
	this.game.adv.player.isSeen = this.game.adv.player.isSeen || {};
	this.interact = function(){
		console.log('interacting');
	}
	this.speed = speed || 150;
	this.anchor.setTo(0.5,0.5);
	this.vision = game.add.sprite(x,y,'vision');
	this.vision.anchor.setTo(0, 0.5);
	this.whenSeePlayer = function(){};
}

Phaser.Plugin.Adventurer.NPC.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.Plugin.Adventurer.NPC.prototype.constructor = Phaser.Plugin.Adventurer.NPC;

//The update function. No need to call it it does it by itself!
Phaser.Plugin.Adventurer.NPC.prototype.update = function(){
	
	if(this.patrolling && game.physics.arcade.distanceToXY(this, this.gotoPoint[0], this.gotoPoint[1]) < 30){
		if(this.patrolIndex < this.patrol.length-1){
			this.patrolIndex += 1;
		} else {
			this.patrolIndex = 0;
		}
		this.gotoPoint = this.patrol[this.patrolIndex];
		game.physics.arcade.moveToXY(this, this.gotoPoint[0],this.gotoPoint[1],this.speed);
	}
	
	this.distToPlayer = game.physics.arcade.distanceBetween(this.game.adv.player, this);
	if(this.distToPlayer < 60){		
		this.game.adv.player.nearNPCs[this.name] = this;
	} else {
		if(this.game.adv.player.nearNPCs[this.name]){
			delete this.game.adv.player.nearNPCs[this.name];
		}
	}
	if(this.patrolling){
		this.rotation = game.physics.arcade.angleToXY(this, this.gotoPoint[0],this.gotoPoint[1]);
		this.vision.rotation = this.rotation;
		this.vision.x = this.x;
		this.vision.y = this.y;
	}
	if(this.vision.overlap(this.game.adv.player)){
		this.game.adv.player.isSeen[this.name] = this;
		this.whenSeePlayer();
	} else {
		if(this.game.adv.player.isSeen[this.name]){
			delete  this.game.adv.player.isSeen[this.name];
		}
	}
};

Phaser.Plugin.Adventurer.NPC.prototype.startPatrol = function(){
	this.patrolling = true;
	game.physics.arcade.moveToXY(this, this.gotoPoint[0],this.gotoPoint[1],this.speed);
};

Phaser.Plugin.Adventurer.NPC.prototype.stopPatrol = function(){
	this.patrolling = false;
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
};

Phaser.Plugin.Adventurer.NPC.prototype.addInteraction = function(func){
	this.interact = func;
};

Phaser.Plugin.Adventurer.NPC.prototype.addWhenSeePlayerAction = function(func){
	this.whenSeePlayer = func;
};

//Factory stuff
Phaser.GameObjectCreator.prototype.advNPC = function (x,y, key,frame, name, speed, patrol) {

    return new Phaser.Plugin.Adventurer.advNPC(this.game,x,y, key,frame, name, speed, patrol);

};


Phaser.GameObjectFactory.prototype.advNPC = function (x,y, key,frame, name, speed, patrol, group) {

    if (typeof group === 'undefined') {
        group = this.world;
    }

    return group.add(new Phaser.Plugin.Adventurer.NPC(this.game,x,y, key,frame, name, speed, patrol));

};
