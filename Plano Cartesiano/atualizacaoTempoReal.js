function atualizarUI()
{
    for (let poligono of polygons)
    {
        poligono.atualizar_area();
    }

	envoltoria = calcularEnvoltoria();
	desenharEnvoltoria(envoltoria);

    atualizarMenuPoligonos();

}