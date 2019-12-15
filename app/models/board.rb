class Board < ApplicationRecord
  has_many :lists
  has_many :cards

  validates :title, :visibility, presence: true
end
