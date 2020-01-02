class BoardsChannel < ApplicationCable::Channel
  def subscribed
        room = Board.find(params[:board])
        stream_for room
  end
end