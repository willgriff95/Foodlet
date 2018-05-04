MainCtrl.$inject = ['$transitions', '$auth', '$state'];


function MainCtrl($transitions, $auth, $state){
  this.navBarIsOpen = false;
  this.isHome = true;

  this.isAuthenticated = $auth.isAuthenticated;

  $transitions.onSuccess({}, (transition) => {
    this.isHome = (transition.to().name === 'home');      
    this.navBarIsOpen = false;
  });

  function toggleNav(){
    console.log('clicked!');
    this.navBarIsOpen = !this.navBarIsOpen;
  }

  function logout(){
    $auth.logout();
    $state.go('home');
  }

  this.toggleNav = toggleNav;
  this.logout = logout;

}

export default MainCtrl;
