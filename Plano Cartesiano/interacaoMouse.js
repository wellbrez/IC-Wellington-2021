


function zoom(passos,zoomx,zoomy,posx,posy)
{
	//this.incremento = scr_objetivo/tempo;
	this.passos = passos;
	//this.incremento = (escalax*scr_objetivo-escalax)/passos;
	this.zoom_inicial_x = escalax;
	this.zoom_inicial_y = escalay;

	this.zoom_final_x = escalax*zoomx;
	this.zoom_final_y = escalay*zoomy;

	this.posicao_final_x = origemX + (posx-width/2)/escalax - (posx-width/2)/escalax/zoomx;
	this.posicao_final_y = origemY + (posy-height/2)/escalay - (posy-height/2)/escalay/zoomy;
	

	this.incremento_zoom_x = (this.zoom_final_x - escalax)/passos;
	this.incremento_zoom_y = (this.zoom_final_y - escalay)/passos;

	this.incremento_posicao_x = (this.posicao_final_x)/passos;
	this.incremento_posicao_y = (this.posicao_final_y)/passos;

	this.aplicar = function()
	{
		if (this.passos>0)
		{
			let escala_x_anterior = escalax;
			let escala_y_anterior = escalay;

			escalax+=this.incremento_zoom_x;
			escalay+=this.incremento_zoom_y;

			origemX=origemX + (posx-width/2)/escala_x_anterior - (posx-width/2)/escalax;
			origemY=origemY + (posy-height/2)/escala_y_anterior - (posy-height/2)/escalay;

			this.passos-=1;

		}
		else
		{
			escalax = this.zoom_final_x;
			escalay = this.zoom_final_y;
			//origemX = coord_mx()-(mouseX-width/2)/(escalax);
			//origemY = coord_my()+(mouseY-height/2)/(escalay);
			origemX= this.posicao_final_x
			origemY= this.posicao_final_y;
			eventoZoom = null;

		}
	}
}

function scroll(tempo,origemXinicial,origemYinicial,mv_objetivox,mv_objetivoy)
{
	mv_objetivox = (mv_objetivox)/escalax
	mv_objetivoy = (mv_objetivoy)/escalay

	this.incrementox = mv_objetivox/tempo;
	this.incrementoy = mv_objetivoy/tempo;
	this.tempo = tempo;
	this.aplicar = function()
	{
		if (this.tempo>0)
		{
			origemX=origemXinicial+this.incrementox;
			origemY=origemYinicial+this.incrementoy;
			this.tempo-=1;
		}
	}
}

function mouseWheel(event)
{
	//eventoScroll = new scroll(5, (mouseX-width/2)/escalax*0.3,-(mouseY-height/2)/escalay*0.3);
	delta_scroll = (Math.abs(event.delta/1000)+1)**Math.sign(-event.delta);
	escalax_antes = escalax;
	escalay_antes = escalay;
	eventoZoom = new zoom(5,delta_scroll,delta_scroll,sketch.mouseX,sketch.mouseY)
	//eventoScroll = new scroll(5,coord_mx()-origemX-(mouseX-width/2)/(escalax_antes*delta_scroll) , coord_my()-origemY+(mouseY-height/2)/(escalay_antes*delta_scroll));
}

function mouse_clicked_canvas(event)
{
	
	console.log(pontoAtivo);
	if(adicionarPonto)
	{
		poligonos[poligonoSelecionado].addPontoPorPixel(sketch.mouseX,sketch.mouseY);
	}
	
	//poligonos[poligonoSelecionado].definir_inicio_da_animacao_de_ajuste();
	//adjtime=20;
	atualizarUI();
	//adjintx = (coord_mx() - midpointx)
	//adjinty = (coord_my() - midpointy)

	
}
let pontoAtivo = null;
let permissaoParaMover = false;
let adicionarPonto = true;
$("#canvas2").on("mousedown mousemove mouseup",function(e)
	{
		if(e.type=="mousedown")
		{
			if(e.which==1)
			{
				e.preventDefault();
				adicionarPonto = true;
				if(pontoAtivo!=null)
				{
					if(tocouNoPonto(e.pageX,e.pageY)==null && pontoAtivo.ativo == true)
					{
						pontoAtivo.desSelecionar();
						adicionarPonto=false;
						pontoAtivo = null;
					}
				}
				
				pontoAtivo = tocouNoPonto(e.pageX,e.pageY);
				if(pontoAtivo!=null)
				{
					adicionarPonto = false;
					if(!pontoAtivo.ativo)
					{
						desSelecionarPontos();
						pontoAtivo.selecionar();
					}
					else if (pontoAtivo.ativo)
					{
						permissaoParaMover = true;
					}
					else 
					{
						desSelecionarPontos();
					}
				}
				else
				{
					desSelecionarPontos();
				}
				
			}
			if(e.which==2)
			{
				e.preventDefault();
				middledragstart = [e.pageX,e.pageY];
				centerscreen = [origemX,origemY];
				middledragactive = true;
			}
		}
		else if(e.type=="mousemove")
		{
			e.preventDefault();
			if(permissaoParaMover && pontoAtivo!=null)
			{
				pontoAtivo.mover(posicao_do_pixel_x(sketch.mouseX),posicao_do_pixel_y(sketch.mouseY));
				atualizarUI();
			}
			if(middledragactive)
			{
				
				eventoScroll = new scroll(1,centerscreen[0],centerscreen[1],-e.pageX+middledragstart[0],-e.pageY+middledragstart[1]);
				
			}
		}
		else if(e.type=="mouseup")
		{
			e.preventDefault();
			if(e.which==1)
			{
				permissaoParaMover=false;
				mouse_clicked_canvas(e);
			}
			if(e.which==2)
			{
				
				middledragstart = [0,0]
				middledragactive = false;
			}
		}
	
	});