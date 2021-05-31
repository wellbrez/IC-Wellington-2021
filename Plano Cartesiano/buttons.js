function show_hide(id,idproprio)
{
    
    let elemento = document.getElementById(id);
    let botao = document.getElementById(idproprio);
    let navbar = document.getElementById("navbar");
    let botoes = document.getElementsByClassName("botoesnav");
    if(elemento.style.maxHeight == "100%")
    {
        elemento.style.maxHeight = "0%";
        navbar.style.marginRight = 0;
        for(btn of botoes)
        {
            btn.classList.remove("hidden");
            btn.classList.remove("ativo");
        }


    }
    else
    {
        elemento.style.maxHeight = "100%";
        navbar.style.marginRight = "-50px";
        for(btn of botoes)
        {
            btn.classList.add("hidden");
        }
        botao.classList.remove("hidden");
        botao.classList.add("ativo");

    }
}
function limpar_tela()
{
    polygons = [new Polygon()];
}