function atualizarUI()
{
    for (let poligono of poligonos)
    {
        poligono.atualizarPropriedades();
        if (!poligono.isValid)
        {
            pontosDoNucleoCentral = [];
        }
    }


	envoltoria = calcularEnvoltoria();
	desenharEnvoltoria(envoltoria);
    atualizarMenuPoligonos();
}