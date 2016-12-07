(function(){


	var profile ={

		templateUrl : 'app/components/profile/profile.html',
		controller:profileController
	}

	function profileController($timeout,$scope,$http,$firebaseAuth,$firebaseArray,$firebaseObject){
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
        		} else{

        		// Guardamos los miembros del clan
        		$scope.todoClan = clanes.$getRecord($scope.perfil.clan);
        		$scope.clan.miembro2 = $scope.todoClan.miembros[1];
        		$scope.clan.miembro3 = $scope.todoClan.miembros[2];
        		$scope.clan.miembro4 = $scope.todoClan.miembros[3];
        		$scope.clan.miembro5 = $scope.todoClan.miembros[4];
        			}

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
			$scope.invitacion = true;
			console.log(miembro);
			console.log($scope.perfil.clan);
			var invitacion ={
					invitado_uid:miembro.uid,
					invitado_displayName:miembro.displayName,
					clan:$scope.perfil.clan
			}
			invitaciones.$add(invitacion);
			$timeout(function(){ $scope.invitacion = false; console.log('apagado') }, 5000);
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

// aqui devo validar i ya existe el usuario en clan
clan.miembros.forEach(function(elemento, index){
	console.log('Entre al for');
	console.log("miembro:",elemento);
	console.log("logueado:",$scope.user.displayName);
	if(elemento.displayName === $scope.user.displayName){
		$scope.yasta = true;
		console.log('Ya eres parte cerdo!');
	}else{
		$scope.yasta = false;
	}
});



// no agregar si supera los 5 miembros
if(clan.miembros.length < 5 && $scope.yasta === false){



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
	        		//window.location.reload();
}else {

	console.log("numero de miembros: ",clan.miembros.length);
	$scope.lleno ={};
	$scope.lleno.clan = inv.clan;
	invitaciones.$remove(inv);
	if($scope.yasta === true){
		$scope.mensaje_de_mierda = "Ya eres parte del equipo pendejo!";
	}else{
		$scope.mensaje_de_mierda = "El equipo ya está lleno";
	}
}
				// }
				
				// clanes.$save(clan);

				console.log(clanes);
			// }
			// invitaciones.$remove(inv);


		} // acepto



        
        

        

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






     

	} //controller

	angular
	.module('lol')
	.component('profileComponent',profile);

})()