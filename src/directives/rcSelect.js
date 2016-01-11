angular.module("rc")

    .directive('rcSelect', function ($timeout) {

        var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;

        return {
            restrict: 'E',
            require: ['?name', '?ngModel'],
            replace: true,
            transclude: true,
            template: '<select ng-transclude></select>',
            scope: {
                init: "&rcInit",
            },
            link: function (scope, element, attrs, controlls) {

                var name = attrs['name'];
                var ngModel = controlls[1];
                var ngOptions = attrs['ngOptions'];

                var actor = new actorjs.components.SelectComponent(name);
                var actorRef = scope.$parent.actorRef.context.actorOf(actor, name);
                scope.actorRef = actorRef;

                actor.events.onInit = function (restart) {

                    if (!restart) {
                        var init = scope.init()
                        if (init) {
                            scope.$apply(function () {
                                init();
                            });
                        }

                        if (ngOptions) {
                            var match = ngOptions.match(NG_OPTIONS_REGEXP);
                            var data = scope.$parent[match[8]]
                            actorRef.tell({data: data});
                        }

                        var options = []
                        for (var i = 0; i < element[0].children.length; i++) {
                            var value = element[0].children[i].value;
                            if (!/(\?.)(.*)(.\?)/.test(value) && "?" !== value) {
                                var option = {
                                    value: value,
                                    label: element[0].children[i].innerHTML
                                };
                                options.push(option);
                            }
                        }
                        actorRef.tell({"options": options});

                        if (element.val() && !/(\?.)(.*)(.\?)/.test(element.val()) && "?" !== element.val())
                            actorRef.tell({"value": element.val()});
                    }

                    if (restart) {
                        element.empty();
                        actor.options.forEach(function (item) {
                            var option = document.createElement('option');
                            option.value = item.value;
                            option.innerHTML = item.label;
                            element.append(option);
                        });

                        element.val(actor.value);
                        findValue(actor.value, function (value) {
                            ngModel.$setViewValue(value);
                        });


                    }
                }


                // Listen for change events to enable binding
                element.bind('change', function (event) {
                   findValue(element.val(), function (value) {
                        ngModel.$setViewValue(value);
                    })
                    actorRef.tell({"value": element.val()});


                });

                function findValue(value, cb) {
                    if (actor.data) {
                        actor.data.forEach(function (item) {
                            if (item.$$hashKey == value) {
                                cb(item)
                            }
                        });
                    } else {
                        cb(value)
                    }

                }
            }
        }


    });