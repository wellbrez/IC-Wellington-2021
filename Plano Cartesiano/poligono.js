function Polygon(nome)
{
    this.nome = (nome==null ? "" : nome);
    this.pontos = [];
	this.selected = false;
	this.positivo = true;
	this.color = sketch.corPoligonoNormal;
	this.area = 0;
	this.centroideX = 0;
	this.centroideY = 0;
	this.IxCanvas = 0;
	this.IyCanvas = 0;
	this.IxyCanvas = 0;
	
	this.addPontoPorPixel = function(posx,posy)
	{
		if(Number.isNaN(posx)||Number.isNaN(posy))
		{
			console.error("Entrou com ponto invalido");
		}
		criarPonto(60,
			posicao_do_pixel_x(posx),
			posicao_do_pixel_y(posy),
			this)
	}
	this.addPontoPorCoordenada = function(posx,posy)
	{
		if(Number.isNaN(posx)||Number.isNaN(posy))
		{
			console.error("Entrou com ponto invalido");
		}
		criarPonto(60,
			posx,
			posy,
			this);
	}
	this.atualizarPropriedades = function(override)
	{
		calcular_propriedades(this);
		if(override != null)
		{
			this.area = override;
		}
		mostrar_area = true;
	}
	this.desenharPontos = function()
	{
		for(let ponto of this.pontos)
		{
			ponto.desenhar();
		}
	}
	this.desenharCentroide = function()
	{
		sketch.push()
		sketch.fill('white')
		sketch.strokeWeight(0);
		let cPixelX = pixelX(this.centroideX);
		let cPixelY = pixelY(this.centroideY);
		sketch.ellipse(cPixelX,cPixelY,10,10)
		sketch.pop()
	}
	this.desenhar = function()
	{
		sketch.push();
		if(this.selected)
		{
			sketch.stroke(corContornoSelecionado);
			sketch.strokeWeight(8);
			sketch.fill(corPoligono);
		}
		else
		{
			sketch.stroke(corContorno)
			sketch.strokeWeight(4)
			sketch.fill(corPoligono)
		}
		sketch.beginShape()
		for(let i=0;i<this.pontos.length;i++)
		{
			sketch.vertex(pixelX(this.pontos[i].x),pixelY(this.pontos[i].y));
		}

		sketch.endShape(sketch.CLOSE)
		sketch.pop();
	}
}

