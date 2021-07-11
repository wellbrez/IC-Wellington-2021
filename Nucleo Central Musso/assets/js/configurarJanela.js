const janelaPerfilI = 
`<div id="perfilI" class="janela collapsed">
<div class=btnClose onclick='toggleJanela("#perfilI")'>Fechar Janela</div>

	<img src="icones/perfilI.png" alt="">

	<label class=labelname>Nome do poligono</label>
	<label class=label1>d</label>
	<label class=label2>bf</label>
	<label class=label3>tf</label>
	<label class=label4>tw</label>
	<label class=label5>posicao X</label>
	<label class=label6>posicao Y</label>

	<input class=inputname type="text" id="perfilIname">
	<input class=input1 type="text" id="perfilId">
	<input class=input2 type="text" id="perfilIbf">
	<input class=input3 type="text" id="perfilItf">
	<input class=input4 type="text" id="perfilItw">
	<input class=input5 type="text" id="perfilIx">
	<input class=input6 type="text" id="perfilIy">

	<button class=criarPerfil onclick="adicionarPerfilI()">Inserir</button>

</div>`;

const janelaPerfilRetangular =
`<div id="perfilRetangular" class="janela collapsed">
<div class=btnClose onclick='toggleJanela("#perfilRetangular")'>Fechar Janela</div>

	<img src="icones/perfilRetangular.png" alt="">

	<label class=labelname>Nome do poligono</label>
	<label class=label1>b</label>
	<label class=label2>h</label>
	<label class=label3>posicao X</label>
	<label class=label4>posicao Y</label>

	<input class=inputname type="text" id="perfilRname">
	<input class=input1 type="text" id="perfilRb">
	<input class=input2 type="text" id="perfilRh">
	<input class=input3 type="text" id="perfilRx">
	<input class=input4 type="text" id="perfilRy">

	<button class=criarPerfil onclick=adicionarPerfilRetangular()>Inserir</button>

</div>`;
const janelaPerfilCircular =
`<div id="perfilCircular" class="janela collapsed">
<div class=btnClose onclick='toggleJanela("#perfilCircular")'>Fechar Janela</div>

	<img src="icones/perfilCircular.png" alt="">

	<label class=labelname>Nome do poligono</label>
    <label class=label1>Aproximacao de pontos</label>
	<label class=label2>Raio</label>
	<label class=label3>Posicao X</label>
	<label class=label4>Posicao Y</label>

	<input class=inputname type="text" id="perfilCname">
    <input class=input1 type="text" id="perfilCA">
	<input class=input2 type="text" id="perfilCr">
	<input class=input3 type="text" id="perfilCx">
	<input class=input4 type="text" id="perfilCy">

	<button class=criarPerfil onclick=adicionarPerfilCircular()>Inserir</button>

</div>`;
const janelaPerfilEllipsoidal =
`<div id="perfilElipsoidal" class="janela collapsed">
<div class=btnClose onclick='toggleJanela("#perfilElipsoidal")'>Fechar Janela</div>

	<img src="icones/perfilElipsoidal.png" alt="">

	<label class=labelname>Nome do poligono</label>
    <label class=label1>Aproximacao de pontos</label>
	<label class=label2>rx</label>
    <label class=label3>ry</label>
	<label class=label4>posicao X</label>
	<label class=label5>posicao Y</label>

	<input class=inputname type="text" id="perfilEname">
    <input class=input1 type="text" id="perfilEA">
	<input class=input2 type="text" id="perfilErx">
    <input class=input3 type="text" id="perfilEry">
	<input class=input4 type="text" id="perfilEx">
	<input class=input5 type="text" id="perfilEy">

	<button class=criarPerfil onclick=adicionarPerfilElipsoidal()>Inserir</button>

</div>`;
document.body.innerHTML = 
`${document.body.innerHTML }
    ${janelaPerfilCircular }
    ${janelaPerfilRetangular }
    ${janelaPerfilEllipsoidal }
    ${janelaPerfilI }`