$("#canvas2").on("touchstart touchmove touchend touchcancel touchleave",function(e)
	{
        e.preventDefault();
		if(e.type=="touchstart")
        {
            handleStart(e);
        }
        else if(e.type=="touchmove")
        {
            handleMove(e);
        }
        else if(e.type=="touchend")
        {
            handleEnd(e);
        }
        else if(e.type=="touchcancel")
        {
            handleCancel(e);
        }
        else if(e.type=="touchleave")
        {
            handleLeave(e);
        }
	});

    function handleStart(evt) {
        evt.preventDefault();
        log("touchstart.");
        var el = document.getElementsByTagName("canvas")[0];
        var ctx = el.getContext("2d");
        var touches = evt.changedTouches;
      
        for (var i=0; i < touches.length; i++) {
          log("touchstart:"+i+"...");
          ongoingTouches.push(copyTouch(touches[i]));
          var color = colorForTouch(touches[i]);
          ctx.beginPath();
          ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0,2*Math.PI, false);  // a circle at the start
          ctx.fillStyle = color;
          ctx.fill();
          log("touchstart:"+i+".");
        }
      }