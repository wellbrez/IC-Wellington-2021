function atualizarUI()
{
    for (let poligono of poligonos)
    {
        poligono.atualizarArea();
    }

	envoltoria = calcularEnvoltoria();
	desenharEnvoltoria(envoltoria);

    atualizarMenuPoligonos();

}