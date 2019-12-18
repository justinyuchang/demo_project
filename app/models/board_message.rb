class BoardMessage < ApplicationRecord
    belongs_to :board, inverse_of: :board_messages
    belongs_to :user
end
