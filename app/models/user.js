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
						
			// extended functions go here

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

