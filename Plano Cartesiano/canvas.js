

function resizewindow()
{
	let width = document.getElementById('canvas2').getBoundingClientRect().width;
	let height = document.getElementById('canvas2').getBoundingClientRect().height;
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
		screvent = null;
		mvevent = null;
		width = (p.windowWidth);
		height = (p.windowHeight);
		p.cnv = p.createCanvas(width,height);

		escalax=1;
		escalay=1;

		cscreenX = 0;
		cscreenY = 0;

		origin_pixeldistx = cscreenX*escalax;
		origin_pixeldisty = cscreenY*escalay;

		intervalo = 10;
		carregarImportacaoInicial();
		let grahamScan;
		polygons[polygons.length-1].selected = true;

		
		
		mostrar_area = false;
		adjtime=0;
		adjinty=0;
		adjintx=0;

		//TABELA DE CORES//
		corBolha = '#12130F'
		corGradePrincipal = 'rgba(255,255,255,.1)'
		corGradeSecundaria = 'rgba(255,255,255,.05)'
		corFundo = '#12130F'
		corLinhasPrincipais = "rgba(255,255,255,.8"
		corContorno = 'rgba(35.7%, 57.3%, 47.5%,.9)';
		corPoligono = "rgba(35.7%, 57.3%, 47.5%,.5)"
		corContornoSelecionado = "rgba(234,230,229)"
		corEnvoltoria = 'rgb(143, 203, 155)';
		
		resizewindow();

	}
	//console.log("mensagem"+str(parametro))
	p.mouseWheel = function(event)
	{
		mouseWheel(event);
	}
	p.draw = function()
	{
		p.clear();
		resizewindow();
		//distância, em pixels, da origem do plano cartesiano (atualizacao)
		origin_pixeldistx = cscreenX*escalax;
		origin_pixeldisty = cscreenY*escalay;
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
		
		

		
		for(let poligono of polygons)
		{
			p.push()
			for(t=0;t<poligono.transicoes.length;t++)
			{
				poligono.transicoes[t].attframe();
				if(poligono.transicoes[t].ended)
				{
					poligono.transicoes.splice(t,1);
				}
			}
			
			p.pop()
			envoltoria = calcularEnvoltoria();
			desenharEnvoltoria(envoltoria);
			poligono.draw();
			poligono.bubbledraw();
		}
		
		if(mvevent!=null){
			mvevent.aplicar()};
		if(screvent!=null){
		screvent.aplicar()}
		//p.stroke('white');
		//p.strokeWeight(2);
		//p.line(-origin_pixeldistx,-origin_pixeldisty,0,0);
		//p.ellipse(toquex-width/2,toquey-height/2,10,10);



	}
}








