module.exports = {


    core: {
        ActorSystem: require("actorjs-core").ActorSystem,
        ActorMatchers: require("actorjs-core").ActorMatchers,
        ActorMessages: require("actorjs-core").ActorMessages
    },
    bus: {
        EventBus: require("actorjs-bus").EventBus
    },
    persist: {
        PersistStorage: require("actorjs-persist").PersistStorage,
        PersistXMLHttp: require("actorjs-persist").PersistXMLHttp
    },
    components: {
        InputComponent: require("./src/InputComponent"),
        SelectComponent: require("./src/SelectComponent"),
        ValidationComponent: require("./src/ValidationComponent")
    }

}