exports.definition = {
	
	config: {
		"columns": {
			"email":"text",
			"password":"text",
			"id":"integer"
		},
		"adapter": {
			"type": "properties",
			"collection_name": "user"
		}
	},		

	extendModel: function(Model) {		
		_.extend(Model.prototype, {
						
			validate: function (attrs) {
    	        for (var key in attrs) {
                    var value = attrs[key];
                    if (key === "email") {
                        if (value.length <= 0) {
                            return "Error: No email!";
                        }
                    }
                    if (key === "password") {
                        if (value.length <= 0) {
                            return "Error: No password!";
                        }	
                    }	
                }
            },

		}); // end extend
		
		return Model;
	},
	
	
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			
			// extended functions go here			
			
		}); // end extend
		
		return Collection;
	}
		
}

