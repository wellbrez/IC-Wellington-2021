function atualizarUI()
{
    for (let poligono of poligonos)
    {
        poligono.atualizarPropriedades();
        if (!poligono.isValid)
        {
            pontosDoNucleoCentral = [];
        }
        else
        {
            poligono.cor
        }
    }


	envoltoria = calcularEnvoltoria();
	desenharEnvoltoria(envoltoria);
    atualizarMenuPoligonos();
}