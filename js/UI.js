class UI {
	constructor() {
		this.api = new API();
		this.markers = new L.layerGroup();
		// Iniciar el mapa
		this.mapa = this.inicializarMapa();
	}

	inicializarMapa() {
		// Inicializar y obtener la propiedad del mapa
		const map = L.map('mapid').setView([19.390519, -99.3739778], 6);
		const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; ' + enlaceMapa + ' Contributors',
			maxZoom: 18,
		}).addTo(map);
		return map;
	}

	mostrarEstablecimientos() {
		this.api.obtenerDatos().then((datos) => {
			const resultado = datos.results;

			this.mostarPines(resultado);
		});
	}

	mostarPines(datos) {
		this.markers.clearLayers();

		datos.forEach((dato) => {
			const { _id, calle, regular, longitude, latitude, premium } = dato;

			const popupOpt = new L.popup().setContent(`
				<div id=${_id}>
					<p>Direccion: ${calle})</p>
					<p>Gasolina regular $ ${regular} </p>
					<p>Gasolina premium $ ${premium} </p>
				</div>`);

			const marker = new L.marker([
				parseFloat(latitude),
				parseFloat(longitude),
			]).bindPopup(popupOpt);

			this.markers.addLayer(marker);
		});

		this.markers.addTo(this.mapa);
	}

	buscadorSugerencias(sugerencia) {
		this.api.obtenerDatos().then((datos) => {
			const resultado = datos.results;
			this.filtrarSugerencias(resultado, sugerencia);
		});
	}

	filtrarSugerencias(resultado, sugerencia) {
		const filtro = resultado.filter(
			(dato) => dato.calle.indexOf(sugerencia) !== -1,
		);

		console.log(filtro);

		this.mostarPines(filtro);
	}
}
