FoodsIndexCtrl.$inject = ['Food'];

function FoodsIndexCtrl(Food){
  this.all = [];

  Food
    .find()
    .then(res => {
      const filter = res.data.map(food =>{
        if(food.active === true){
          return food;
        }
      });
      res.data = filter;
    })
    .then(res => this.all = res.data);
}

export default FoodsIndexCtrl;
