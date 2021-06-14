function adicionarPoligono()
{
	poligonos.push(new Polygon("Pol",[]));
	selecionar(poligonos.length-1);
}
function selecionar(id)
{
	poligonoSelecionado = id;
	for(pol of poligonos)
	{
		pol.selected = false;
	}
	poligonos[id].selected = true;
	atualizarUI();
}
function Polygon(nome,pontos)
{
    this.nome = (nome==null ? "" : nome);
    this.pontos = (pontos==null ? [] : pontos);
	this.objetivos = this.pontos;
	this.selected = false;
	this.positivo = true;
	this.color = sketch.corPoligonoNormal;
	this.area = 0;
	this.transicoes = [];
    

	this.definir_inicio_da_animacao_de_ajuste = function()
	{
		//this.midpointx = (this.objetivos[0]+this.objetivos[this.objetivos.length-4])/2
		//this.midpointy = (this.objetivos[0]+this.objetivos[this.objetivos.length-3])/2
	}
	
	this.addPontoPorPixel = function(posx,posy,index)
	{
		if(index==undefined)
		{
			this.transicoes.push(new transicaoPoligono(
				60,
				this.pontos.length,
				this.pontos.length+1,
				posicao_do_pixel_x(posx),
				posicao_do_pixel_y(posy),
				"add",
				this))
			this.transicoes[this.transicoes.length-1].setup();
			this.definir_inicio_da_animacao_de_ajuste()
		}
	}
	this.addPontoPorCoordenada = function(posx,posy)
	{
		if(index==undefined)
		{
			this.transicoes.push(new transicaoPoligono(
				60,
				this.pontos.length,
				this.pontos.length+1,
				posx,
				posy,
				"add",
				this))
			this.transicoes[this.transicoes.length-1].setup();
			this.definir_inicio_da_animacao_de_ajuste()
		}
	}
	this.atualizarArea = function(override)
	{
		if(override == null)
		{
			somatorio = 0;
			let copiaDosPontos = JSON.parse(JSON.stringify(this.pontos));
			
			copiaDosPontos.push(copiaDosPontos[0]);
			copiaDosPontos.push(copiaDosPontos[1]);

			for(pt=0;pt<copiaDosPontos.length-2;pt+=2)
			{
				somatorio+=copiaDosPontos[pt]*copiaDosPontos[pt+3]-copiaDosPontos[pt+2]*copiaDosPontos[pt+1];
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
		sketch.push()
		sketch.stroke(corContorno)
		sketch.strokeWeight(4)
		sketch.ellipseMode(sketch.CENTER)
		sketch.fill(corBolha)
		for(i=0;i<this.pontos.length;i+=2)
		{
			sketch.ellipse(pixelX(this.pontos[i]),pixelY(this.pontos[i+1]),10,10)
		}
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
		for(i=0;i<this.pontos.length;i+=2)
		{
			sketch.vertex(pixelX(this.pontos[i]),pixelY(this.pontos[i+1]));
		}

		sketch.endShape(sketch.CLOSE)
		sketch.pop();
	}
}


function ajustarIndiceAoIntervalo(i,lista)
{
	while(i>=lista.length)
	{
		i-=lista.length;
	}
	while(i<0)
	{
		i+=lista.length;
	}
	return i;
}