exports.definition = {
    config: {
        columns: {
            owner: "INTEGER",
            uid: "INTEGER",
            avatar: "TEXT",
            domain_name: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "friend"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            validate: function(attrs) {
                for (var key in attrs) {
                    var value = attrs[key];
                    if ("uid" === key && 0 >= value.length) return "Error: No uid!";
                    if ("domain_name" === key && 0 >= value.length) return "Error: No domain_name!";
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

model = Alloy.M("friend", exports.definition, []);

collection = Alloy.C("friend", exports.definition, model);

exports.Model = model;

exports.Collection = collection;