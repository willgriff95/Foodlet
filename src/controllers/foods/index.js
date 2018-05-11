FoodsIndexCtrl.$inject = ['Food'];

function FoodsIndexCtrl(Food){
  this.all = [];

  Food
    .find()
    .then(res => {
      const filter = res.data.filter(food =>{
        if(food.active){
          return food;
        }
      });
      res.data = filter;
      this.all = res.data;
    });
}

export default FoodsIndexCtrl;
