(function(){
	var patrocinador ={

		templateUrl : 'app/components/patrocinador/patrocinador.html',
		controller:patrocinadorController
	}


	function patrocinadorController($scope, $firebaseArray){

		var ref = firebase.database().ref().child("patrocinadores");

		$scope.pat = $firebaseArray(ref);

		

		$scope.addMessage = function() {
		    $scope.pat.$add({
		    	name: $scope.nombre,
		    	emp: $scope.empresa,
		    	email: $scope.correo,
		    	tel: $scope.telefono,
		    	text: $scope.texto
		    });
		  };


	
		$("#particles-js").css("z-index", "none");

	}

	angular
		.module('lol')
		.component('patrocinadorComponent', patrocinador);

})()