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
        FormComponent: require("actorjs-components").FormComponent,
        InputComponent: require("actorjs-components").InputComponent,
        SelectComponent: require("actorjs-components").SelectComponent,
        ValidationComponent: require("actorjs-components").ValidationComponent
    }
};