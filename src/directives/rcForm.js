angular.module("rc")

    .directive('rcForm', function ($timeout) {

        return {
            restrict: 'E',
            require: ['?name'],
            replace: true,
            transclude: true,
            template: '<form></form>',
            scope: true,
            link: {
                pre: function (scope, element, attrs, controlls, transclude) {


                    var name = attrs['name'];

                    var actor = new actorjs.components.FormComponent(name);
                    var actorRef = scope.actorRef.context.actorOf(actor, name);
                    scope.actorRef = actorRef;
                    scope.test = 1234;

                    transclude(scope, function(clone){
                        element.append(clone)
                    });

                    actor.events.onInit = function (restart) {



                    },

                    actor.events.onInit = function (restart) {



                    }
                }
            }
        }


    });