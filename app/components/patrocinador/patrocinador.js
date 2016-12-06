(function(){
	var patrocinador ={

		templateUrl : 'app/components/patrocinador/patrocinador.html',
		controller:patrocinadorController
	}

	function patrocinadorController(){
		$("#particles-js").css("z-index", "none");

	}

	angular
		.module('lol')
		.component('patrocinadorComponent', patrocinador);

})()