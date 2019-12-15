class Board < ApplicationRecord
  has_many :lists, dependent: :destroy
  has_many :cards, dependent: :destroy

  validates :title, :visibility, presence: true
end
