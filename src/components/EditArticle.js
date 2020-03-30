import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';
import ImageDefault from '../assets/images/default.png';

//1- Recoger id del artículo a editar de la url
//2- Crear metodo para sacar ese objeto del API
//3- Rellenar el formulario con esos datos
//4- Actualizar el objeto haciendo una petición al backend


class EditArticle extends Component{

	url = Global.url;
	articleId = null;

		titleRef = React.createRef();
		contentRef = React.createRef();

		//estado inicial vacio
		state = {
			article: {},
			status: null,
			selectedFile: null
		};

		componentWillMount(){
			this.articleId = this.props.match.params.id;
			this.getArticle(this.articleId);
			this.validator = new SimpleReactValidator({
				messages: {
					required: 'Este campo es obligatorio'
				}
			});
		}

		getArticle = (id) => {
			axios.get(this.url + 'article/' + id)
				 .then(res => {
				 	this.setState({
				 		article: res.data.article
				 	})
				 });
		}

		// dar contenido al titulo y texto
		changeState = () => {
			this.setState({
				article:{
					title: this.titleRef.current.value,
					content: this.contentRef.current.value,
					image: this.state.article.image
				}
			});
			this.validator.showMessages();
				this.forceUpdate();
		}

		saveArticle = (e) => {
			e.preventDefault();
			//rellenar state con datos del formulario
			this.changeState();

			if(this.validator.allValid()){
				//hacer peticion http por post para guardar el articulo (status correcto o fallido)
			axios.put(this.url+'article/'+this.articleId, this.state.article)
				.then(res => {
					if (res.data.article) {
						this.setState({
							article: res.data.article,
							status: 'waiting'
						});

						swal(
								'Artículo editado',
								'El artículo ha sido editado correctamente',
								'success'
							)

						//subir imagen
						if(this.state.selectedFile !== null){


							//sacar id del articulo
							var articleId = this.state.article._id;

							//crear form data y añadir fichero
							const formData = new FormData();
							//append -> vincula un fichero
							formData.append(
									'file0',
									this.state.selectedFile,
									this.state.selectedFile.name
								);

							//peticion ajax
							axios.post(this.url + 'upload-image/'+ articleId, formData)
								.then( res => {
									
									if (res.data.article){
										this.setState({
											article: res.data.article,
											status: 'failed' 
										});
										
										
									} else {
										this.setState({
											article: res.data.article,
											status: 'success'
										});
										
									}
								});


						} else {
							this.setState({
							status: 'success'
						});
						}
					} else {
						this.setState({
							status: 'failed'
						});
					}
				});
			}else{
				this.setState({
							status: 'failed'
						});
				this.validator.showMessages();
				this.forceUpdate();


			}

			

		}


		//subida de imagenes
		fileChange = (event) => {
			this.setState({
				selectedFile: event.target.files[0]
			});

		}


	render(){

		if(this.state.status === 'success'){
			return <Redirect to="/blog" />
		}

		var article = this.state.article;

		return(
				<div className="center">
					<section id="content">
						<h1 className="subheader">Editar artículo</h1>

						{this.state.article.title &&
							<form className="mid-form" onSubmit={this.saveArticle}>
							<div className="form-group">
								<label htmlFor="title">Titulo</label>
								<input  type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />

								{this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}

							</div>
							<div className="form-group">
								<label htmlFor="content">Contenido</label>
								<textarea name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState} ></textarea>

								{this.validator.message('content', this.state.article.content, 'required')}

							</div>
							<div className="form-group">
								<label htmlFor="file0">Imagen</label>
								<div className="image-wrap">
									{article.image !== null ? (
										<img src={this.url+'get-image/'+article.image} alt={article.title} className="thumb" />
										): (
											<img src={ImageDefault} alt={article.title} className="thumb" />
										)
									}
								</div>
								<div className="clearfix"></div>
								<input type="file" name="file0"  onChange={this.fileChange} />

							</div>

							<input type="submit" value="Guardar" className="btn btn-success"/>

						</form>
						}

						{!this.state.article.title &&
							<h1 className="subheader">Cargando...</h1>
						}


					</section>

					<Sidebar />
				</div>
			);
	}

}

export default EditArticle;