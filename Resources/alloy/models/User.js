exports.definition = {
    config: {
        columns: {
            email: "text",
            password: "text",
            id: "integer"
        },
        adapter: {
            type: "properties",
            collection_name: "user"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            validate: function(attrs) {
                for (var key in attrs) {
                    var value = attrs[key];
                    if ("email" === key && 0 >= value.length) return "Error: No email!";
                    if ("password" === key && 0 >= value.length) return "Error: No password!";
                }
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("user", exports.definition, []);

collection = Alloy.C("user", exports.definition, model);

exports.Model = model;

exports.Collection = collection;