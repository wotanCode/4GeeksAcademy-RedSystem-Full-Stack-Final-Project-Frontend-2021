import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../styles/app.scss";
//Componentes importados
import { Listastotal } from "../component/listastotal.js";
//react-bootstrap
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//Importamos la libreria axios previamente instalada
import axios from "axios";

const URL = "https://3001-aquamarine-junglefowl-vjqddwwz.ws-us15.gitpod.io/api/";

export const Contratos = props => {
	//Generamos primero el uso de useState
	const [contratos, setContratos] = useState([]);

	//AXIOS
	const fetchContratos = useCallback(
		async () => {
			try {
				const { data } = await axios.get(`${URL}lista_contratos`);
				// console.log("users", data.Lista_de_usuarios);
				setContratos(data.Lista_de_contratos);
			} catch (error) {
				console.error(error);
				alert("Error en la api: No se pudo recibir la lista de contratos");
			}
		},
		[setContratos]
	);

	useEffect(
		() => {
			fetchContratos();
		},
		[fetchContratos]
	);

	return (
		<div className="container">
			<ul className="list-group container-fluid mb-3">
				{contratos.length > 0 ? (
					contratos.map(contrato => (
						<Listastotal
							status="bg-warning"
							id_nombre={contrato.id_project}
							url_info={`datos_contrato/${contrato.id}`}
							textbutton2="Ordenes de trabajo"
							url_orden="ordenes"
							key={contrato.id}
						/>
					))
				) : (
					<h2>Cargando...</h2>
				)}
			</ul>

			<div className="row justify-content-md-center">
				<div className="col-md-auto ">
					<Button variant="primary">
						<Link className="text-light" to="/crear_contrato">
							Crear contrato
						</Link>
					</Button>{" "}
				</div>
			</div>
		</div>
	);
};