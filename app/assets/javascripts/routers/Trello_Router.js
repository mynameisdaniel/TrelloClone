TrelloClone.Routers.Router = Backbone.Router.extend({
	initialize: function(options) {
		this.$rootEl = options.$main;
	},
	
	routes: {
		"":"boardIndex",
		"boards/:id":"boardShow"
	},
	
	boardIndex: function(){
		TrelloClone.Collections.boards.fetch();
		var view = new TrelloClone.Views.BoardIndex({collection: TrelloClone.Collections.boards})
		this._swapView(view);
	},
	
	boardShow: function(id){
		var model = TrelloClone.Collections.boards.getOrFetch(id);
		var view = new TrelloClone.Views.BoardShow({collection: TrelloClone.Collections.boards,
			model: model});
		this._swapView(view);
	},
	
    _swapView: function(view) {
      this._currentView && this._currentView.remove();
      this._currentView = view;
      this.$rootEl.html(view.render().$el);
    }

})
