


function scrolling(passos,zoomx,zoomy,posx,posy)
{
	//this.incremento = scr_objetivo/tempo;
	this.passos = passos;
	//this.incremento = (escalax*scr_objetivo-escalax)/passos;
	this.zoom_inicial_x = escalax;
	this.zoom_inicial_y = escalay;

	this.zoom_final_x = escalax*zoomx;
	this.zoom_final_y = escalay*zoomy;

	this.posicao_final_x = cscreenX + (posx-width/2)/escalax - (posx-width/2)/escalax/zoomx;
	this.posicao_final_y = cscreenY - (posy-height/2)/escalay + (posy-height/2)/escalay/zoomy;

	this.incremento_zoom_x = (this.zoom_final_x - escalax)/passos;
	this.incremento_zoom_y = (this.zoom_final_y - escalay)/passos;

	this.incremento_posicao_x = (this.posicao_final_x)/passos;
	this.incremento_posicao_y = (this.posicao_final_y)/passos;

	this.aplicar = function()
	{
		if (this.passos>0)
		{
			var escala_x_anterior = escalax;
			var escala_y_anterior = escalay;

			escalax+=this.incremento_zoom_x;
			escalay+=this.incremento_zoom_y;

			cscreenX=cscreenX + (posx-width/2)/escala_x_anterior - (posx-width/2)/escalax;
			cscreenY=cscreenY - (posy-height/2)/escala_y_anterior + (posy-height/2)/escalay;

			this.passos-=1;

		}
		else
		{
			escalax = this.zoom_final_x;
			escalay = this.zoom_final_y;
			//cscreenX = coord_mx()-(mouseX-width/2)/(escalax);
			//cscreenY = coord_my()+(mouseY-height/2)/(escalay);
			cscreenX= this.posicao_final_x
			cscreenY= this.posicao_final_y;
			screvent = null;

		}
	}
}

function moving(tempo,mv_objetivox,mv_objetivoy)
{

	this.incrementox = mv_objetivox/tempo;
	this.incrementoy = mv_objetivoy/tempo;
	this.tempo = tempo;
	this.aplicar = function()
	{
		if (this.tempo>0)
		{
			cscreenX+=this.incrementox;
			cscreenY+=this.incrementoy;
			this.tempo-=1;
		}
	}
}

function mouseWheel(event)
{
	//mvevent = new moving(5, (mouseX-width/2)/escalax*0.3,-(mouseY-height/2)/escalay*0.3);
	delta_scroll = (Math.abs(event.delta/1000)+1)**Math.sign(-event.delta);
	escalax_antes = escalax;
	escalay_antes = escalay;
	screvent = new scrolling(5,delta_scroll,delta_scroll,sketch.mouseX,sketch.mouseY)
	//mvevent = new moving(5,coord_mx()-cscreenX-(mouseX-width/2)/(escalax_antes*delta_scroll) , coord_my()-cscreenY+(mouseY-height/2)/(escalay_antes*delta_scroll));
}

function mouse_clicked_canvas()
{

	polygons[0].add_ponto_por_pixel(sketch.mouseX,sketch.mouseY);
	adjtime=20;


	midpointx = (polygons[0].pontos[0]+polygons[0].pontos[polygons[0].pontos.length-4])/2
	midpointy = (polygons[0].pontos[1]+polygons[0].pontos[polygons[0].pontos.length-3])/2
	console.log('midpointx'+midpointx)
	console.log('midpointy'+midpointy)
	adjintx = (coord_mx() - midpointx)
	adjinty = (coord_my() - midpointy)

	
}