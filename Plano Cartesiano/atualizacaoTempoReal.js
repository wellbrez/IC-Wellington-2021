function atualizarUI()
{
    for (let poligono of poligonos)
    {
        poligono.atualizarPropriedades();
    }


	envoltoria = calcularEnvoltoria();
	desenharEnvoltoria(envoltoria);
    atualizarMenuPoligonos();
}