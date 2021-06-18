let poligonos = [];
let filestring;
let poligonoSelecionado = 0;

function decode(dadosCompactados)
{
	if (dadosCompactados!=undefined)
	{
		dadosCompactados = decodeURI(dadosCompactados);
		let dadosEmString = dadosCompactados;
		let dadosSeparados = dadosEmString.split(";");

		let indicePoligono=0;
		let indiceDados = 0;
		while(indiceDados<dadosSeparados.length)
		{
			poligonos.push(new Polygon());
			poligonos[indicePoligono].nome = dadosSeparados[indiceDados];
			selecionar(indicePoligono);
			indiceDados++;
			let qtdPontos = Number(dadosSeparados[indiceDados]);
			indiceDados++;
			for(let ipt=0;ipt<qtdPontos;ipt++)
			{
				let x=Number(dadosSeparados[indiceDados])
				let y=Number(dadosSeparados[indiceDados+1])
				
				let ptTemporario = new ponto(x,y,x,y,1);
				poligonos[indicePoligono].pontos.push(ptTemporario);
				indiceDados+=2;
				
			}
			indicePoligono++;
		}
	}
	else
	{
		window.alert("Selecione um arquivo válido antes de clicar em importar");
		window.console.error("A funcao decode foi chamada para uma string indefinida.");
	}
}


function carregarImportacaoInicial()
{
	let informacao = location.href.split("#")[1];

	if (informacao!=undefined)
	{
		decode(informacao);
	}
	else if (window.localStorage.getItem('lastsave')!=undefined)
	{
		decode(window.localStorage.getItem('lastsave'));
		/*local_poligonos = JSON.parse(window.localStorage.getItem('lastsave'));
		for (local_polygon of local_poligonos)
		{
			poligonos.push(new Polygon(local_polygon.nome,local_polygon.pontos));
		}*/
	}
	else
	{
		poligonos.push(new Polygon());
	}
}