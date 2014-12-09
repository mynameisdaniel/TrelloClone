TrelloClone.Collections.Lists = Backbone.Collection.extend({
	
	initialize: function(modelArr, options){
		this.board = options.board;
	},
	
	comparator: 'ord',
	
	model: TrelloClone.Models.List,
		
})
