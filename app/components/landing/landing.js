(function(){


	var landing ={

		templateUrl : 'app/components/landing/landing.html',
		controller:landingController
	}

	function landingController($scope,$http,$firebaseAuth,$firebaseArray,$location, $firebaseObject){
		//particulas estorbosas
    

		 //Inicio de sesión BLISS
        $scope.authObj = $firebaseAuth();
        $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
          if (firebaseUser) {
            $scope.user = firebaseUser;
            console.log($scope.user);
          } else {
            console.log("Signed out");
          }
        });

        //Referencia
        var ref = firebase.database().ref('usuarios');


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
            // usuarios.$add($scope.user)
            // .then(function(ref) {
            //   var id = ref.key;
            //   console.log("added record with id " + id);
          //   //   console.log(usuarios.$indexFor(id)); // returns location in the array
          //   });


          // }).catch(function(error) {
          //   console.error("Authentication failed:", error);
          // });
        });
        }


        $scope.logOut = function(){
          $scope.authObj.$signOut()
          .then(function(result) {
            $scope.user = null;
          });
        }

        var refclan = firebase.database().ref('clanes');
        var clanes = {};
        $scope.clanes = $firebaseArray(refclan);
        $scope.clanes.$loaded()
        .then(function(lista){
          console.log(lista);
          clanes = lista;
        });
        
        









  } //controller


angular
	.module('lol')
	.component('landingComponent',landing);

})()