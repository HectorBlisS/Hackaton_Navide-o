(function(){


	var landing ={

		templateUrl : 'app/components/landing/landing.html',
		controller:landingController
	}

	function landingController($scope,$http,$firebaseAuth,$firebaseArray,$location){
		
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













        var landing = this;

        landing.mostrar = false
        landing.mostrar_patrocinador = false

        var fire_inscritos = $firebaseArray(firebase.database().ref('participantes'))
        var fire_patrocinadores = $firebaseArray(firebase.database().ref('patrocinadores'))

        landing.enviar = function enviar() {
            console.log("enviado")
            fire_inscritos.$add({
                "Nombre":landing.name,
                "email":landing.email
            })
            landing.mostrar = true
        }

        landing.enviar_patrocinador = function enviar() {
            console.log("enviado")
            fire_patrocinadores.$add({
                "Nombre":landing.name,
                "email":landing.email,
                "Telefono":landing.telefono,
                "Empresa":landing.empresa
            })
            landing.mostrar_patrocinador = true
        }


        /* --------------------------
          * GLOBAL VARS
          * -------------------------- */
          // The date you want to count down to
          var targetDate = new Date("2016/11/26 09:00:00");   

          // Other date related variables
          var days;
          var hrs;
          var min;
          var sec;

          /* --------------------------
          * ON DOCUMENT LOAD
          * -------------------------- */
          $(function() {
            // Calculate time until launch date
            timeToLaunch();
            // Transition the current countdown from 0 
            numberTransition('#days .number', days, 1000, 'easeOutQuad');
            numberTransition('#hours .number', hrs, 1000, 'easeOutQuad');
            numberTransition('#minutes .number', min, 1000, 'easeOutQuad');
            numberTransition('#seconds .number', sec, 1000, 'easeOutQuad');
            // Begin Countdown
            setTimeout(countDownTimer,1001);
          });

          /* --------------------------
          * FIGURE OUT THE AMOUNT OF 
            TIME LEFT BEFORE LAUNCH
          * -------------------------- */
          function timeToLaunch(){
              // Get the current date
              var currentDate = new Date();

              // Find the difference between dates
              var diff = (currentDate - targetDate)/1000;
              var diff = Math.abs(Math.floor(diff));  

              // Check number of days until target
              days = Math.floor(diff/(24*60*60));
              sec = diff - days * 24*60*60;

              // Check number of hours until target
              hrs = Math.floor(sec/(60*60));
              sec = sec - hrs * 60*60;

              // Check number of minutes until target
              min = Math.floor(sec/(60));
              sec = sec - min * 60;
          }

          /* --------------------------
          * DISPLAY THE CURRENT 
            COUNT TO LAUNCH
          * -------------------------- */
          function countDownTimer(){ 
              
              // Figure out the time to launch
              timeToLaunch();
              
              // Write to countdown component
              $( "#days .number" ).text(days);
              $( "#hours .number" ).text(hrs);
              $( "#minutes .number" ).text(min);
              $( "#seconds .number" ).text(sec);
              
              // Repeat the check every second
              setTimeout(countDownTimer,1000);
          }

          /* --------------------------
          * TRANSITION NUMBERS FROM 0
            TO CURRENT TIME UNTIL LAUNCH
          * -------------------------- */
          function numberTransition(id, endPoint, transitionDuration, transitionEase){
            // Transition numbers from 0 to the final number
            $({numberCount: $(id).text()}).animate({numberCount: endPoint}, {
                duration: transitionDuration,
                easing:transitionEase,
                step: function() {
                  $(id).text(Math.floor(this.numberCount));
                },
                complete: function() {
                  $(id).text(this.numberCount);
                }
            }); 
          };

          $('#button').click(function (){
            $('#modal-overlay').addClass('active');
            $('#modal').addClass('active');
          });
          $('#close').click(function(){
            $('#modal-overlay').removeClass('active');
            $('#modal').removeClass('active');
          });

          $('#button_patrocinio').click(function (){
            $('#modal-overlay').addClass('active');
            $('#modal_patrocinio').addClass('active');
          });
          $('#close_dos').click(function(){
            $('#modal-overlay').removeClass('active');
            $('#modal_patrocinio').removeClass('active');
          });

          $(window).scroll(function() {
          if ($(this).scrollTop() > 1){  
              $('nav').addClass("sticky");
            }
            else{
              $('nav').removeClass("sticky");
            }
          });



  } //controller


angular
	.module('lol')
	.component('landingComponent',landing);

})()