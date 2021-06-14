let poligonos = [];
let filestring;
let poligonoSelecionado = 0;

function decode(dadosCompactados)
{
	if (dadosCompactados!=undefined)
	{
		dadosCompactados = decodeURI(dadosCompactados);
		let dadosEmString = dadosCompactados;
		let indicePoligono=0;
		let dadosSeparados = dadosEmString.split(";");
		let indiceDados = 0;
		while(indiceDados<dadosSeparados.length)
		{
			poligonos.push(new Polygon());
			poligonos[indicePoligono].nome = dadosSeparados[indiceDados];
			poligonoSelecionado = indicePoligono;
			indiceDados++;
			polsize = Number(dadosSeparados[indiceDados]);
			indiceDados++;
			for(pol=0;pol<polsize;pol++)
			{
				poligonos[indicePoligono].pontos.push(Number(dadosSeparados[indiceDados]));
				indiceDados++;
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