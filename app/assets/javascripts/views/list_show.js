TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
	initialize: function() {
		this.model.cards().each(function (card){
			this.addCardSubview(card);
		}.bind(this));
		this.id = 5
		this.listenTo(this.model, "reset remove add", this.render);
		this.listCards = this.model.cards();
		this.listenTo(this.listCards, "reset add", this.addCardSubview);
	},
	
	className: "list-show",
	
	tagName: 'li',
	
	template: JST["lists/show"],
	
	events: {
		"click button.delete-list ":"deleteList",	
		"submit form.create-card":"addCard",
		"sortupdate .list-card":"updateOrder",
		"sortreceive .list-card":"updateTwoLists",
		"sortremove .list-card":"updateOldList",
	},

		    updateTwoLists: function(event){
		// var $currentTarget = $(event.currentTarget);
		// var listId = $currentTarget.attr("list_id")
		// var children = $currentTarget.children();
		// debugger
		    },
	
    updateNewList: function(event){
		var $currentTarget = $(event.currentTarget);
		var listId = $currentTarget.attr("list_id")
		var children = $currentTarget.children();
		debugger
		children.each( function(index, div){
			var modelId = $(div).find('a').data("id");
			var model = this.listCards.get(modelId);
            model.set("list_id", this.listId)
			model.set("ord", index);
			model.save();
		}.bind(this))
    },
	
	

	
	updateOrder: function(event){
		var $currentTarget = $(event.currentTarget);
		var listId = $currentTarget.attr("list_id")
		var children = $currentTarget.children();
		
		children.each( function(index, div){
			var modelId = $(div).find('a').data("id");
			var model = this.listCards.get(modelId);
			if (!model){next};
            model.set("list_id", this.listId)
			model.set("ord", index);
			model.save();
		}.bind(this))
		// this.render();
	},
	
	addCardSubview: function (card) {
		view = new TrelloClone.Views.ListIndexShow({model: card});
		this.addSubview('.list-card', view);
	},
	
	addCard: function(event) {
		event.preventDefault();
		var $currentTarget = $(event.currentTarget);
		var val = $(event.currentTarget).find('#create').val();
		var newCard = new TrelloClone.Models.Card();
		newCard.set("list_id", this.model.escape("id"))
        newCard.set("title", val);
		newCard.set("ord", this.listCards.length)
		var that = this
			
		newCard.save({}, {
			success: function(response){
				that.listCards.add(response);
				that.render();
			}.bind(this)
		});
	},
	
    onRender: function () {
      Backbone.CompositeView.prototype.onRender.call(this);
      this.$('.list-card').sortable({connectWith: '.list-card'});
    },
	
	deleteList: function(event){
		event.preventDefault();
		var $currentTarget = $(event.currentTarget);
		this.model.destroy();
	},
		
	render: function(){
		this.$el.html(this.template({list:this.model}));
		this.attachSubviews();
		this.onRender();
		return this;
	}
});