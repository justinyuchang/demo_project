class BoardMessagesController < ApplicationController
    before_action :load_board_room_message, only: [:create]
    def create
        @messages = BoardMessage.create(user: current_user, message: @message, board: @room)

        BoardsChannel.broadcast_to @room, @messages
    end

    private
    def load_board_room_message
        @room = Board.find(params.dig(:board_message, :board_id))
        @message = params.dig(:board_message, :message)
    end
end
  