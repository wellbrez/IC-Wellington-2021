polygons = [];
function decode()
{
	informacao = location.href.split("#")[1];

	if (informacao!=undefined)
	{
		indice=0;
		pontos_pre_carregados_em_string = informacao.split(";");
		indice_info = 0;
		while(indice_info<pontos_pre_carregados_em_string.length)
		{
			window.polygons.push(new Polygon());
			window.polygons[indice].nome = pontos_pre_carregados_em_string[indice_info];
			indice_info++;
			polsize = parseInt(pontos_pre_carregados_em_string[indice_info]);
			indice_info++;
			for(pol=0;pol<polsize;pol++)
			{
				window.polygons[indice].pontos.push(parseFloat(pontos_pre_carregados_em_string[indice_info]));
				indice_info++;
			}
			indice++;
		}
		console.log(window.polygons);
	}
	else if (window.localStorage.getItem('lastsave')!=undefined)
	{
		local_polygons = JSON.parse(window.localStorage.getItem('lastsave'));
		for (local_polygon of local_polygons)
		{
			polygons.push(new Polygon(local_polygon.nome,local_polygon.pontos));
		}
	}
	else
	{

		polygons.push(new Polygon());
	}
}