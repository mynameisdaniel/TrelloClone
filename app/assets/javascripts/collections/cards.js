TrelloClone.Collections.Cards = Backbone.Collection.extend({
	
	initialize: function(modelArr, options){
		this.board = options.board;
		this.card = options.card
	},
	
	comparator: 'ord',
	
	model: TrelloClone.Models.Card,
	
    getOrFetch: function (id) {
      var card = this.get(id),
        cards = this;
      if(!card) {
        card = new TrelloClone.Models.Card({ id: id });
        card.fetch({
          success: function () {
            cards.add(card);
          },
        });
      } else {
        card.fetch();
      }
      return card;
    }	
})
