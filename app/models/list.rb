class List < ApplicationRecord
  acts_as_list
  scope :sorted, -> { order(position: :asc) }

  validates :title, presence: true
  
  has_many :cards, -> { order(position: :asc) }, dependent: :destroy 
  belongs_to :board
end
