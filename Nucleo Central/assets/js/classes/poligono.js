let poligonos = [];
let poligonoSelecionado = 0;

function Polygon(nome,conjunto=propriedadesGlobais,pols = poligonos)
{
    this.nome = (nome==null ? "" : nome);
    this.pontos = [];
	this.selected = false;
	this.positivo = true;
	this.color;
	this.area = 0;
	this.centroideX = 0;
	this.centroideY = 0;
	this.IxCanvas = 0;
	this.IyCanvas = 0;
	this.IxyCanvas = 0;
	this.isValid = true;
	this.retasIntersectantes=[];
	this.LN = [];
	this.conjunto = conjunto;
	this.poligonos = pols;
	
	Polygon.prototype.addPontoPorPixel = function(posx,posy)
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
	Polygon.prototype.addPontoPorCoordenada = function(posx,posy)
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
	Polygon.prototype.atualizarPropriedades = function(override)
	{
		calcular_propriedades(this);
		if(override != null)
		{
			this.area = override;
		}
		calcularCentroidesGlobais(this.poligonos,this.conjunto);
		calcularInerciaGlobal(this.poligonos,this.conjunto);
		
		this.conjunto.envoltoria = calcularEnvoltoria(this.poligonos,this.conjunto);
    	atualizarMenuPoligonos();

		calcularNucleoCentral(this.conjunto);
		
		mostrar_area = true;
	}
	Polygon.prototype.desenharPontos = function()
	{
		for(let ponto of this.pontos)
		{
			ponto.desenhar();
		}
	}
	Polygon.prototype.desenharCentroide = function()
	{
		if(!this.isValid)
		{return}
		sketch.push()
		sketch.fill('white')
		sketch.strokeWeight(0);
		let cPixelX = pixelX(this.centroideX);
		let cPixelY = pixelY(this.centroideY);
		sketch.ellipse(cPixelX,cPixelY,10,10)
		sketch.pop()
	}
	Polygon.prototype.desenhar = function(cor=corPoligono)
	{
		sketch.push();
		if(!this.isValid)
		{
			sketch.strokeWeight(.2);
			sketch.stroke('white')
			sketch.fill("red")
			sketch.textSize(width/30);
			sketch.text("Há poligono(s) inválido(s)",-width/2+20,height/2-width/30)
			sketch.stroke(corContornoInvalido);
			sketch.strokeWeight(4);
			sketch.fill(corPoligonoInvalido);
		}
		else if(this.selected)
		{
			sketch.stroke(corContornoSelecionado);
			sketch.strokeWeight(8);
			sketch.fill(this.color||cor);
		}
		else
		{
			sketch.stroke(this.color||corContorno)
			sketch.strokeWeight(2)
			sketch.fill(this.color||cor)
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

function selecionar(id)
{
	desSelecionarPontos();
	for(pol of poligonos)
	{
		pol.selected = false;
	}
		poligonoSelecionado = id;
		poligonos[id].selected = true;
	
	
	atualizarUI();
}