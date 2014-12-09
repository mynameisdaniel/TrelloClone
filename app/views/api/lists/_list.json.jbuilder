json.extract!(list, :id, :title, :ord, :created_at, :updated_at)

json.cards list.cards do |card|
  json.partial!("api/cards/card", card: card)
end
