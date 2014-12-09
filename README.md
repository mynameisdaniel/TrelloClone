TrelloClone
===========

[Trello] [trello] is actually a very good way of maintaining todo lists if you find yourself being scatterbrained. 

This project recreates the core features of Trello. A user can have many boards. A board can have many lists. Lists can have many cards. 

The coolest feature is using jQuery UI's sortable to move cards from one list to another. When a card changes positions or lists, a backbone event is triggered to update the order in the database.

This project also makes use of Backbone.js. With backbone, we created subviews within views so each list is reponsible for all the cards inside it. This is good practice when we are handling a lot of objects. 







[trello]: http://www.trello.com
