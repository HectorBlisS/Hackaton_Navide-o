(function(){


	var profile ={

		templateUrl : 'app/components/profile/profile.html',
		controller:profileController
	}

	function profileController($scope,$http,$firebaseAuth,$firebaseArray,$firebaseObject){
		// Variables
		//Referencia
        var ref = firebase.database().ref('clanes');
        var users = firebase.database().ref('usuarios');
        var invita = firebase.database().ref('invitaciones');
		$scope.clan = {}
		var clanes = $firebaseArray(ref);
		var usuarios = $firebaseArray(users);
		var invitaciones = $firebaseArray(invita);
		$scope.perfil = null;
		$scope.i = [];

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

        		// Guardamos los miembros del clan
        		$scope.todoClan = clanes.$getRecord($scope.perfil.clan);
        		$scope.clan.miembro2 = $scope.todoClan.miembros[1];
        		$scope.clan.miembro3 = $scope.todoClan.miembros[2];
        		$scope.clan.miembro4 = $scope.todoClan.miembros[3];
        		$scope.clan.miembro5 = $scope.todoClan.miembros[4];


        	});
        	//Buscamos invitaciones
        	$scope.hayInvitacion();




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
				var usr = usuarios.$getRecord($scope.todoClan.miembros[1].uid);
				usr.clan = null;
				usuarios.$save(usr);
				$scope.todoClan.miembros[1] = []
				clanes.$save($scope.todoClan);

			}
			else if(miembro === 3){
				$scope.clan.miembro3 = {}
				var usr = usuarios.$getRecord($scope.todoClan.miembros[2].uid);
				usr.clan = null;
				usuarios.$save(usr);
				$scope.todoClan.miembros[2] = []
				clanes.$save($scope.todoClan);
			}
			else if(miembro === 4){
				$scope.clan.miembro4 = {}
				$scope.todoClan.miembros[3] = []
				clanes.$save($scope.todoClan);
			}
			else if(miembro === 5){
				$scope.clan.miembro5 = {}
				$scope.todoClan.miembros[4] = []
				clanes.$save($scope.todoClan);
			}
		}


		$scope.invitar = function(miembro){
			console.log(miembro);
			console.log($scope.perfil.clan);
			var invitacion ={
					invitado_uid:miembro.uid,
					invitado_displayName:miembro.displayName,
					clan:$scope.perfil.clan
			}
			invitaciones.$add(invitacion);
		}

		$scope.hayInvitacion = function(){
			invitaciones.$loaded()
			.then(function(i){
				// for (var j=0;j<i.length;j++){
				// 	console.log(i[j].invitado_displayName);
				// 	if(i[j].invitado_displayName === $scope.user.displayName){
				// 		$scope.i.push(i[j]);
				// 	}
				// }
				$scope.i = i;
			});			
		}

		$scope.noAcepto = function(inv){
			invitaciones.$remove(inv);
			console.log(inv.clan);

		}



		$scope.acepto = function(inv){
			var clan = clanes.$getRecord(inv.clan);
			console.log("Tu puto clan: ",clan);
				// if(clan.miembros[1].uid === $scope.user.uid){
				// 	console.log('Ya existe');
				// 	invitaciones.$remove(inv);
				// }else{
					clan.miembros.push({
						uid:$scope.user.uid,
						displayName:$scope.user.displayName,
						photoURL:$scope.user.photoURL});
					clanes.$save(clan);
					invitaciones.$remove(inv);
					// Agregamos su clan a su perfil
					var elUsuario = usuarios.$getRecord($scope.user.uid);
					console.log(elUsuario);
	        		elUsuario.clan = clan.nombreClan;
	        		elUsuario.capitan = false;
	        		usuarios.$save(elUsuario);
	        		window.location.reload();

				// }
				
				// clanes.$save(clan);

				console.log(clanes);
			// }
			// invitaciones.$remove(inv);


		}



        
        

        

        $scope.creaClan = function(){
        	// comprobamos que no exista:
        	var existe = clanes.$getRecord($scope.clan.nombre);
        	if (existe === null){
        		ref.child($scope.clan.nombre).set({
        		nombreClan:$scope.clan.nombre,
        		capitan:$scope.user.uid,
        		capitanNombre:$scope.user.displayName,
        		miembros:[{	uid:$scope.user.uid,
							displayName:$scope.user.displayName,
							photoURL:$scope.user.photoURL}],
				activo:false
        	});
        		var elUsuario = usuarios.$getRecord($scope.user.uid);
        		elUsuario.clan = $scope.clan.nombre;
        		elUsuario.capitan = true;
        		usuarios.$save(elUsuario);
        		window.location.reload();

        	}else{
        		$scope.existe = true;
        	}



        	
        }



$('#btn-pagar').click(function (){
            $('#modal-overlay').addClass('active');
            $('#modal_pagar').addClass('active');
          });
          $('#close').click(function(){
            $('#modal-overlay').removeClass('active');
            $('#modal_pagar').removeClass('active');
          });




	} //controller

	angular
	.module('lol')
	.component('profileComponent',profile);

})()