TrelloClone.Views.BoardIndex = Backbone.CompositeView.extend({
	
	className: "board-main",
	
	initialize: function(){
		this.listenTo( this.collection, "sync remove add", this.render)
	},
	
	events: {
		"submit form":"addBoard",
	    "sortupdate .board-index":"updateOrder"
	},
	
	updateOrder: function(event){
		// var $currentEvent = $(event.currentTarget);
		// var children = $currentEvent.children();
		// children.each( function(index, div){
		// 	var modelId = $(div).find('button').attr("id");
		// 	var model = this.collection.get(modelId);
		// 	console.log(index);
		// 	model.set("ord", index);
		// 	model.save();
		// }.bind(this))
	},
	
	template: JST["boards/index"],
	
	addBoard: function(event){
		event.preventDefault();
		var val = $(event.currentTarget).find('#create').val();
		var newBoard = new TrelloClone.Models.Board();
        newBoard.set("title", val);
		var that = this
		newBoard.save({}, {
			success: function(response){
				that.collection.add(response);
				Backbone.history.navigate("#/boards/"+ response.id)
			}
		});
	},
	
	render: function(){
		this.$el.html(this.template());
		this.collection.each( function(board){
			var boardIndexShow = new TrelloClone.Views.BoardIndexShow({
				model: board
			})
			this.addSubview(".board-index", boardIndexShow)
		}.bind(this))
	    this.onRender();
	    this.$('.board-index').sortable();

		return this;
	}
	
})