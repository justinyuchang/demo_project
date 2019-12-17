class Board < ApplicationRecord
  #vilidates
  validates :title, :visibility, presence: true

  #ActiveRecord關聯設定
  has_many :lists, dependent: :destroy
  has_many :cards, dependent: :destroy
  
  has_many :user_boards
  has_many :users, through: :user_boards

end
