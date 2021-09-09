let filestring;

function decode(dadosCompactados) {
  if (dadosCompactados) {
    dadosCompactados = decodeURI(dadosCompactados);
    const dadosEmString = dadosCompactados;
    const dadosSeparados = dadosEmString.split(";");

    let indicePoligono = 0;
    let indiceDados = 0;
    while (indiceDados < dadosSeparados.length) {
      let [nome, qtdPontos] = [
        dadosSeparados[indiceDados],
        dadosSeparados[indiceDados + 1],
      ];

      poligonos.push(new Polygon());

      poligonos[indicePoligono].nome = nome;
      selecionar(indicePoligono);

      qtdPontos = Number(qtdPontos);

      indiceDados += 2;

      for (let ipt = 0; ipt < qtdPontos; ipt++) {
        let x = Number(dadosSeparados[indiceDados]);
        let y = Number(dadosSeparados[indiceDados + 1]);
        let ptTemporario = new ponto(x, y);
        poligonos[indicePoligono].pontos.push(ptTemporario);
        indiceDados += 2;
      }
      indicePoligono++;
      atualizarUI();
    }
  } else {
    window.alert("Selecione um arquivo válido antes de clicar em importar");
    window.console.error(
      "A funcao decode foi chamada para uma string indefinida."
    );
  }
}

function carregarImportacaoInicial() {
  const link = location.href;
  let informacao = "";
  if (link.search("#") != -1) {
    informacao = link.split("#")[1];
  } else {
    informacao = link.split("?")[1];
  }
  let informacaoLocal = window.localStorage.getItem("lastsave");

  if (informacao) {
    decode(informacao);
  } else if (informacaoLocal) {
    decode(informacaoLocal);
  } else {
    poligonos.push(new Polygon());
  }
  atualizarUI();
}
