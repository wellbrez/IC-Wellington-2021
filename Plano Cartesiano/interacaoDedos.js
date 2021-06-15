let addponto = true;
let movimento = true;
let moverPonto = false;
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
        centerscreen = [origemX,origemY];
        if(qtd_toques==1)
        {
            
            addponto = true;
            movimento = true;
            pInicialX = evt.originalEvent.targetTouches[0].pageX;
            pInicialY = evt.originalEvent.targetTouches[0].pageY;
            if(pontoAtivo!=null)
            {
                addponto = false;
            }
            pontoAtivo = tocouNoPonto(pInicialX,pInicialY);
            if(pontoAtivo!=null)
            {
                selecionouPonto = true;
                addponto = false;
                if(pontoAtivo.ativo)
                {
                    moverPonto = true;
                    movimento = false;
                }
                else
                {
                    moverPonto = false;
                    desSelecionarPontos();
                }
            }
        }
        else if(qtd_toques==2)
        {
            selecionouPonto = false;
            moverPonto= false;
            addponto = false;
            movimento = false;
            pInicialX = pagexstart2 = pInicialY = pageystart2 = pagexnew1 = pagexnew2 = pageynew1 = pageynew2 = D_em_coord = meio_dos_dedos_inicial_x = meio_dos_dedos_inicial_y= 0;
            pInicialX = evt.originalEvent.targetTouches[0].pageX
            pInicialY = evt.originalEvent.targetTouches[0].pageY
            pagexstart2 = evt.originalEvent.targetTouches[1].pageX
            pageystart2 = evt.originalEvent.targetTouches[1].pageY
            //meio_dos_dedos_inicial_x = (pInicialX + pagexstart2)/2
            //meio_dos_dedos_inicial_y = (pInicialY + pageystart2)/2
            dx_entre_dedos_inicial = pInicialX - pagexstart2
            dy_entre_dedos_inicial = pInicialY - pageystart2
            D_entre_dedos_inicial = Math.sqrt(dx_entre_dedos_inicial**2+dy_entre_dedos_inicial**2);
            D_em_coord = ((dx_entre_dedos_inicial/escalax)**2+(dy_entre_dedos_inicial/escalay)**2)**0.5;
        }
        
    }
    function handleMove(evt) 
    {
        //centerscreen = [origemX,origemY];
        evt.preventDefault();
        qtd_toques = evt.originalEvent.targetTouches.length;
        if(qtd_toques==1)
        {
            let pagexnew1 = evt.originalEvent.changedTouches[0].pageX
            let pageynew1 = evt.originalEvent.changedTouches[0].pageY
            let deltaX = pInicialX - pagexnew1;
            let deltaY = pInicialY - pageynew1;
            let distP1P2 = (deltaX**2 + deltaY**2)**.5;
            if(distP1P2>20 && moverPonto == false)
            {
                addponto = false;
                selecionouPonto=false;
                if(movimento)
                {
                eventoScroll = new scroll(1,centerscreen[0],centerscreen[1],deltaX,deltaY);
                }
            }
            else if(distP1P2>20 && moverPonto == true)
            {
                addponto = false;
                selecionouPonto = false;
                pontoAtivo.mover(posicao_do_pixel_x(pagexnew1),posicao_do_pixel_y(pageynew1));
            }
        }
        if(qtd_toques==2)
        {
            pagexnew1 = evt.originalEvent.targetTouches[0].pageX
            pageynew1 = evt.originalEvent.targetTouches[0].pageY
            pagexnew2 = evt.originalEvent.targetTouches[1].pageX
            pageynew2 = evt.originalEvent.targetTouches[1].pageY
            meio_dos_dedos_x = (pagexnew1 + pagexnew2)/2;
            meio_dos_dedos_y = (pageynew1 + pageynew2)/2;
            dx_entre_dedos = pagexnew1 - pagexnew2
            dy_entre_dedos = pageynew1 - pageynew2
            D_entre_dedos = (dx_entre_dedos**2+dy_entre_dedos**2)**0.5;
            dzoom = D_entre_dedos/D_em_coord;
            
            //eventoScroll = new scroll(1,centerscreen[0],centerscreen[1],deslocamento_meio_x,deslocamento_meio_y);
            eventoZoom = new zoom(1,dzoom/escalax,dzoom/escalay,meio_dos_dedos_x,meio_dos_dedos_y);
        }
    }
    function handleEnd(evt) 
    {
        evt.preventDefault;
        if(addponto)
        {
            poligonos[poligonoSelecionado].addPontoPorPixel(sketch.mouseX,sketch.mouseY);
            //poligonos[poligonoSelecionado].definir_inicio_da_animacao_de_ajuste();
            adjtime=20;
            atualizarUI();
        }
        if(pontoAtivo!=null)
        {
            if(selecionouPonto)
            {
                pontoAtivo.selecionar();
            }
        }
        
    }
    function handleCancel(evt) 
    {
    }
    function handleLeave(evt) 
    {
    }
    
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
      
        switch (event.key) {
          case "ArrowLeft":
            // code for "left arrow" key press.
            iglobal-=2;
            break;
          case "ArrowRight":
            // code for "right arrow" key press.
            iglobal+=2;
            break;
          default:
            return; // Quit when this doesn't handle the key event.
        }
    })