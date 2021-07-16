

function resizewindow()
{
	width = document.body.getBoundingClientRect().width;
	//let width = screen.width;
	height = document.body.getBoundingClientRect().height;
	//let height = screen.height;
	window.sketch.resizeCanvas(width,height,true);
}
var sketch = function(p)
{
	p.setup = function()
	{
		d_circle = 0;
		toquex=0;
		toquey=0;
		p.frameRate(60)
		eventoZoom = null;
		eventoScroll = null;
		//width = (p.windowWidth);
		//height = (p.windowHeight);
		width = document.body.getBoundingClientRect().width;
		height = document.body.getBoundingClientRect().height;
		p.cnv = p.createCanvas(width,height);

		escalax=1;
		escalay=1;
		iglobal = 0;

		origemX = 0;
		origemY = 0;

		origin_pixeldistx = origemX*escalax;
		origin_pixeldisty = origemY*escalay;

		intervalo = 10;
		carregarImportacaoInicial();
		let grahamScan;
		poligonos[poligonos.length-1].selected = true;

		
		
		mostrar_area = false;

		
		resizewindow();

	}
	p.mouseWheel = function(event)
	{
		mouseWheel(event);
	}
	p.draw = function()
	{
		p.clear();
		resizewindow();
		//distância, em pixels, da origem do plano cartesiano (atualizacao)
		origin_pixeldistx = origemX*escalax;
		origin_pixeldisty = origemY*escalay;
		//definindo cor de fundo do canvas
		p.background(corFundo);
		//translacção ao meio da tela
		p.translate(width/2,height/2);
		//rotacao do canvas (?)
		att_intervalo()
		//grade principal
		p.stroke(corGradePrincipal)
		p.strokeWeight(2)
		grade(p,intervalo);
		//grade secundária
		p.strokeWeight(1)
		p.stroke(corGradeSecundaria);
		grade(p,intervalo/5);

		linhas_principais(p,corLinhasPrincipais);
		
		//p.ellipse(0,0,d_circle,d_circle)
		//rect(-origin_pixeldisty,-origin_pixeldistx,50*escalay,50*escalax);
		
		

		
		for(let poligono of poligonos)
		{
			p.push()
			for(let ponto of poligono.pontos)
			{
				ponto.animar();
			}
			p.pop()
			envoltoria = calcularEnvoltoria();
			desenharEnvoltoria(envoltoria);
			poligono.desenhar();
			poligono.desenharPontos();
			poligono.desenharCentroide();
		}
		p.push();
		p.beginShape()
		for(let ponto of pontosDoNucleoCentral)
		{
			
			let x = pixelX(ponto.x);
			let y = pixelY(ponto.y);
			let xTexto = pixelX(ponto.x)+2;
			let yTexto = pixelY(ponto.y) -2;
			let cx = ponto.xOriginal.toFixed(2);
			let cy = -ponto.yOriginal.toFixed(2);

			p.vertex(x,y);
			p.fill('white');
			p.textSize(15);
			p.strokeWeight(0);
			p.text(`(${cx} , ${cy})`,xTexto,yTexto)
			p.strokeWeight(2);
			p.fill(corContorno);
			p.ellipse(x,y,7,7);
		}
		
		/*SohArea.atualizarPropriedades();*/
		p.strokeWeight(2);
		p.stroke('rgba(255,255,255,0.6)')
		p.fill('rgba(0,0,0,0)');
		p.endShape(p.CLOSE)

		if(eixoPrincipalL1.length>0)
		{
			eixosPrincipais();
		}
		
		if(mostrarLN && poligonos[0].pontos.length>=3)
		{
			SohArea1 = new Polygon("SohArea1");
			SohArea2 = new Polygon("SohArea2");
			const [a,b] = desenharLN(p.mouseX,p.mouseY,areaTotal,IxPrincipal,IyPrincipal);
		
			SohArea1.atualizarPropriedades()
			SohArea2.atualizarPropriedades()
			if(SohArea1.area>SohArea2.area)
			{
				SohArea1.color = "rgba(0,255,0,.4)"
				SohArea2.color = "rgba(255,0,0,.4)"
				let percent = SohArea1.area*100 / (poligonos[0].area)
				document.getElementById("AreaSapata").innerHTML = `Area tracionada:${percent.toFixed(3)}%`;
			}
			else
			{
				SohArea2.color = "rgba(0,255,0,.4)"
				SohArea1.color = "rgba(255,0,0,.4)"
				let percent = SohArea2.area*100 / (poligonos[0].area)
				document.getElementById("AreaSapata").innerHTML = `Area tracionada:${percent.toFixed(3)}%`;
			}
			
		
			SohArea1.desenhar();
			SohArea2.desenhar();

			
			sketch.fill("white");
			sketch.strokeWeight(0);
			sketch.text(`a: ${a.toFixed(2)}`,correcaoPixelX(sketch.mouseX),correcaoPixelY(sketch.mouseY)-20)
			sketch.text(`b: ${-b.toFixed(2)}`,correcaoPixelX(sketch.mouseX),correcaoPixelY(sketch.mouseY))
			
		}
		
		


		/*for(let IP of IPs)
		{
			p.ellipse(pixelX(IP.x),pixelY(IP.y),30,30)
		}*/

		p.pop();

		
		if(eventoScroll!=null){
			eventoScroll.aplicar()};
		if(eventoZoom!=null){
		eventoZoom.aplicar()}
		//p.stroke('white');
		//p.strokeWeight(2);
		//p.line(-origin_pixeldistx,-origin_pixeldisty,0,0);
		//p.ellipse(toquex-width/2,toquey-height/2,10,10);

		p.push();
		p.fill('yellow');
		p.noStroke;

		



	}
}








