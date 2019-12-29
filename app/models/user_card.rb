class UserCard < ApplicationRecord
  # ActiveRecord關聯設定
  belongs_to :user
  belongs_to :card
end
