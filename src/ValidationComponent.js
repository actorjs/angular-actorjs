ActorJsCore = require("actorjs-core");

var matcher = ActorJsCore.ActorMatchers.KeyValueMatcher;
var message = ActorJsCore.ActorMessages.KeyValueMessage;

var ValidationComponent = function (name, validator) {

    //console.log("ValidationComponent");


    this.id = "ValidationComponent-" + name

    var idle = matcher({
        init: function (msg) {
            this.persist(message("init"));
            this.sender.tell(message("validate", {
                message: "Init 123"
            }), this);
        },
        validate: function (msg) {
            //console.log("Validator not inited");
        }
    });

    var init = matcher({
        init: function (msg) {
            //console.log("Validator already inited");
        },
        validate: function (msg) {

            if (msg.length % 2 < 1)
                this.sender.tell(message("validate", true), this);
            else
                this.sender.tell(message("validate", false), this);
        }
    });

    this.receive = idle;

    this.update = matcher({
        init: function () {
            //console.log("Init from input");
            this.become(init);
        }


    });


};

module.exports = ValidationComponent;
