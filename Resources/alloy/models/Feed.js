exports.definition = {
    config: {
        columns: {
            content: "text",
            date: "text",
            image: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "feed"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("feed", exports.definition, []);

collection = Alloy.C("feed", exports.definition, model);

exports.Model = model;

exports.Collection = collection;