imageUpload.$inject = ['filepickerService'];
function imageUpload(filepickerService) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: (scope, element, attrs, model) => {
      element.bind('click', (e) => {
        e.preventDefault();

        filepickerService
          .pick({
            accept: 'image/*',
            maxFiles: 1,
            transformations: { crop: { force: true, aspectRatio: 4/4  } }
          }, (data) => {
            console.log(data);
            data.url;
            model.$setViewValue(data.url);
          });
      });
    }
  };
}

export default imageUpload;
