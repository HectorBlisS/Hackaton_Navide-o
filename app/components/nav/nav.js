(function(){


	var nav ={

		templateUrl : 'app/components/nav/nav.html',
		controller:navController
	}

	function navController($scope,$http,$firebaseAuth,$location,$firebaseArray){
		//referencia ala base
    var ref = firebase.database().ref('usuarios');

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
              $location.path('/profile');
            });
        
        });
        }

        $scope.menusito = function(){
          $('.mini-menu').slideToggle();
          $.apply;
        }

        $scope.ham = function(){
          $('#botons').removeClass('pull-left');
          $('#botons').slideToggle();
          $.apply;
        }

        // $('#botons').on('click',function(){
        //   $('#botons').slideToggle();
        // });



	} //controller

	angular
	.module('lol')
	.component('navComponent',nav);

})()