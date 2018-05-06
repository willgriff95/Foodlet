FoodsIndexCtrl.$inject = ['Food', '$http'];

function FoodsIndexCtrl(Food){
  this.all = [];
  this.location = [];

  Food.find()
    .then(res => res.data.forEach(food => {
      this.location.push(food.location);
    }))
    .then(res => this.all = res.data);
}

export default FoodsIndexCtrl;
