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
    });