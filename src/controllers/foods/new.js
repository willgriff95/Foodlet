FoodsNewCtrl.$inject = ['Food', '$state'];

function FoodsNewCtrl(Food, $state){
  this.food = {};

  function handleCreate(){
    console.log(this.form);
    if(this.form.$invalid) return false;
    Food.create(this.food)
      .then(() => $state.go('foodsIndex'));
  }

  function updateLocation(location){
    console.log('updating location...');
    this.food.location = location;
    console.log(this);
  }

  function isDanger(field){
    return (this.form[field].$touched || this.form.$submitted) & this.form[field].$error.required;
  }

  this.handleCreate = handleCreate;
  this.updateLocation = updateLocation;
  this.isDanger = isDanger;
}

export default FoodsNewCtrl;
