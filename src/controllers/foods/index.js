FoodsIndexCtrl.$inject = ['Food', '$http'];

function FoodsIndexCtrl(Food){
  this.all = [];

  Food.find()
    .then(res => this.all = res.data);
}

export default FoodsIndexCtrl;
