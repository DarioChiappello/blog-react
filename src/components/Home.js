import React, {Component} from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';


class Home extends Component{

	


	render(){
		var buttonString = " Blog ";
		return (
				<div id="home">
					<Slider
	        			title="Modelo de proyecto con ReactJS"
	        			btn={buttonString}
	        			size="slider-big"
	       			/>

					<div className="center">
						<div id="content">
							<h1 className="subheader">Ultimos artículos</h1>
							<Articles
								home="true"
							 />

						</div>
						<Sidebar />
					</div>
				</div>
				
				

			);
	}
}

export default Home;