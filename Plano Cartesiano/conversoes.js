//Arquivo destinado à conversão de pixels em coordenadas, e vice-versa, de acordo com a escala.

function pixelX(coordX)
{
	return -origin_pixeldistx + coordX*escalax
}
function pixelY(coordY)
{
	return -origin_pixeldisty + coordY*escalay
}
function coord_mx()
{
	return posicao_do_pixel_x(sketch.mouseX);
}
function coord_my()
{
	return posicao_do_pixel_y(sketch.mouseY);
}
function posicao_do_pixel_x(posx)
{
	return (posx-width/2)/escalax +origemX;
}
function posicao_do_pixel_y(posy)
{
	return  (posy-height/2)/escalay +origemY;
}
