class SearchUser < ApplicationRecord
    validates :email, presence: true

    belongs_to :user
    belongs_to :board
end
