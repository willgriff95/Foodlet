FoodsIndexCtrl.$inject = ['Food', '$http'];

function FoodsIndexCtrl(Food){
  this.all = [];

  Food.find()
    .then(res => this.all = res.data);

  // function showUser(id, $http){
  //   this.user = {};
  //   $http
  //     .get(`/api/users/${id}`)
  //     .then(res => this.user = res.data);
  // }
  // this.showUser = showUser;
}

export default FoodsIndexCtrl;
