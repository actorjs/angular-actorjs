ActorJsCore = require("actorjs-core");

var matcher = ActorJsCore.ActorMatchers.KeyValueMatcher;
var message = ActorJsCore.ActorMessages.KeyValueMessage;

var InputComponent = function (name) {

    this.id = "InputComponent-" + name;

    this.value = null;

    this.events = {
        onInit: function(){},
        onChange: function(){},
        onValidate: function(){}
    };

    this.preStart = function(){
        this.context.self.tell({"init": null});
    };

    this.validators = [];

    this.state = {

        idle: matcher({
            init: function (msg) {
                this.events.onInit(msg);
                this.persist(message("init", msg), function () {
                    this.validators.forEach(function (validator) {
                        validator.tell(message("init"), this);
                    }, this)
                });
            }
        }),

        init: matcher({
            init: function (msg) {
                //console.log("Input Already init")
            },
            validate: function (msg) {
                this.events.onvalidate(msg, this.sender.path);
            },
            value: function (msg) {
                this.persist(message("value", msg));
            }
        })
    }

    this.receive = this.state.idle;

    this.update = matcher({
        init: function (msg) {
            //console.log("Persist init");
            this.become(this.state.init);
        },
        value: function (msg) {
            this.context.parent.tell(message("value", msg), this)
            this.events.onchange(msg);
            this.value = msg;
            this.validators.forEach(function (validator) {
                validator.tell(message("validate", msg), this);
            }, this);
        }
    });

    this.init = function(){
        this.validators = this.validators.map(function (validator) {
            return this.context.actorOf(validator, "324324"   )
        }, this);
    }
}


    module.exports = InputComponent;
