Phaser.Plugin.Adventurer.Control = function(sprite,buttons){
	//Ned to erro out without a sprite
	this.sprite = sprite || null;
	this.buttons = buttons || {
		//DO something here
		up : 'up',
		down: 'down',
		left : 'left',
		right:'right'
	}
	
	//This is not for tablets or phones yet
	this.cursor = game.input.keyboard.createCursorKeys();
}

Phaser.Plugin.Adventurer.Control.prototype.constructor = Phaser.Plugin.Adventurer.Control;

Phaser.Plugin.Adventurer.Control.prototype = {
	
	move : function(){

    var v = this.sprite.speed;
	this.sprite.body.velocity.set(0);
	
    //Check for Angle
    if(this.sprite.tileAngle){
		/* 
		 * 1= 45
		 * 2 = 135
		 */
		// console.log(this.sprite.onTile);
		this.sprite.lines  = null;
		//make the feelerLines
		var fl = {
			l : new Phaser.Line(this.sprite.x,this.sprite.y,this.sprite.x-150,this.sprite.y),
			r : new Phaser.Line(this.sprite.x,this.sprite.y,this.sprite.x+150,this.sprite.y),
			t: new Phaser.Line(this.sprite.x,this.sprite.y,this.sprite.x,this.sprite.y-150),
			b : new Phaser.Line(this.sprite.x,this.sprite.y,this.sprite.x,this.sprite.y+150)
		}
		var al = this.sprite.onTile.angleLine;
	}
	
  //LEFT
    if (this.cursor[this.buttons.left].isDown)  {
		this.sprite.body.velocity.x = -1*v;
		
		if(this.sprite.onTile){
			if(al.intersects(fl.l) !== null) {
				
					if(this.sprite.tileAngle == 1){
						this.sprite.body.velocity.x = (-1*v)/1.5;
						this.sprite.body.velocity.y = (1*v)/1.5;
					}
					if(this.sprite.tileAngle == 2){
						this.sprite.body.velocity.x = (-1*v)/1.5;
						this.sprite.body.velocity.y = (-1*v)/1.5;
					}
			}
		}
    } 
    
    //RIGHT
    if (this.cursor[this.buttons.right].isDown) {
		this.sprite.body.velocity.x = v;
		
		if(this.sprite.onTile){
			if(al.intersects(fl.r) !== null) {

				if(this.sprite.tileAngle == 1){	
					this.sprite.body.velocity.x = (1*v)/1.5;
					this.sprite.body.velocity.y = (-1*v)/1.5;
				}
				if(this.sprite.tileAngle == 2){	
					this.sprite.body.velocity.x = (1*v)/1.5;
					this.sprite.body.velocity.y = (1*v)/1.5;
				}
			}		
		}
    } 
    
    //UP
    if (this.cursor[this.buttons.up].isDown) {		
		this.sprite.body.velocity.y = -1*v;
		if(this.sprite.onTile){
			if(al.intersects(fl.t) !== null) {
				if(this.sprite.tileAngle == 1 ) {
					this.sprite.body.velocity.y = (-1*v)/1.5;
					this.sprite.body.velocity.x = (1*v)/1.5;
				}
				
				if(this.sprite.tileAngle == 2 ) {
					this.sprite.body.velocity.y = (-1*v)/1.5;
					this.sprite.body.velocity.x = (-1*v)/1.5;
				}
			}
		}
    } 
    
    //DOWN
    if (this.cursor[this.buttons.down].isDown) {		
		this.sprite.body.velocity.y = v;
		
		if(this.sprite.onTile){
			if(al.intersects(fl.b) !== null) {
				if(this.sprite.tileAngle == 1) {
					this.sprite.body.velocity.y = (1*v)/1.5;
					this.sprite.body.velocity.x = (-1*v)/1.5;
				}
				
				if(this.sprite.tileAngle == 2) {
					this.sprite.body.velocity.y = (1*v)/1.5;
					this.sprite.body.velocity.x = (1*v)/1.5;
				}
			}
		}
    } 
    //
    
	//  this.sprite.going = false;
	//TODO Don't know why but this is set here
	this.sprite.tileAngle = null;
	this.sprite.onTile = null;

	}
}
