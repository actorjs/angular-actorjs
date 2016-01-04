module.exports = {
    entry: "./index.js",
    node: {
        fs: "empty",
        readline: "empty"
    },
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        library: "actorjs"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};