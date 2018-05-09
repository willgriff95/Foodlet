UsersShowCtrl.$inject = ['Food', '$http', '$auth'];

function UsersShowCtrl(Food, $http, $auth){
  this.user = {};

  $http
    .get(`/api/users/${$auth.getPayload().sub}`)
    .then(res => this.user = res.data);

  function handleRequestAccept(id, requestId){
    // this.request = {status: 'accepted'};
    //PRETTY SURE I NEED TO CHANGE THE FOOD'S BOOLEAN TOO.
    Food
      .findById(id)
      .then(res => {
        res.data.active = false;
        res = res.data.requests.map(request => {
          if(request._id === requestId) return request;
        });
        res[0].status = 'accepted';
        // console.log(res);
      })
      .then(res => {
        Food
          .requestAccept(id, res);
      });
  }
  this.handleRequestAccept = handleRequestAccept;
}
export default UsersShowCtrl;
