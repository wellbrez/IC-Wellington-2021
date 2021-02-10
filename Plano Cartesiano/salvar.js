function gerar_link(option)
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
    
    if(option==true)
    {
        return "https://wellbrez.github.io/IC-Wellington-2021/Plano%20Cartesiano/Index.html#"+polygon_sufix;
    }
    else if (option==false)
    {
        return polygon_sufix;
    }
    else
    {
        document.getElementById("compartlink").innerHTML = "https://wellbrez.github.io/IC-Wellington-2021/Plano%20Cartesiano/Index.html#"+polygon_sufix;
    
    }
}
function armazenar_navegador()
{
    window.localStorage.setItem('lastsave', JSON.stringify(polygons));
}
function gerar_qrcode()
{
    document.getElementById("qrcode").innerHTML = "";
    var qrcode = new QRCode("qrcode");
    qrcode.makeCode(gerar_link(true));

}
function gerar_arquivo()
{
    string_final = "";
    alternador = 0;
    strings_temporarias = JSON.stringify(polygons).split(',')
    for(string_temporaria of strings_temporarias)
    {
        if(alternador==0)
        {
            string_final+=string_temporaria+",\n";
            alternador = 1;
        }
        else if(alternador==1)
        {
            string_final+=string_temporaria+",";
            alternador = 0;
        }
    }
    download("Poligonos",string_final)
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }