class UserBoard < ApplicationRecord
  # ActiveRecord關聯設定
  belongs_to :user
  belongs_to :board
end
