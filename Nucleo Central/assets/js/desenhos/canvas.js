function resizewindow() {
  width = document.body.getBoundingClientRect().width;
  //let width = screen.width;
  height = document.body.getBoundingClientRect().height;
  //let height = screen.height;
  window.sketch.resizeCanvas(width, height, true);
}
var sketch = function (p) {
  p.setup = function () {
    d_circle = 0;
    toquex = 0;
    toquey = 0;
    p.frameRate(60);
    eventoZoom = null;
    eventoScroll = null;
    //width = (p.windowWidth);
    //height = (p.windowHeight);
    width = document.body.getBoundingClientRect().width;
    height = document.body.getBoundingClientRect().height;
    p.cnv = p.createCanvas(width, height);

    escalax = 1;
    escalay = 1;
    iglobal = 0;

    origemX = 0;
    origemY = 0;

    origin_pixeldistx = origemX * escalax;
    origin_pixeldisty = origemY * escalay;

    intervalo = 10;
    carregarImportacaoInicial();
    let grahamScan;
    poligonos[poligonos.length - 1].selected = true;

    mostrar_area = false;

    resizewindow();
  }; /*
	p.mouseWheel = function(event)
	{
		mouseWheel(event);
	}*/
  p.draw = function () {
    p.clear();
    resizewindow();
    //distância, em pixels, da origem do plano cartesiano (atualizacao)
    origin_pixeldistx = origemX * escalax;
    origin_pixeldisty = origemY * escalay;
    //definindo cor de fundo do canvas
    p.background(corFundo);
    //translacção ao meio da tela
    p.translate(width / 2, height / 2);
    //definicao do intervalo entre eixos secundarios
    att_propriedades_canvas();

    grade(p, intervalo, "principal");
    grade(p, intervalo / 5, "secundaria");
    linhas_principais(p, corLinhasPrincipais);
    desenharPoligonos(poligonos, p, corPoligono);
    calcularEnvoltoria(poligonos, propriedadesGlobais);
    desenharEnvoltoria(propriedadesGlobais);
    desenharNC(propriedadesGlobais, p);
    eixosPrincipais(propriedadesGlobais);

    if (mostrarLN) {
      let [pols, propriedadesAreaComprimida] = LN(p);
      let temPoligonoInvalido = false;
      calcularPropriedadesConjunto(pols, propriedadesAreaComprimida);
      for (let pol of pols) {
        if (!pol.isValid) {
          temPoligonoInvalido = true;
        }
      }
      if (!temPoligonoInvalido) {
        desenharNC(propriedadesAreaComprimida);
      }
    }

    if (eventoScroll != null) {
      eventoScroll.aplicar();
    }
    if (eventoZoom != null) {
      eventoZoom.aplicar();
    }
  };
};
