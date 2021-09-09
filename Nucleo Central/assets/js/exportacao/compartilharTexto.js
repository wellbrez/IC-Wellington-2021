function gerar_arquivo()
{
    //string_final = JSON.stringify(poligonos).replace(",",",\n")
    let conteudoDoArquivo = encode();
    conteudoDoArquivo = conteudoDoArquivo.replaceAll(";",";\r\n");
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