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

        $scope.init2 = function(){
            console.log("init2");
            $scope.list2 = [
                {id:123, name:"Willem"},
                {id:456, name:"Bart"},
                {id:789, name:"Chris"}
            ];
        }

        $scope.init3 = function(){
            console.log("init3");
            $scope.list3 = [
                {id:123, name:"Willem"},
                {id:456, name:"Bart"},
                {id:789, name:"Chris"}
            ];
        }

        $scope.init4 = function(){
            console.log("init4");
            $scope.list4 = [
                {id:123, name:"Willem"},
                {id:456, name:"Bart"},
                {id:789, name:"Chris"}
            ];
            $scope.select4 = $scope.list4[2];
        }

    });