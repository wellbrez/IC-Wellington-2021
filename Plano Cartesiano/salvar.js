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
        if(i<polygons.length-1)
        {
            polygon_sufix+=";";
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
        document.getElementById("compartlink").value = "https://wellbrez.github.io/IC-Wellington-2021/Plano%20Cartesiano/Index.html#"+polygon_sufix;
        copyText = document.getElementById("compartlink");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

            /* Copy the text inside the text field */
        document.execCommand("copy");
        alert("Link copiado para área de transferência");
    }
}
function armazenar_navegador()
{
    window.localStorage.setItem('lastsave', JSON.stringify(polygons));
    location.href = "https://wellbrez.github.io/IC-Wellington-2021/Plano%20Cartesiano/Index.html";
    alert("Poligono salvo no navegador");
}
function gerar_qrcode()
{
    document.getElementById("qrcode").innerHTML = "";
    var qrcode = new QRCode("qrcode");
    qrcode.makeCode(gerar_link(true));

}
function gerar_arquivo()
{
    string_final = JSON.stringify(polygons).replace(",",",\n")
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