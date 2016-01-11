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

                var actor = new actorjs.components.InputComponent(name);
                actor.events.onInit = function (restart) {
                    if (restart) {
                        ngModel.$setViewValue(actor.value);
                        ngModel.$render();
                    }
                };

                var actorRef = scope.$parent.actorRef.context.actorOf(actor, name);
                scope.actorRef = actorRef;

                element.bind('keyup change', function () {
                    scope.actorRef.tell({"value": element.val()});
                    scope.$apply();
                });
            }
        }
    });