Auth.$inject = ['$authProvider'];

function Auth($authProvider){
  $authProvider.loginUrl = '/api/login';
  $authProvider.signupUrl = '/api/register';


  $authProvider.github({
    clientId: '2ddcde4b5519aabdae44',
    url: '/api/github'
  });
}



export default Auth;
