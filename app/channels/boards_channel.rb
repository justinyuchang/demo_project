class BoardsChannel < ApplicationCable::Channel
  def subscribed
      if params[:board] != "boards" 
        room = Board.find(params[:board])
        stream_for room
        p "連接#{params[:board]}房間-----------------------------------------------"
      else
        stream_for "boards"
        p "連接大廳使用者編號#{current_user.id}---------------------------------------------------"
      end
      # or
      # stream_from "room_#{params[:room]}"
  end
end