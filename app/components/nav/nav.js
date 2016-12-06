(function(){


	var nav ={

		templateUrl : 'app/components/nav/nav.html',
		controller:navController
	}

	function navController($scope,$http,$firebaseAuth,$location){
		
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

        $scope.logIn = function(){
          $scope.authObj.$signInWithPopup("facebook")
          .then(function(result) {
            $scope.user = result.user;
            $location.path('/profile');
            // console.log($scope.user)
            // window.location.reload();

            //Guardamos al usuario:
            var usuarios = $firebaseArray(ref);
            ref.child($scope.user.uid).update({
              displayName:$scope.user.displayName,
              email:$scope.user.email,
              photoURL:$scope.user.photoURL,
              uid:$scope.user.uid
            })
            .then(function(){
              console.log('segun si');
            });
        
        });
        }

        $scope.menusito = function(){
          $('.mini-menu').slideToggle();
          $.apply;
        }

	} //controller

	angular
	.module('lol')
	.component('navComponent',nav);

})()