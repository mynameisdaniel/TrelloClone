TrelloClone.Views.BoardIndexShow = Backbone.View.extend({
	
	initialize: function(){
		this.listenTo( this.model, "sync", this.render)
		
	},
	
	className: "board-index-show",
	
	events:{
		"click button": "deleteBoard"
	},
	
	deleteBoard: function(event){
		event.preventDefault();
		var $currentTarget = $(event.currentTarget);
		this.model.destroy();
	},
	
	template: JST["boards/indexShow"],
	
	render: function(){
		this.$el.html(this.template({board: this.model}));
		return this;
	}
	
	
})