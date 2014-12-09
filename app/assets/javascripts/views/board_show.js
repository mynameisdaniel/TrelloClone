TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.listenTo( this.model, "sync add", this.render);
		this.boardLists = this.model.lists()
		this.listenTo( this.boardLists, "reset remove add", this.render);
	},
	
	events: {
		"submit form.create-list":"addList",
     	"sortupdate .board-lists":"updateOrder",		
	},
	
	template: JST["boards/show"],
	
	className: "board-show",
	
	updateOrder: function(event){
		var $currentTarget = $(event.currentTarget);		
		var children = $currentTarget.children();		
		children.each( function(index, div){

			var modelId = $(div).find('button.delete-list').data("id");
			var model = this.boardLists.get(modelId);
			model.set("ord", index);
			model.save();
		}.bind(this))
		
	},
	
	addList: function(event){
		event.preventDefault();
		var val = $(event.currentTarget).find('#create').val();
		var newList = new TrelloClone.Models.List();
        newList.set("title", val);
		newList.set("board_id", this.model.escape("id"))
		newList.set("ord", this.boardLists.length)
		var that = this;
		newList.save({},{
			success: function(response){
				that.boardLists.add(response);
				that.render;
			}.bind(this)
		});
	},
	
	render: function(){
		this.$el.html(this.template({board:this.model}));
		var lists = this.model.lists();
		lists.each( function(list) {
			var listShow = new TrelloClone.Views.ListShow({model:list});
			this.addSubview(".board-lists", listShow)
		}.bind(this))
		
		// this.attachSubviews()
	    this.onRender();
        this.$('.board-lists').sortable();
		return this;
	}

})