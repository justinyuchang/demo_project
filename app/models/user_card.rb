class UserCard < ApplicationRecord
  belongs_to :user
  belongs_to :card

  # validates :user_id, uniqueness: true
end
