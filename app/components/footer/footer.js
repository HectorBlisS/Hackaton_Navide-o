(function(){


	var footer ={

		templateUrl : 'app/components/footer/footer.html',
		controller:footerController
	}

	function footerController($scope,$http,$firebaseAuth,$firebaseArray,$location){
		


  } //controller


angular
	.module('lol')
	.component('footerComponent',footer);

})()