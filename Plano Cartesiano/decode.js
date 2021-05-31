let polygons = [];

function decode(dadosCompactados)
{
	dadosCompactados = decodeURI(dadosCompactados);
	console.log("Decode iniciado")
	if (dadosCompactados!=undefined)
	{
		console.log("os dados sao")
		console.log(dadosCompactados)
		let dadosEmString = descomprimir(dadosCompactados);
		console.log("os dados em string sao")
		console.log(dadosEmString)
		let indicePoligono=0;
		let dadosSeparados = dadosEmString.split(";");
		let indiceDados = 0;
		while(indiceDados<dadosSeparados.length)
		{
			polygons.push(new Polygon());
			polygons[indicePoligono].nome = dadosSeparados[indiceDados];
			indiceDados++;
			polsize = Number(dadosSeparados[indiceDados]);
			indiceDados++;
			for(pol=0;pol<polsize;pol++)
			{
				polygons[indicePoligono].pontos.push(Number(dadosSeparados[indiceDados]));
				indiceDados++;
			}
			indicePoligono++;
		}
		console.log(polygons);
	}
	else
	{
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
		/*local_polygons = JSON.parse(window.localStorage.getItem('lastsave'));
		for (local_polygon of local_polygons)
		{
			polygons.push(new Polygon(local_polygon.nome,local_polygon.pontos));
		}*/
	}
	else
	{
		polygons.push(new Polygon());
	}
}