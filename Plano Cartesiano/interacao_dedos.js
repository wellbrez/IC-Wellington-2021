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
        if(qtd_toques==1)
        {
            pagexstart1 = evt.originalEvent.targetTouches[0].pageX;
            pageystart1 = evt.originalEvent.targetTouches[0].pageY;
        }
        else if(qtd_toques==2)
        {
            pagexstart1 = pagexstart2 = pageystart1 = pageystart2 = pagexnew1 = pagexnew2 = pageynew1 = pageynew2 = D_em_coord = meio_dos_dedos_inicial_x = meio_dos_dedos_inicial_y= 0;
            pagexstart1 = evt.originalEvent.targetTouches[0].pageX
            pageystart1 = evt.originalEvent.targetTouches[0].pageY
            pagexstart2 = evt.originalEvent.targetTouches[1].pageX
            pageystart2 = evt.originalEvent.targetTouches[1].pageY
            meio_dos_dedos_inicial_x = (pagexstart1 + pagexstart2)/2
            meio_dos_dedos_inicial_y = (pageystart1 + pageystart2)/2
            centerscreen = [cscreenX,cscreenY];
            dx_entre_dedos_inicial = pagexstart1 - pagexstart2
            dy_entre_dedos_inicial = pageystart1 - pageystart2
            D_entre_dedos_inicial = Math.sqrt(dx_entre_dedos_inicial**2+dy_entre_dedos_inicial**2);
            D_em_coord = ((dx_entre_dedos_inicial/escalax)**2+(dy_entre_dedos_inicial/escalay)**2)**0.5;
        }
        
    }
    function handleMove(evt) 
    {
        evt.preventDefault();
        qtd_toques = evt.originalEvent.targetTouches.length;
        if(qtd_toques==2)
        {
            console.log(evt.originalEvent.targetTouches);
            pagexnew1 = evt.originalEvent.targetTouches[0].pageX
            pageynew1 = evt.originalEvent.targetTouches[0].pageY
            pagexnew2 = evt.originalEvent.targetTouches[1].pageX
            pageynew2 = evt.originalEvent.targetTouches[1].pageY
            meio_dos_dedos_x = (pagexnew1 + pagexnew2)/2;
            meio_dos_dedos_y = (pageynew1 + pageynew2)/2;
            dx_entre_dedos = pagexnew1 - pagexnew2
            dy_entre_dedos = pageynew1 - pageynew2
            deslocamento_meio_x = -meio_dos_dedos_x + meio_dos_dedos_inicial_x
            deslocamento_meio_y = -meio_dos_dedos_y + meio_dos_dedos_inicial_y
            console.log(deslocamento_meio_x,deslocamento_meio_y);
            D_entre_dedos = (dx_entre_dedos**2+dy_entre_dedos**2)**0.5;
            dzoom = D_entre_dedos/D_em_coord;
            
            mvevent = new moving(1,centerscreen[0],centerscreen[1],deslocamento_meio_x,deslocamento_meio_y);
            screvent = new zooming(1,dzoom/escalax,dzoom/escalay,meio_dos_dedos_x,meio_dos_dedos_y);
        }
    }
    function handleEnd(evt) 
    {
        evt.preventDefault;
        qtd_toques = evt.originalEvent.targetTouches.length;
        
        if(qtd_toques==1)
        {
            let pagexnew1 = evt.originalEvent.targetTouches[0].pageX
            let pageynew1 = evt.originalEvent.targetTouches[0].pageY
            let deltaX = pagexstart1 - pagexnew1;
            let deltaY = pageystart1 - pageynew1;
            let distP1P2 = (deltaX**2 + deltaY**2)**.5;


            if(distP1P2<=20)
            {
                poligono_selecionado = 0;
                console.log(evt);
                polygons[poligono_selecionado].add_ponto_por_pixel(sketch.mouseX,sketch.mouseY);
                polygons[poligono_selecionado].definir_inicio_da_animacao_de_ajuste();
                adjtime=20;
                atualizarUI();
            }
        }
        
    }
    function handleCancel(evt) 
    {
    }
    function handleLeave(evt) 
    {
    }