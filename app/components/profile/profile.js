(function(){


	var profile ={

		templateUrl : 'app/components/profile/profile.html',
		controller:profileController
	}

	function profileController($scope,$http,$firebaseAuth,$firebaseArray){
		// Variables
		//Referencia
        var ref = firebase.database().ref('clanes');
        var users = firebase.database().ref('usuarios');
		$scope.clan = {}
		var clanes = $firebaseArray(ref);
		var usuarios = $firebaseArray(users);
		$scope.perfil = null;

		$scope.isDisabled = true;

		//Inicio de sesión BLISS
        $scope.authObj = $firebaseAuth();
        $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
          if (firebaseUser) {
            $scope.user = firebaseUser;
            // Buscamos su clan
            usuarios.$loaded()
        	.then(function(p){
        		$scope.perfil = p.$getRecord($scope.user.uid);
        		if (!$scope.perfil.clan){
        			$scope.perfil = null; 
        		}
        	});
          } else {
            console.log("Signed out");
          }
        });

        $scope.selectedState = "";
		$scope.states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
		// $scope.amigos = ['Héctor','juanito','rodolfo','pedro'];
		usuarios.$loaded()
		.then(function(us){
			$scope.amigos = us;
		});
		console.log($scope.amigos);

		$scope.clearMiembro = function(miembro){
			if(miembro === 2){
				$scope.clan.miembro2 = {}
			}
			else if(miembro === 3){
				$scope.clan.miembro3 = {}
			}
			else if(miembro === 4){
				$scope.clan.miembro4 = {}
			}
			else if(miembro === 5){
				$scope.clan.miembro5 = {}
			}
		}



        
        

        

        $scope.creaClan = function(){
        	// comprobamos que no exista:
        	var existe = clanes.$getRecord($scope.clan.nombre);
        	if (existe === null){
        		ref.child($scope.clan.nombre).set({
        		nombreClan:$scope.clan.nombre,
        		capitan:$scope.user.uid,
        		capitanNombre:$scope.user.displayName
        	});
        		var elUsuario = usuarios.$getRecord($scope.user.uid);
        		elUsuario.clan = $scope.clan.nombre;
        		usuarios.$save(elUsuario);

        	}else{
        		$scope.existe = true;
        	}



        	
        }

	} //controller

	angular
	.module('lol')
	.component('profileComponent',profile);

})()