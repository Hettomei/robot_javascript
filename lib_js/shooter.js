window.onload = function(){
  var shooter = new Shooter(document.getElementById('mon_canvas'));

  var animFrame = window.requestAnimationFrame;

  var last_time = new Date().getTime();
  var time = new Date().getTime();

  var delta = 0;
  var last_draw = 0;

  var mainloop = function() {
    time = new Date().getTime();
    delta = time - last_time;

    shooter.update(delta);
    last_time = time;

    last_draw += delta;

    if(last_draw > 10){
      shooter.canvas.width  = window.innerWidth - 10;
      shooter.canvas.height = window.innerHeight - 10;
      last_draw = 0;
      shooter.draw();
    }

    animFrame( mainloop );
  };

  mainloop();

  window.onresize = function(){
    shooter.resize();
  }
};

function Shooter(canvas){
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.ship = new Ship(100, 100, this.context);
  this.ships = [];

  document.addEventListener(
    "keydown", this.doKeyDown
  );

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

Shooter.prototype.draw = function(){
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

