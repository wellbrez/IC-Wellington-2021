function Polygon(nome)
{
    this.nome = (nome==null ? "" : nome);
    this.pontos = (nome==null ? [] : pontos);
	this.selected = false;
	this.positivo = true;
	this.color = sketch.corPoligonoNormal;
	this.area = 0;
	
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
		console.log(`x=${posx}, y=${posy}`);
		criarPonto(60,
			posx,
			posy,
			this);
	}
	this.atualizarArea = function(override)
	{
		if(override == null)
		{
			somatorio = 0;
			let copiaDosPontos = JSON.parse(JSON.stringify(this.pontos));
			
			copiaDosPontos.push(copiaDosPontos[0]);

			for(pt=0;pt<copiaDosPontos.length-2;pt+=2)
			{
				somatorio+=copiaDosPontos[pt].x*copiaDosPontos[pt+1].y-copiaDosPontos[pt+1].x*copiaDosPontos[pt].y;
			}
			this.area = Math.abs(0.5*somatorio);
		}
		else
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

