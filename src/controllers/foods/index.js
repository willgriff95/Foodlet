FoodsIndexCtrl.$inject = ['Food'];

function FoodsIndexCtrl(Food){
  this.all = [];

  Food
    .find()
    .then(res => {
      const filter = res.data.map(food =>{
        // console.log(food.active);
        if(food.active){
          return food;
        }
      });
      res.data = filter;
      this.all = res.data;
      // console.log(res.data);
    });
}

export default FoodsIndexCtrl;
