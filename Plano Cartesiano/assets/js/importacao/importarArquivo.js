function ativarInputDeArquivo()
{
	document.getElementById('inputfile').addEventListener('change', function() 
	{
		let fr= new FileReader(); 
		fr.onload=function()
		{ 
			filestring = fr.result;
		} 
		fr.readAsText(this.files[0]); 
	}) 
}
function importar_arquivo()
{
    poligonos = [];
    decode(filestring);
}

ativarInputDeArquivo();