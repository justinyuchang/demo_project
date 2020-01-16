class BoardsChannel < ApplicationCable::Channel
  def subscribed
    room = Board.find_by(id: params[:board])
    if room.blank?
      stop_all_streams
    else
      stream_for room
    end
  end
end