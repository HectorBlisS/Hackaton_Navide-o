(function(){


	var nav ={

		templateUrl : 'app/components/nav/nav.html',
		controller:navController
	}

	function navController($scope,$http,$firebaseAuth){
		
	//Inicio de sesión BLISS
        $scope.authObj = $firebaseAuth();
        $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
          if (firebaseUser) {
            $scope.user = firebaseUser;
          } else {
            console.log("Signed out");
          }
        });

        $scope.logOut = function(){
          $scope.authObj.$signOut()
          .then(function(result) {
            $scope.user = null;
            window.location.reload();
          });
        }

	} //controller

	angular
	.module('lol')
	.component('navComponent',nav);

})()