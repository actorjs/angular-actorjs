angular.module('app', ['rc'])

    .controller("initController", function($log, $scope){

        var actorSystem = new actorjs.core.ActorSystem("AngularSystem");
        actorSystem.setPersistenceProvider(new actorjs.persist.PersistXMLHttp("/events"));

        var mainActor ={
            receive: function(msg){
                console.log(msg);
            }
        };

        $scope.actorRef = actorSystem.actorOf(mainActor, "main")

        $scope.list = [];

        $scope.testInit = function(){
            $scope.list = [
                {id:123, name:"Willem"},
                {id:456, name:"Bart"}
            ]
        }

    });