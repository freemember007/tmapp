exports.definition = {
    config: {
        columns: {
            number: "int",
            width: "int",
            visible: "bool"
        },
        defaults: {
            number: 0,
            width: 0,
            visible: !1
        },
        adapter: {
            type: "properties",
            collection_name: "badge"
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

model = Alloy.M("badge", exports.definition, []);

collection = Alloy.C("badge", exports.definition, model);

exports.Model = model;

exports.Collection = collection;