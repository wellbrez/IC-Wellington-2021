document.getElementById('inputfile').addEventListener('change', function() 
{        
	var fr= new FileReader(); 
 	fr.onload=function()
 	{ 
    	filestring = fr.result
	} 
    fr.readAsText(this.files[0]); 
}) 

function importar_arquivo()
{
    polygons = [];
    local_polygons = JSON.parse(filestring.replace("\n",""));
	for (local_polygon of local_polygons)
	{
		polygons.push(new Polygon(local_polygon.nome,local_polygon.pontos));
	}
}