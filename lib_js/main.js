window.onload = function(){
  var shooter = new Shooter(document.getElementById('mon_canvas'));

  document.addEventListener(
    "keydown", shooter.doKeyDown
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

  window.onresize = function(){
    shooter.resize();
  }
};

