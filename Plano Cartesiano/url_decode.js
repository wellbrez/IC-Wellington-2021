informacao = location.href.split("#")[1];
pontos_pre_carregados_em_string = informacao.split(";");
pontos_pre_carregados = [];
for(const ponto_pre_carregado of pontos_pre_carregados_em_string)
{
	pontos_pre_carregados.push(parseFloat(ponto_pre_carregado));
}