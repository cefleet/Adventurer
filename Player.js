Phaser.Plugin.Adventurer.Player = function(game,x,y, key,frame, speed, controls){

	Phaser.Sprite.call(this, game, x, y, key, frame);
	
	this.controls = controls || new Phaser.Plugin.Adventurer.Control(game,this);
	
	this.game = game;
	
	game.camera.follow(this);
	game.physics.arcade.enable(this);
	
	this.speed = speed || 100;
	this.name = name || 'player';
	this.anchor.setTo(0.5,0.5);
	
}

Phaser.Plugin.Adventurer.Player.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.Plugin.Adventurer.Player.prototype.constructor = Phaser.Plugin.Adventurer.Player;

//The update function. No need to call it it does it by itself!
Phaser.Plugin.Adventurer.Player.prototype.update = function(){
	this.controls.move();
	
	if(this.item){
		this.item.x = this.x;
		this.item.y = this.y-10;
	}
	
	for(var layer in this.game.adv.tilemap.advLayers){
		var l =  this.game.adv.tilemap.advLayers[layer];
		if(l.advCollision){
			game.physics.arcade.collide(this, l);
		}
	}
	if(this._cache[0] != this.x || this._cache[1] != this.y){
		if(this.game.adv.dialogueBox){
			//kill dialog on move for now
			if(!this.game.adv.dialogueBox.hidden){
				this.game.adv.dialogueBox.hide();
			}
		}
	}
};

Phaser.Plugin.Adventurer.Player.prototype.action = function(){
	
	if(this.item){
		this.throwItem();
	} else if (this.nearItems && Object.keys(this.nearItems).length !== 0) { 
		var closest;
		for(var it in this.nearItems){
			if(!closest || this.nearItems[it].distToPlayer < closest.distToPlayer){
				closest = this.nearItems[it];
			}
		}
		this.pickupItem(closest);
		
	} else if (this.nearTriggers && Object.keys(this.nearTriggers).length !== 0){
		var closestT;
		for(var it in this.nearTriggers){
			if(!closestT || this.nearTriggers[it].distToPlayer < closestT.distToPlayer){
				closestT = this.nearTriggers[it];
			}
		}
		//interact
		this.activateTrigger(closestT);
		
	}  else if (Object.keys(this.nearNPCs).length !== 0){
		var closestN;
		for(var it in this.nearNPCs){
			if(!closestN || this.nearNPCs[it].distToPlayer < closestN.distToPlayer){
				closestN = this.nearNPCs[it];
			}
		}
		//interact
		this.interactNPC(closestN);	
	}	
}

//item needs to be in hand
Phaser.Plugin.Adventurer.Player.prototype.throwItem = function(){
	var t = game.add.tween(this.item);
	var b = game.add.tween(this.item);
	var b1 = game.add.tween(this.item);	
//Make this directional
	b.to({y:this.item.y-50}, 300, Phaser.Easing.Cubic.Out);
	b1.to({y:this.item.y}, 500, Phaser.Easing.Bounce.Out);
	t.to({x : this.item.x-300}, 1000, Phaser.Easing.Cubic.Out);
	
	this.item = null;
	b.chain(b1);
	b.start();
	t.start();
}

Phaser.Plugin.Adventurer.Player.prototype.pickupItem = function(item){
	if(!this.item){
		this.item = item;
		item.x = this.x;
		item.y = this.y-10;
	}
}

Phaser.Plugin.Adventurer.Player.prototype.activateTrigger = function(trigger){
	trigger.action();
}

Phaser.Plugin.Adventurer.Player.prototype.interactNPC= function(npc){
	npc.interact();
}

//Factory stuff
Phaser.GameObjectCreator.prototype.advPlayer = function (x, y, key, frame) {

    return new Phaser.Plugin.Adventurer.advPlayer(this.game, x, y, key, frame);

};


Phaser.GameObjectFactory.prototype.advPlayer = function (x, y, key, frame, group) {

    if (!group) {
        group = this.world;
    }
    return group.add(new Phaser.Plugin.Adventurer.Player(this.game, x, y, key, frame));

};
