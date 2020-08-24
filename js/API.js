class API {
	async obtenerDatos() {
		const total = 1000;
		const datos = await fetch(
			`https://api.datos.gob.mx/v2/precio.gasolina.publico?pageSize=${total}`,
		);

		const resDatos = await datos.json();

		return resDatos;
	}
}
