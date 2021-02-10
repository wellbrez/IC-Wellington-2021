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
		//console.log('adjusting');
		adjtime-=1;
		sketch.fill(corPoligono)
		sketch.stroke(corContorno)
		sketch.strokeWeight(4)
		sketch.beginShape()
		for(i=0;i<this.pontos.length-2;i+=2)
		{
			sketch.vertex(pixelY(this.pontos[i+1]),pixelX(this.pontos[i]));

		//console.log(i)
		}
		vary = sketch.map(adjtime,0,20,pixelY(this.pontos[i+1]),pixelY(midpointy))
		varx = sketch.map(adjtime,0,20,pixelX(this.pontos[i]),pixelX(midpointx))
		sketch.vertex(vary,varx);


		//console.log(i)

		sketch.endShape(sketch.CLOSE)
	}
	this.bubbledraw = function()
	{
		sketch.push()
		sketch.ellipseMode(sketch.CENTER)
		sketch.fill(corBolha)
		for(i=0;i<this.pontos.length;i+=2)
		{
			sketch.ellipse(pixelY(this.pontos[i+1]),pixelX(this.pontos[i]),10,10)
		}
		sketch.pop()
	}
	this.draw = function()
	{
		sketch.stroke(corContorno)
		sketch.strokeWeight(4)
		sketch.fill(corPoligono)
		sketch.beginShape()
		for(i=0;i<this.pontos.length;i+=2)
		{
			sketch.vertex(pixelY(this.pontos[i+1]),pixelX(this.pontos[i]));
		}

		sketch.endShape(sketch.CLOSE)
	}
}