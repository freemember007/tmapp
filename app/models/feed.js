exports.definition = {
	config: {
		columns: {
		    "content": "text",
		    "date": "text",
		    "image": "text",
		    "the": "integer"
		},
		adapter: {
			type: "sql",
			collection_name: "feed"
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

