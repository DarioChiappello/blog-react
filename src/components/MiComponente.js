import React, {Component} from 'react';

class MiComponente extends Component{

	render(){

		let receta = {
			nombre: 'Pizza',
			ingredientes: ['Tomate', 'Queso', 'Jamón cocido'],
			calorias: 400
		}

		return(
			<div className="mi-componente">
				<h1>{receta.nombre}</h1>
				<h3>{'Calorias: '+receta.calorias}</h3>
				{this.props.saludo &&
					<h3>{this.props.saludo}</h3>
				}
				
				<ol>
				{
					receta.ingredientes.map((ingrediente, i) => {
						return(
							<li key={i}>{ingrediente}</li>
						);
					})
				}
				</ol>
				<hr/>
			</div>
			
			);
			
		
	}	
}

export default MiComponente;