exports.definition = {
	config: {
		columns: {
		    "number": "int",
		    "width" : "int",
		    "visible": "bool"
		},
		"defaults": {
            "number": 0,
            "width" : 0,
		    "visible": false
        },
		adapter: {
			type: "properties",
			collection_name: "badge"
		}
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});
		
		return Model;
	},
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});
		
		return Collection;
	}
}

