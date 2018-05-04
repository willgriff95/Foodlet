Film.$inject = ['$http'];

function Film($http){
  function find(){
    return $http.get('/api/films');
  }

  function findById(id){
    return $http.get(`/api/films/${id}`);
  }

  function removeById(id){
    return $http.delete(`/api/films/${id}`);
  }

  function create(data){
    return $http.post('/api/films', data);
  }

  function updateById(id, data){
    return $http.put(`/api/films/${id}`, data);
  }


  this.find = find;
  this.findById = findById;
  this.removeById = removeById;
  this.create = create;
  this.updateById = updateById;
}

export default Film;
