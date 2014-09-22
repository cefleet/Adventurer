Phaser.Plugin.Adventurer.DialogueBox = function(game,x,y,key,frame,name,fontObj){
		
	this.game = game;
	this.name = name || game.rnd.uuid();	
	this.x = x || 10;
	this.y = y || 10;
	this.key = key;
	this.frame = frame;
	this.textText = '';
	this.game.adv.dialogueBox = this;	
	this.fixedToCamera = true;
}

Phaser.Plugin.Adventurer.DialogueBox.prototype.constructor = Phaser.Plugin.Adventurer.DialogueBox;

Phaser.Plugin.Adventurer.DialogueBox.prototype.addSprite = function(){
	this.sprite = game.add.sprite(this.x,this.y,this.key,this.frame);
	this.sprite.fixedToCamera = true;
}

Phaser.Plugin.Adventurer.DialogueBox.prototype.addText = function(text){
	 text = text || this.textText;
	this.text = game.add.text(this.x+34, this.y+34, text, {
        font: "40px Arial",
        fill: "#060606"
    });
    this.textText = text;
    this.text.fixedToCamera = true;
  
};


Phaser.Plugin.Adventurer.DialogueBox.prototype.updateText = function(text){
	this.text.setText(text);
};

Phaser.Plugin.Adventurer.DialogueBox.prototype.hide = function(){
	if(this.sprite){
		this.sprite.destroy();
	}
	if(this.text){
		this.text.setText('');
	}
	this.hidden = true;

}

Phaser.Plugin.Adventurer.DialogueBox.prototype.show = function(text){
	if(!this.hidden){
		this.hide();
	}
	this.hidden = false;
	text = text || this.text;
	this.addSprite();
	this.addText(text);
}

//Factory stuff
Phaser.GameObjectCreator.prototype.advDBox = function (x,y, key,frame, name,text) {

	return new Phaser.Plugin.Adventurer.advDBox(this.game,x,y, key,frame, name,text);

};


Phaser.GameObjectFactory.prototype.advDBox = function (x,y, key,frame, name,text) {

    return new Phaser.Plugin.Adventurer.DialogueBox(this.game,x,y, key,frame, name,text);

};
