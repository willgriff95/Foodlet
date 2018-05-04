secureState.$inject = ['$q', '$auth', '$state'];
function secureState($q, $auth, $state){
  return new $q((resolve) =>{
    if($auth.isAuthenticated()) return resolve();
    $state.go('login');
  });
}


Router.$inject = ['$stateProvider', '$urlRouterProvider'];

function Router($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html'
    })
    .state('foodsIndex', {
      url: '/foods',
      templateUrl: 'views/foods/index.html',
      controller: 'FilmsIndexCtrl as foodsIndex',
      resolve: { secureState }
    })
    .state('foodsNew', {
      url: '/foods/new',
      templateUrl: 'views/foods/new.html',
      controller: 'FilmsNewCtrl as foodsNew',
      resolve: { secureState }
    })
    .state('foodsShow', {
      url: '/foods/:id',
      templateUrl: 'views/foods/show.html',
      controller: 'FilmsShowCtrl as foodsShow',
      resolve: { secureState }
    })
    .state('foodsEdit', {
      url: '/foods/:id/edit',
      templateUrl: 'views/foods/edit.html',
      controller: 'FilmsEditCtrl as foodsEdit',
      resolve: { secureState }

    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/auth/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/auth/register.html',
      controller: 'RegisterCtrl as register'
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;
