function gerar_link()
{
    let polygon_sufix = "";
    for(i=0;i<polygons.length;i++)
    {
        polygon_sufix+=polygons[i].nome+";"+polygons[i].pontos.length;
        for(j=0;j<polygons[i].pontos.length;j++)
        {
            polygon_sufix+= ";"+polygons[i].pontos[j]
        }
    }
    
    
    document.getElementById("compartlink").innerHTML = "https://wellbrez.github.io/IC-Wellington-2021/Plano%20Cartesiano/Index.html#"+polygon_sufix;
}
function armazenar_navegador()
{

}
function gerar_qrcode()
{

}
function gerar_arquivo()
{

}