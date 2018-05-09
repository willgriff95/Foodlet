User.$inject = ['$http'];

function User($http){
  function find(){
    return $http.get('/api/users');
  }

  function findById(id){
    return $http.get(`/api/users/${id}`);
  }

  function removeById(id){
    return $http.delete(`/api/users/${id}`);
  }

  function create(data){
    return $http.post('/api/users', data);
  }

  function updateById(id, data){
    return $http.put(`/api/users/${id}`, data);
  }

  function requestCreate(foodId){
    return $http.post(`/api/users/${foodId}/requests`);
  }

  function requestAccept(foodId, requestId){
    return $http.put(`/api/users/${foodId}/requests/${requestId}`);
  }



  this.find = find;
  this.findById = findById;
  this.removeById = removeById;
  this.create = create;
  this.updateById = updateById;
  this.requestCreate = requestCreate;
  this.requestAccept = requestAccept;
}

export default User;
