json.extract!(board, :id, :title, :created_at, :updated_at)

json.members board.members do |member|
    json.partial!("api/members/member", member: member)
end


json.lists board.lists do |list|
    json.partial!("api/lists/list", list: list)
end

