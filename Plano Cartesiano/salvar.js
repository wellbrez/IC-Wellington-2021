function gerarCodigo(Link)
{
    let codigoDeCompartilhamento = encode();
    //let codigoEmLink = `file:///F:/Desktop/IC%202021%20RODRIGO/Plano%20Cartesiano/Index.html#${codigoDeCompartilhamento}`;
    let codigoEmLink = `https://wellbrez.github.io/IC-Wellington-2021/Plano%20Cartesiano/Index.html#${codigoDeCompartilhamento}`
  
    
    if(Link == undefined)
    {
        document.getElementById("compartlink").value = codigoEmLink;
        copyText = document.getElementById("compartlink");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* Para dispositivos móveis */
        document.execCommand("copy");
        alert("Link copiado para área de transferência");
    }
    else if(Link)
    {
        return codigoEmLink;
    }
    else if (!Link)
    {
        return codigoDeCompartilhamento;
    }
}
function armazenarNoNavegador()
{
    //window.localStorage.setItem('lastsave', JSON.stringify(poligonos));
    window.localStorage.setItem('lastsave', encode());
    location.href = "https://wellbrez.github.io/IC-Wellington-2021/Plano%20Cartesiano/Index.html";
    //location.href = "file:///F:/Desktop/IC%202021%20RODRIGO/Plano%20Cartesiano/Index.html";
    alert("Poligono salvo no navegador");
}
function gerarQRCode()
{
    document.getElementById("qrcode").innerHTML = "";
    let qrcode = new QRCode("qrcode");
    qrcode.makeCode(gerarCodigo(true));

}
function gerar_arquivo()
{
    //string_final = JSON.stringify(poligonos).replace(",",",\n")
    let conteudoDoArquivo = encode();
    download("Poligonos",conteudoDoArquivo)
}

function download(nomeDoArquivo, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', nomeDoArquivo);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }