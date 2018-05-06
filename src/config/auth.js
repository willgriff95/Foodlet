Auth.$inject = ['$authProvider'];

function Auth($authProvider){
  $authProvider.loginUrl = '/api/login';
  $authProvider.signupUrl = '/api/register';

  // $authProvider.twitter({
  //   clientId: '6HUsn9JKJiatTlcb8AxBGQkTV',
  //   url: '/api/twitter'
  // });

}


export default Auth;
