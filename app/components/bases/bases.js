(function(){
	var bases ={

		templateUrl : 'app/components/bases/bases.html',
		controller:basesController
	}

	function basesController(){

	}

	angular
		.module('lol')
		.component('basesComponent', bases);

})()
