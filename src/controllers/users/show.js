UsersShowCtrl.$inject = ['Food', '$http', '$auth'];

function UsersShowCtrl(Food, $http, $auth){
  this.user = {};

  $http
    .get(`/api/users/${$auth.getPayload().sub}`)
    .then(res => this.user = res.data);

  function handleRequestAccept(id, requestId){
    // console.log(id);
    this.food = [];

    Food
      .findById(id)
      .then(res => {
        res.data.active = false;
        const request = res.data.requests.map(request => {
          if(request._id === requestId) return request;
        });
        request[0].status = 'accepted';
        res.data.request = request[0];
        this.food = res.data;
      })
      .then(() => {
        Food
          .requestAccept(id, this.food);
      });
  }
  this.handleRequestAccept = handleRequestAccept;
}
export default UsersShowCtrl;
