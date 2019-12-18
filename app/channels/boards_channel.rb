class BoardsChannel < ApplicationCable::Channel
    def subscibed
        board = Board.find(params[id])
        stream_from board
    end
end