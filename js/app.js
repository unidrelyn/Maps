const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
	ui.mostrarEstablecimientos();
});

const buscador = document.querySelector('#buscar input');

buscador.addEventListener('input', () => {
	if (buscador.value.length > 3) {
		ui.buscadorSugerencias(buscador.value);
	} else {
		ui.mostrarEstablecimientos();
	}
});
