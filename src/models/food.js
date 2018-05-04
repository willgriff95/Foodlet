Food.$inject = ['$http'];

function Food($http){
  function find(){
    return $http.get('/api/foods');
  }

  function findById(id){
    return $http.get(`/api/foods/${id}`);
  }

  function removeById(id){
    return $http.delete(`/api/foods/${id}`);
  }

  function create(data){
    return $http.post('/api/foods', data);
  }

  function updateById(id, data){
    return $http.put(`/api/foods/${id}`, data);
  }


  this.find = find;
  this.findById = findById;
  this.removeById = removeById;
  this.create = create;
  this.updateById = updateById;
}

export default Food;
