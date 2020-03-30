import React, {Component} from 'react';
// importar el react router dom
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Peliculas from './components/Peliculas';

import MiComponente from './components/MiComponente';
import Error from './components/Error';

//Importar componentes

import Header from './components/Header';

import Footer from './components/Footer';

import Home from './components/Home';
import Blog from './components/Blog';
import Formulario from './components/Formulario';
import Search from './components/Search';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

class Router extends Component{

	render(){
		
		return (
				
				<BrowserRouter>
					<Header />
					
	       			
				{/* Configurar rutas y paginas   */}
				<Switch>
					
					<Route exact path="/home" component={Home} />
					<Route exact path="/" component={Home} />
					<Route exact path="/blog" component={Blog} />
					<Route exact path="/blog/articulo/:id" component={Article} />
					<Route exact path="/blog/crear" component={CreateArticle} />
					<Route exact path="/blog/editar/:id" component={EditArticle} />
					<Route exact path="/blog/busqueda/:search" component={Search} />
					<Route exact path="/redirect/:search" render={
						(props) => {
							var search = props.match.params.search;
							return (<Redirect to={'/blog/busqueda/'+search} />);
						}
					} />
					<Route exact path="/formulario" component={Formulario} />
					<Route exact path="/peliculas" component={Peliculas} />


					<Route exact path="/segunda-ruta" component={MiComponente} />

					<Route exact path="/pagina-1" render={() => (
						<React.Fragment>
							<h1>Ruta sin componente</h1>
							<MiComponente saludo="Hola"> </MiComponente>
						 </React.Fragment>
						
					)} />

					<Route exact path="/pruebas/:nombre/:apellido?" render={ (props) => {
						var nombre = props.match.params.nombre;
						var apellido = props.match.params.apellido;
						return(
							<div id="content">
								<h1 class="subheader">Pagina de Pruebas </h1>
								<h2>
									{nombre === ':nombre' && !apellido &&
										<React.Fragment>Ingrese nombre y apellido por URL o solo el nombre<br/></React.Fragment>
									}
									{nombre && !apellido &&
										<React.Fragment>Usuario: {nombre}</React.Fragment>
									}
									{nombre && apellido &&
										<React.Fragment>Usuario: {nombre} {apellido}</React.Fragment>
									}
									

								</h2>
							</div>
						);
					  }
					} />

					<Route component={Error} />

				</ Switch>
					

			        <div className="clearfix"></div>

			      	

			      	<Footer />
				</ BrowserRouter>

			);
	}
}

export default Router;