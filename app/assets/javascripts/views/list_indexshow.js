TrelloClone.Views.ListIndexShow = Backbone.View.extend({
	
	intialize: function(){
		this.listenTo(this.model, "sync remove", this.render)
	},
	
	className: 'card-show',
	tagName:'li',
	
	events: {
		"click button":"deleteCard"
	},
	

	deleteCard: function(){
		event.preventDefault();
		var $currentTarget = $(event.currentTarget);
		this.model.destroy();
		this.remove();
	},
	
	template: JST["lists/indexShow"],
			
	render: function(){
		this.$el.html(this.template({card:this.model}));
		return this;
	}
	

});