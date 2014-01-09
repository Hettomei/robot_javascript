window.Shooter = window.Shooter || {};

window.onload = function(){
  Shooter.init();

  var animFrame = window.requestAnimationFrame;

  var last_time = new Date().getTime();
  var time = new Date().getTime();

  var delta = 0;
  var last_draw = 0;

  var mainloop = function() {
    time = new Date().getTime();
    delta = time - last_time;

    Shooter.update(delta);
    last_time = time;

    last_draw += delta;

    if(last_draw > 10){
      Shooter.canvas.width  = window.innerWidth - 10;
      Shooter.canvas.height = window.innerHeight - 10;
      last_draw = 0;
      Shooter.draw();
    }

    animFrame( mainloop );
  };

  mainloop();
};

window.onresize = function(){
  Shooter.resize();
}

Shooter.init = function(){
  Shooter.canvas = document.getElementById('mon_canvas');
  Shooter.context = Shooter.canvas.getContext('2d');
  Shooter.ship = new Ship(100, 100, Shooter.context);
  Shooter.ships = [];

  Shooter.rand_width = function(){
    return Math.floor(Math.random()*Shooter.canvas.width);
  };

  Shooter.rand_height = function(){
    return Math.floor(Math.random()*Shooter.canvas.height);
  };

  Shooter.update = function(delta){
    Shooter.ship.update(delta);
    Shooter.ships.forEach(function(entry) {
      entry.update_direction(delta);
    });
  };

  Shooter.draw = function(){
    Shooter.ship.draw();
    Shooter.ships.forEach(function(entry) {
      entry.draw();
    });
  };

  Shooter.resize = function(){
    Shooter.canvas.width  = window.innerWidth - 10;
    Shooter.canvas.height = window.innerHeight - 10;
    if(Shooter.canvas.width < 200)
      Shooter.canvas.width = 200
    if(Shooter.canvas.height < 200)
      Shooter.canvas.height = 200
  };

  Shooter.doKeyDown = function(e){
    console.log(e.keyCode);
    //Vim mapping :)
    if(e.keyCode == 72){ // H
      Shooter.ship.turn_left();
    }else if(e.keyCode == 76){ // L
      Shooter.ship.turn_right();
    }else if(e.keyCode == 74){ // j
      Shooter.ship.go_back();
    }else if(e.keyCode == 75){ // k
      Shooter.ship.go_forward();
    }else if(e.keyCode == 32){ // k
      Shooter.ship.go_forward();
    }
  };

  document.addEventListener(
    "keydown", Shooter.doKeyDown
  );

  Shooter.resize();

  for(var i = 0; i < 20; i++){
    Shooter.ships.push(new Ship(Shooter.rand_width(), Shooter.rand_height(), Shooter.context));
  }

};
