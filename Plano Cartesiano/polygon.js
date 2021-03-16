function Polygon(nome,pontos)
{
    this.nome = (nome==null ? "" : nome);
    this.pontos = (pontos==null ? [] : pontos);
	this.selected = false;
	this.color = sketch.color(sketch.random(0,255),sketch.random(0,255),sketch.random(0,255));
    

	this.definir_inicio_da_animacao_de_ajuste = function()
	{
		this.midpointx = (this.pontos[0]+this.pontos[this.pontos.length-4])/2
		this.midpointy = (this.pontos[0]+this.pontos[this.pontos.length-3])/2
	}
	
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
			sketch.vertex(pixelX(this.pontos[i]),pixelY(this.pontos[i+1]));

		//console.log(i)
		}
		vary = sketch.map(adjtime,0,20,pixelY(this.pontos[i+1]),pixelY(this.midpointy))
		varx = sketch.map(adjtime,0,20,pixelX(this.pontos[i]),pixelX(this.midpointx))
		sketch.vertex(varx,vary);


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
			sketch.ellipse(pixelX(this.pontos[i]),pixelY(this.pontos[i+1]),10,10)
		}
		sketch.pop()
	}
	this.draw = function()
	{
		sketch.stroke(corContorno)
		sketch.strokeWeight(4)
		if(this.selected)
		{
			sketch.fill(corPoligono)
		}
		else
		{
			sketch.fill(this.color)
		}
		sketch.beginShape()
		for(i=0;i<this.pontos.length;i+=2)
		{
			sketch.vertex(pixelX(this.pontos[i]),pixelY(this.pontos[i+1]));
		}

		sketch.endShape(sketch.CLOSE)
	}
}