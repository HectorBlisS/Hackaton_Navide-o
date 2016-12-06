(function(){
	var patrocinador ={

		templateUrl : 'app/components/patrocinador/patrocinador.html',
		controller:patrocinadorController
	}

	function patrocinadorController($scope, $firebaseArray){

		var ref = database().ref().child("patrocinadores");

		$scope.pat = $firebaseArray(ref);

		var nombre = $('#nombre').val();
		var empresa = $('#empresa').val();
		var correo = $('#correo').val();
		var telefono = $('#telefono').val();
		var texto = $('#texto').val();


	}

	angular
		.module('lol')
		.component('patrocinadorComponent', patrocinador);

})()