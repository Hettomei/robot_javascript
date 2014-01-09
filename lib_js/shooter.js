function Shooter(canvas){
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.ship = new Ship(100, 100, this.context);
  this.ships = [];

  this.resize();

  for(var i = 0; i < 20; i++){
    this.ships.push(
      new Ship(
        this.rand_width(),
        this.rand_height(),
        this.context
    )
    );
  }
}

Shooter.prototype.rand_width = function(){
  return Math.floor(Math.random()*this.canvas.width);
};

Shooter.prototype.rand_height = function(){
  return Math.floor(Math.random()*this.canvas.height);
};

Shooter.prototype.update = function(delta){
  this.ship.update(delta);
  this.ships.forEach(function(entry) {
    entry.update_direction(delta);
  });
};

Shooter.prototype.clean_background = function(){
  this.canvas.width  = window.innerWidth - 10;
  this.canvas.height = window.innerHeight - 10;
}

Shooter.prototype.draw = function(){
  this.clean_background();
  this.ship.draw();
  this.ships.forEach(function(entry) {
    entry.draw();
  });
};

Shooter.prototype.resize = function(){
  this.canvas.width  = window.innerWidth - 10;
  this.canvas.height = window.innerHeight - 10;
  if(this.canvas.width < 200)
    this.canvas.width = 200
  if(this.canvas.height < 200)
    this.canvas.height = 200
};

Shooter.prototype.doKeyDown = function(e){
  console.log(e.keyCode);
  console.log(this);
  window.aaa = this;
  //Vim mapping :)
  if(e.keyCode == 72){ // H
    this.ship.turn_left();
  }else if(e.keyCode == 76){ // L
    this.ship.turn_right();
  }else if(e.keyCode == 74){ // j
    this.ship.go_back();
  }else if(e.keyCode == 75){ // k
    this.ship.go_forward();
  }else if(e.keyCode == 32){ // k
    this.ship.go_forward();
  }
};
