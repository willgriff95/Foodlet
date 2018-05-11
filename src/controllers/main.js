MainCtrl.$inject = ['$rootScope','$timeout', '$transitions', '$auth', '$state'];

function MainCtrl($rootScope, $timeout, $transitions, $auth, $state){

  // this.ModalIsOpen = false;

  this.isAuthenticated = $auth.isAuthenticated;

  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


  // flash messages
  this.flashMessage = null;
  $rootScope.$on('flashMessage', (e, data) => {
    this.flashMessage = data;
    $timeout(() => this.flashMessage = null, 10000000);
  });

  $rootScope.$on('loggedIn', (e, data) => {
    this.currentUser = data;
    localStorage.setItem('currentUser', JSON.stringify(data));
  });


  // navbar function

  // $transitions.onSuccess({}, (transition) => {
  //   this.isHome = (transition.to().name === 'home');
  //   this.navBarIsOpen = false;
  // });
  //
  // function toggleNav(){
  //   console.log('clicked!');
  //   this.navBarIsOpen = !this.navBarIsOpen;
  // }


  // logout function

  function logout(){
    $auth.logout();
    $state.go('home');
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }


  // modal function

  // $event.onClick({}, (event) => {
  //   this.ModalIsOpen = false;
  // });
  //
  // function toggleModalClass(){
  //   this.ModalIsOpen = !this.ModalIsOpen;
  // }

  // this.toggleNav = toggleNav;
  this.logout = logout;

}

export default MainCtrl;
