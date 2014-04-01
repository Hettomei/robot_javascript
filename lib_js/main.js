window.onload = function(){
  var shooter = new Shooter(document.getElementById('mon_canvas'));
  shooter.init();

  var doKeyDown = function(e){
    console.log(e.keyCode);

    //Vim mapping :)
    if(e.keyCode == 72 || e.keyCode == 37){ // H ou <-
      shooter.ship.turn_left();
    }else if(e.keyCode == 76 || e.keyCode == 39){ // L ou ->
      shooter.ship.turn_right();
    }else if(e.keyCode == 74 || e.keyCode == 40){ // j ou \/
      shooter.ship.go_back();
    }else if(e.keyCode == 75 || e.keyCode == 38){ // k ou /\
      shooter.ship.go_forward();
    }
  };

  document.addEventListener(
    "keydown", doKeyDown
  );

  var last_time = new Date().getTime();
  var time = new Date().getTime();

  var delta = 0;
  var last_draw = 0;

  var animFrame = window.requestAnimationFrame;
  var mainloop = function() {
    time = new Date().getTime();
    delta = time - last_time;

    shooter.update(delta);
    last_time = time;

    last_draw += delta;

    if(last_draw > 10){
      last_draw = 0;
      shooter.draw();
    }

    animFrame( mainloop );
  };

  mainloop();

};

