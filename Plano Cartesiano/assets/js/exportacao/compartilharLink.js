function gerarCodigo(Link)
{
    let codigoDeCompartilhamento = encode();
    //let codigoEmLink = `file:///F:/Desktop/IC%202021%20RODRIGO/Plano%20Cartesiano/Index.html#${codigoDeCompartilhamento}`;
    let codigoEmLink = `https://wellbrez.github.io/IC-Wellington-2021/Plano%20Cartesiano/Index.html#${codigoDeCompartilhamento}`
  
    
    if(Link == undefined)
    {
        document.getElementById("compartlink").value = codigoEmLink;
        toggleLinkJanela();
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
