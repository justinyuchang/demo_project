class BoardsChannel < ApplicationCable::Channel
  def subscribed
      if params[:board] != nil
        p "#{params[:board]}-----------------------------------------------"
        room = Board.find(params[:board])
        stream_for room
      else
        p "#{current_user}-----------------------------------------------"
        stream_for "board"
      end
      # or
      # stream_from "room_#{params[:room]}"
  end
end