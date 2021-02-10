function btn_compartilhar()
{
    
    divcompartilhar = document.getElementById("compartilhamento");
    btn_exportar = document.getElementById("botao_compartilhar");
    if(divcompartilhar.style.maxHeight == "100%")
    {
        divcompartilhar.style.maxHeight = "0%";
        btn_exportar.innerHTML = "Exportar"
        btn_exportar.style.maxWidth = "100%";
        btn_exportar.style.padding = "2vw";

        document.getElementById("botao_limpar").classList.remove("hidden");

    }
    else
    {
        divcompartilhar.style.maxHeight = "100%";
        btn_exportar.innerHTML="X";
        btn_exportar.style.maxWidth = "4vw";
        btn_exportar.style.padding = "1vw";

        document.getElementById("botao_limpar").classList.add("hidden");
    }
}
function limpar_tela()
{
    polygons = [new Polygon()];
}