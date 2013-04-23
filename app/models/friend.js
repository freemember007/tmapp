exports.definition = {
	config: {
		columns: {
			"owner" : "INTEGER",
			"uid": "INTEGER",
		    "avatar": "TEXT",
		    "domain_name": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "friend",
		}
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			validate: function (attrs) {
    	        for (var key in attrs) {
                    var value = attrs[key];
                    if (key === "uid") {
                        if (value.length <= 0) {
                            return "Error: No uid!";
                        }
                    }
                    if (key === "domain_name") {
                        if (value.length <= 0) {
                            return "Error: No domain_name!";
                        }	
                    }	
                }
            },
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

