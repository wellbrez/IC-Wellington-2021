function armazenarNoNavegador()
{
    //window.localStorage.setItem('lastsave', JSON.stringify(poligonos));
    window.localStorage.setItem('lastsave', encode());
    //location.href = "https://wellbrez.github.io/IC-Wellington-2021/Plano%20Cartesiano/Index.html";
    //location.href = "file:///F:/Desktop/IC%202021%20RODRIGO/Plano%20Cartesiano/Index.html";
    alert("Poligonos salvos no navegador");
}