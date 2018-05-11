secureState.$inject = ['$q', '$auth', '$state', '$rootScope'];
function secureState($q, $auth, $state, $rootScope){
  return new $q((resolve) =>{
    if($auth.isAuthenticated()) return resolve();

    $rootScope.$broadcast('flashMessage', {
      type: 'danger',
      content: 'Please log in to view this page.'
    });

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
      controller: 'FoodsIndexCtrl as foodsIndex',
      resolve: { secureState }
    })
    .state('foodsNew', {
      url: '/foods/new',
      templateUrl: 'views/foods/new.html',
      controller: 'FoodsNewCtrl as foodsNew',
      resolve: { secureState }
    })
    .state('foodsShow', {
      url: '/foods/:id',
      templateUrl: 'views/foods/show.html',
      controller: 'FoodsShowCtrl as foodsShow',
      resolve: { secureState }
    })
    .state('foodsEdit', {
      url: '/foods/:id/edit',
      templateUrl: 'views/foods/edit.html',
      controller: 'FoodsEditCtrl as foodsEdit',
      resolve: { secureState }
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'views/users/show.html',
      controller: 'UsersShowCtrl as usersShow',
      resolve: { secureState }
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: 'views/users/edit.html',
      controller: 'UsersEditCtrl as usersEdit',
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
