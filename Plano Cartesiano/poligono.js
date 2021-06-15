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
		for(i=0;i<this.pontos.length;i++)
		{
			sketch.vertex(pixelX(this.pontos[i].x),pixelY(this.pontos[i].y));
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