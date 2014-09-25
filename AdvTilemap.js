Phaser.Plugin.Adventurer.AdvTilemap = function(game,key, options){
	
	Phaser.Tilemap.call(this,game,key);
	this.advLayers = {};	
	
}

Phaser.Plugin.Adventurer.AdvTilemap.prototype = Object.create(Phaser.Tilemap.prototype);
Phaser.Plugin.Adventurer.AdvTilemap.prototype.constructor = Phaser.Plugin.Adventurer.AdvTilemap;

//Function on being added it is initilized
Phaser.Plugin.Adventurer.AdvTilemap.prototype._init = function(options){
	
	//adds tilset and images
	this.addTilesetImage(options.tilesetName, options.image);
	
	//creates the layers
	for(var i =0; i < options.layers.length; i++){
		
		var l = options.layers[i];
		if(l.altTileset){
			this.addTilesetImage(l.altTileset, l.altImg);	
		}
		this.advLayers[l.name] = this.createLayer(l.name);

		//adds standard collision
		if(l.collisions){
			this.setCollision(l.collisions,true,this.advLayers[l.name]);
			this.advLayers[l.name].advCollision = true;
		};
		
		if(l.angledCollisions){
			this.setAngleCollision(l.angledCollisions, this.advLayers[l.name]);
			this.angledTileMap = l.angledCollisions;
			this.currentLayer = this.getLayerIndex(l.name);	
			
			this.forEach(this.makeAngleLine, this);
			
		}
	}	
	
	if(options.setWorld){
		//This just sets the size of the last layer. that may come back to mite me
			this.advLayers[l.name].resizeWorld();
	}
	
	
	
	this.game.adv.tilemap = this;

};

//Function
Phaser.Plugin.Adventurer.AdvTilemap.prototype.setAngleCollision = function(collisionMap, layer){
	
	console.log(collisionMap);
	
	
	var cmArr = [];
	
	/*for(var i = 0; i < collisionMap.length; i++){
		cmArr.push(Object.keys(collisionMap[i])[0]);
	}
	*/
	for(m in collisionMap){
		cmArr.push(m);
	}
	
	this.setTileIndexCallback(cmArr, function(p,t){
			//p is player or sprite
			//t is tile
			//This is a little confusing but this tells the player what type of angle tile they are on. Controls take it from here on how to handle the angle
			p.tileAngle = this.angledTileMap[t.index]; 
			p.onTile = t;
	}, this, layer);
};

Phaser.Plugin.Adventurer.AdvTilemap.prototype.makeAngleLine = function(tile){
	
	//console.log(this.angledTileMap);
	if(this.angledTileMap[tile.index]){
		var xyxy = [];
		if(this.angledTileMap[tile.index] == 1){
			//xyxy.push(tile.worldX+tile.width);
			//xyxy.push(tile.worldY);
			//xyxy.push(tile.worldX);
		//	xyxy.push(tile.worldY+height);
			xyxy = [
				tile.worldX+tile.width+180,
				tile.worldY-180,
				tile.worldX-180,
				tile.worldY+tile.height+180
			]
		}
		if(this.angledTileMap[tile.index] == 2){
			//xyxy.push(tile.worldX+tile.width);
			//xyxy.push(tile.worldY);
			//xyxy.push(tile.worldX);
		//	xyxy.push(tile.worldY+height);
			xyxy = [
				tile.worldX-180,
				tile.worldY-180,
				(tile.worldX+tile.width+180),
				(tile.worldY+tile.height+180)
			]
		}
		tile.angleLine = new Phaser.Line(xyxy[0],xyxy[1],xyxy[2],xyxy[3]);
	}
};

Phaser.GameObjectFactory.prototype.advTilemap = function (key,options) {
	
	var gh = new Phaser.Plugin.Adventurer.AdvTilemap(this.game, key, options);
	gh._init(options);	
	return gh;
};

Phaser.Plugin.Adventurer.AdvTilemap.ANGLEMAP = {
	FORTYFIVE : '1',
	ONETHIRTYFIVE : '2'	
}
