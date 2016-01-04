angular.module("rc")

    .directive('rcSelect', function ($timeout) {

        var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;


        return {
            restrict: 'E',
            require: ['?name', '?ngModel'],
            replace: true,
            transclude: true,
            template: '<select ng-transclude></select>',
            priority: 100,
            scope: {
                init: "&rcInit",
            },
            link: function (scope, element, attrs, controlls) {
                console.log(scope)
                var name = attrs['name'];
                var ngModel = controlls[1];
                var ngOptions = attrs['ngOptions'];

                //console.log("ngOptions", scope.options)

                var actor = new actorjs.components.SelectComponent(name);
                var actorRef = scope.$parent.actorRef.context.actorOf(actor, name);
                scope.actorRef = actorRef;

                actor.events.onInit = function () {
                    var init = scope.init()
                    if (init) {
                        scope.$apply(function () {
                            init();
                        });
                    }

                    if(ngOptions){
                        console.log("NGOPTIONS", ngOptions)
                        var match = ngOptions.match(NG_OPTIONS_REGEXP);
                        console.log("NGOPTIONS", match[8], scope.$parent[match[8]])
                    }

                    var options = []
                    for (var i = 0; i < element[0].children.length; i++) {
                        var option = {
                            value: element[0].children[i].value,
                            label: element[0].children[i].innerHTML
                        };
                        if (option.value !== "?")
                            options.push(option);
                    }
                    actorRef.tell({"options": options});

                };

                actor.events.onStart = function (options) {

                    var value = null;

                    element[0].innerHTML = "";
                    actor.options.forEach(function (item) {
                        var option = document.createElement('option');
                        option.value = item.value;
                        option.innerHTML = item.label;
                        element[0].appendChild(option);

                    });

                    ngModel.$setViewValue(actor.value);
                    ngModel.$render();

                    element.val(actor.value);

                };





                // Listen for change events to enable binding
                element.bind('change', function (event) {

                    if (actor.ready) {
                        actorRef.tell({"value": element.val()});
                    }


                });
            }
        }
    })
;