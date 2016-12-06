(function(){
	var patrocinador ={

		templateUrl : 'app/components/patrocinador/patrocinador.html',
		controller:patrocinadorController
	}

	function patrocinadorController(){

	}

	angular
		.module('lol')
		.component('patrocinadorComponent', patrocinador);

})()