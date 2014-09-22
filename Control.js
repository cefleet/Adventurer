Phaser.Plugin.Adventurer.Control = function(game,player,buttons){
	
	this.game = game;
	//Ned to erro out without a sprite
	this.player = player || this.game.adv.player;
	this.buttons = buttons || {
		//DO something here
		up : 'up',
		down: 'down',
		left : 'left',
		right:'right',
		action : Phaser.Keyboard.SPACEBAR
	}
	
	//This is not for tablets or phones yet
	this.cursor = game.input.keyboard.createCursorKeys();
	this.actionKey = game.input.keyboard.addKey(this.buttons.action);
	this.actionKey.onDown.add(this.action, this);
}

Phaser.Plugin.Adventurer.Control.prototype.constructor = Phaser.Plugin.Adventurer.Control;

Phaser.Plugin.Adventurer.Control.prototype = {
	
	action : function(){		
		this.player.action();	
	},
	
	move : function(){
		
    var v = this.player.speed;
	this.player.body.velocity.set(0);
	
    //Check for Angle
    if(this.player.tileAngle){
		
		/* 
		 * 1= 45
		 * 2 = 135
		 */
		 
		this.player.lines  = null;
		//make the feelerLines
		var fl = {
			l : new Phaser.Line(this.player.x,this.player.y,this.player.x-150,this.player.y),
			r : new Phaser.Line(this.player.x,this.player.y,this.player.x+150,this.player.y),
			t: new Phaser.Line(this.player.x,this.player.y,this.player.x,this.player.y-150),
			b : new Phaser.Line(this.player.x,this.player.y,this.player.x,this.player.y+150)
		}
		var al = this.player.onTile.angleLine;
	}
	
  //LEFT
    if (this.cursor[this.buttons.left].isDown)  {
		this.player.body.velocity.x = -1*v;
		
		if(this.player.onTile){
			if(al.intersects(fl.l) !== null) {
				
					if(this.player.tileAngle == 1){
						this.player.body.velocity.x = (-1*v)/1.5;
						this.player.body.velocity.y = (1*v)/1.5;
					}
					if(this.player.tileAngle == 2){
						this.player.body.velocity.x = (-1*v)/1.5;
						this.player.body.velocity.y = (-1*v)/1.5;
					}
			}
		}
    } 
    
    //RIGHT
    if (this.cursor[this.buttons.right].isDown) {
		this.player.body.velocity.x = v;
		
		if(this.player.onTile){
			if(al.intersects(fl.r) !== null) {

				if(this.player.tileAngle == 1){	
					this.player.body.velocity.x = (1*v)/1.5;
					this.player.body.velocity.y = (-1*v)/1.5;
				}
				if(this.player.tileAngle == 2){	
					this.player.body.velocity.x = (1*v)/1.5;
					this.player.body.velocity.y = (1*v)/1.5;
				}
			}		
		}
    } 
    
    //UP
    if (this.cursor[this.buttons.up].isDown) {		
		this.player.body.velocity.y = -1*v;
		if(this.player.onTile){
			if(al.intersects(fl.t) !== null) {
				if(this.player.tileAngle == 1 ) {
					this.player.body.velocity.y = (-1*v)/1.5;
					this.player.body.velocity.x = (1*v)/1.5;
				}
				
				if(this.player.tileAngle == 2 ) {
					this.player.body.velocity.y = (-1*v)/1.5;
					this.player.body.velocity.x = (-1*v)/1.5;
				}
			}
		}
    } 
    
    //DOWN
    if (this.cursor[this.buttons.down].isDown) {		
		this.player.body.velocity.y = v;
		
		if(this.player.onTile){
			if(al.intersects(fl.b) !== null) {
				if(this.player.tileAngle == 1) {
					this.player.body.velocity.y = (1*v)/1.5;
					this.player.body.velocity.x = (-1*v)/1.5;
				}
				
				if(this.player.tileAngle == 2) {
					this.player.body.velocity.y = (1*v)/1.5;
					this.player.body.velocity.x = (1*v)/1.5;
				}
			}
		}
    } 
    
	//TODO Don't know why but this is set here
	this.player.tileAngle = null;
	this.player.onTile = null;

	}
}
