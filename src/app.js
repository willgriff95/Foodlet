import angular from 'angular';

//styles
import './scss/style.scss';

//3rd-party dependencies:
import '@uirouter/angularjs';
import 'satellizer';

//our configs
import Router from './config/router';
import Auth from './config/auth';

//our controllers
import FoodsIndexCtrl from './controllers/foods/index';
import FoodsNewCtrl from './controllers/foods/new';
import FoodsShowCtrl from './controllers/foods/show';
import FoodsEditCtrl from './controllers/foods/edit';
import UsersShowCtrl from './controllers/users/show';
import MainCtrl from './controllers/main';

import LoginCtrl from './controllers/auth/login';
import RegisterCtrl from './controllers/auth/register';

//models
import Food from './models/food';

//directives
import gMap from './directives/gMap';
import gAutocomplete from './directives/gAutocomplete';


angular.module('foodlet', ['ui.router', 'satellizer'])//syntax has to be looked up for each 3rd party module. Can't guess it.
  .config(Router)
  .config(Auth)
  .controller('MainCtrl', MainCtrl)
  .controller('FoodsIndexCtrl', FoodsIndexCtrl)
  .controller('FoodsNewCtrl', FoodsNewCtrl)
  .controller('FoodsShowCtrl', FoodsShowCtrl)
  .controller('FoodsEditCtrl', FoodsEditCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('LoginCtrl', LoginCtrl)
  .controller('RegisterCtrl', RegisterCtrl)
  .service('Food', Food)
  .directive('gMap', gMap)
  .directive('gAutocomplete', gAutocomplete);
