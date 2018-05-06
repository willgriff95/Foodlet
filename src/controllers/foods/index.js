FoodsIndexCtrl.$inject = ['Food'];

function FoodsIndexCtrl(Food){
  this.all = [];
  this.location = [];

  Food
    .find()
    .then(res => {
      this.all = res.data;
      res.data.forEach(food => {
        this.location.push(food.location);
      });
    });
}

export default FoodsIndexCtrl;
