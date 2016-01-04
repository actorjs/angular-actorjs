angular.module("rc", [])

    .directive('rcInput', function () {
        return {
            restrict: 'E',
            require: ['?name', '?ngModel'],
            replace: true,
            template: '<input />',
            scope: {},
            link: function (scope, element, attrs, controlls) {
                var name = attrs['name'];
                var ngModel = controlls[1];

                var inputActor = new actorjs.components.InputComponent(name);

                inputActor.events.onchange = function (value) {
                    if (!inputActor.ready) {
                        console.log("Value", value);
                        ngModel.$setViewValue(value);
                        ngModel.$render()
                    }
                };

                scope.actorRef = scope.$parent.actorRef.context.actorOf(inputActor, name);

                // Listen for change events to enable binding
                element.bind('keyup change', function (event) {
                    scope.$apply(function () {
                        if (inputActor.ready) {
                            scope.actorRef.tell({"value": element[0].value});
                        }
                    });

                });
            }
        }
    })


    .directive('contenteditable', function () {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            scope: {},
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel)
                    return; // do nothing if no ng-model

                // Specify how UI should be updated
                ngModel.$render = function () {
                    element.html(ngModel.$viewValue || '');
                };

                // Listen for change events to enable binding
                element.bind('blur keyup change', function () {
                    scope.$apply(read);
                });
                read(); // initialize

                // Write data to the model
                function read() {
                    ngModel.$setViewValue(element.html());
                }
            }
        };
    });