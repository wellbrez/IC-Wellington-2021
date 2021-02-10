function Polygon(nome,pontos)
{
    this.nome = (nome==null ? "" : nome);
    this.pontos = (pontos==null ? [] : pontos);
    


	
	this.add_ponto_por_pixel = function(posx,posy)
	{
		this.pontos.push(posicao_do_pixel_x(posx));
		this.pontos.push(posicao_do_pixel_y(posy));
	}
	this.add_ponto_por_coordenada = function(posx,posy)
	{
		this.pontos.push(posx);
		this.pontos.push(posy);
	}
	this.adjusting = function()
	{
		console.log('adjusting');
		adjtime-=1;
		fill(corPoligono)
		stroke(corContorno)
		strokeWeight(4)
		beginShape()
		for(i=0;i<this.pontos.length-2;i+=2)
		{
			vertex(pixelY(this.pontos[i+1]),pixelX(this.pontos[i]));

		console.log(i)
		}
		vary = map(adjtime,0,20,pixelY(this.pontos[i+1]),pixelY(midpointy))
		varx = map(adjtime,0,20,pixelX(this.pontos[i]),pixelX(midpointx))
		vertex(vary,varx);


		console.log(i)

		endShape(CLOSE)
	}
	this.bubbledraw = function()
	{
		push()
		ellipseMode(CENTER)
		fill(corBolha)
		for(i=0;i<this.pontos.length;i+=2)
		{
			ellipse(pixelY(this.pontos[i+1]),pixelX(this.pontos[i]),10,10)
		}
		pop()
	}
	this.draw = function()
	{
		stroke(corContorno)
		strokeWeight(4)
		fill(corPoligono)
		beginShape()
		for(i=0;i<this.pontos.length;i+=2)
		{
			vertex(pixelY(this.pontos[i+1]),pixelX(this.pontos[i]));
		}

		endShape(CLOSE)
	}
}