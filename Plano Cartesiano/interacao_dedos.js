$("#canvas2").on("touchstart touchmove touchend touchcancel touchleave",function(e)
	{
        
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

    function handleStart(evt) 
    {
        evt.preventDefault();
        qtd_toques = evt.originalEvent.targetTouches.length;
        if(qtd_toques==2)
        {
            meio_dos_dedos_inicial_x = (evt.originalEvent.changedTouches[0].pageX + evt.originalEvent.changedTouches[1].pageX)/2;
            meio_dos_dedos_inicial_y = (evt.originalEvent.changedTouches[0].pageY + evt.originalEvent.changedTouches[1].pageY)/2;
            dx_entre_dedos_inicial = evt.originalEvent.changedTouches[0].pageX - evt.originalEvent.changedTouches[1].pageX
            dy_entre_dedos_inicial = evt.originalEvent.changedTouches[0].pageY - evt.originalEvent.changedTouches[1].pageY
            D_entre_dedos_inicial = Math.sqrt(dx_entre_dedos**2+dy_entre_dedos**2);
            d_circle = D_entre_dedos;
        }
        else
        {
            d_circle = 0;
        }
        console.log(evt.originalEvent.changedTouches);
        var toques = evt.originalEvent.targetTouches[0];
        toquex = toques.pageX;
        toquey = toques.pageY;
        
    }
    function handleMove(evt) 
    {
        evt.preventDefault();
        qtd_toques = evt.originalEvent.targetTouches.length;
        if(qtd_toques==2)
        {
            meio_dos_dedos_x = (evt.originalEvent.changedTouches[0].pageX + evt.originalEvent.changedTouches[1].pageX)/2;
            meio_dos_dedos_y = (evt.originalEvent.changedTouches[0].pageY + evt.originalEvent.changedTouches[1].pageY)/2;
            dx_entre_dedos = evt.originalEvent.changedTouches[0].pageX - evt.originalEvent.changedTouches[1].pageX
            dy_entre_dedos = evt.originalEvent.changedTouches[0].pageY - evt.originalEvent.changedTouches[1].pageY
            D_entre_dedos = Math.sqrt(dx_entre_dedos**2+dy_entre_dedos**2);
            d_circle = D_entre_dedos;
        }
        else
        {
            d_circle = 0;
        }
        console.log(evt.originalEvent.changedTouches);
        var toques = evt.originalEvent.targetTouches[0];
        toquex = toques.pageX;
        toquey = toques.pageY;
    }
    function handleEnd(evt) 
    {
    }
    function handleCancel(evt) 
    {
    }
    function handleLeave(evt) 
    {
    }