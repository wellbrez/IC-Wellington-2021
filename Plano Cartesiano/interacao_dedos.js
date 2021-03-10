$("#canvas2").on("touchstart touchmove touchend touchcancel touchleave",function(e)
	{
        
		if(e.type=="touchstart")
        {
            pagexstart1 = pagexstart2 = pageystart1 = pageystart2 = pagexnew1 = pagexnew2 = pageynew1 = pageynew2 = D_em_coord = 0;
            handleStart;
        }
        else if(e.type=="touchmove")
        {
            handleMove;
        }
        else if(e.type=="touchend")
        {
            handleEnd;
        }
        else if(e.type=="touchcancel")
        {
            handleCancel;
        }
        else if(e.type=="touchleave")
        {
            handleLeave;
        }
	});

    function handleStart(evt) 
    {
        evt.preventDefault();
        qtd_toques = evt.originalEvent.targetTouches.length;
        if(qtd_toques==2)
        {
            
            pagexstart1 = evt.originalEvent.changedTouches[0].pageX
            pageystart1 = evt.originalEvent.changedTouches[0].pageY
            pagexstart2 = evt.originalEvent.changedTouches[1].pageX
            pageystart2 = evt.originalEvent.changedTouches[1].pageY
            meio_dos_dedos_inicial_x = (pagexstart1 + pagexstart2)/2;
            meio_dos_dedos_inicial_y = pageystart1 - pageystart2
            dx_entre_dedos_inicial = pagexstart1 - pagexstart2
            dy_entre_dedos_inicial = pageystart1 - pageystart2
            D_entre_dedos_inicial = Math.sqrt(dx_entre_dedos_inicial**2+dy_entre_dedos_inicial**2);
            D_em_coord = ((dx_entre_dedos/escalax)**2+(dy_entre_dedos/escalay)**2)**0.5;
            d_circle = D_entre_dedos_inicial;
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
            console.log(evt.originalEvent.changedTouches);
            pagexnew1 = evt.originalEvent.changedTouches[0].pageX
            pageynew1 = evt.originalEvent.changedTouches[0].pageY
            pagexnew2 = evt.originalEvent.changedTouches[1].pageX
            pageynew2 = evt.originalEvent.changedTouches[1].pageY
            meio_dos_dedos_x = (pagexnew1 + pagexnew2)/2;
            meio_dos_dedos_y = (pageynew1 + pageynew2)/2;
            dx_entre_dedos = pagexnew1 - pagexnew2
            dy_entre_dedos = pageynew1 - pageynew2
            D_entre_dedos = (dx_entre_dedos**2+dy_entre_dedos**2)**0.5;
            dzoom = D_entre_dedos/D_em_coord;
            screvent = new zooming(1,dzoom/escalax,dzoom/escalay,meio_dos_dedos_x,meio_dos_dedos_y);
            d_circle = 100;
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