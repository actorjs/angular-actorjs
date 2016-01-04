ActorJsCore = require("actorjs-core");

var matcher = ActorJsCore.ActorMatchers.KeyValueMatcher;
var message = ActorJsCore.ActorMessages.KeyValueMessage;

var SelectComponent = function (name) {

    this.id = "SelectComponent-" + name;

    this.value = null;
    this.options = null;

    this.preStart = function(){
        this.context.self.tell({"init": null});
    };

    this.events = {
        onInit: function () {
        },
        onStart: function () {
        },
        onOptions: function () {
        },
        onChange: function () {
        },
        onValidate: function () {
        }
    };

    this.validators = [];

    this.state = {
        idle: matcher({
            init: function (msg) {
                this.persist(message("init"), function(){
                    this.events.onInit();
                });

            }
        }),
        init: matcher({
            init: function (msg) {
                console.log("Already init.....................");
                this.events.onStart();
            },
            list: function (msg) {
                this.persist(message("list", msg));
            },
            options: function (msg) {
                this.persist(message("options", msg));
            },
            value: function (msg) {
                this.persist(message("value", msg));
            },
            validate: function (msg) {
                //console.log("Validate component")
            }
        })
    };

    this.receive = this.state.idle;

    this.update = matcher({
        init: function () {
            this.become(this.state.init);
        },
        options: function (msg) {
            this.options = msg;
            this.events.onOptions(msg);
        },
        value: function (msg) {
            this.context.parent.tell(message("value", msg), this)
            this.events.onChange(msg);
            this.value = msg;
        }
    });

};

module.exports = SelectComponent;
