class List < ApplicationRecord
  validates :title, presence: true
  
  has_many :cards, -> { order(position: :asc) }, dependent: :destroy 
  acts_as_list

  scope :sorted, -> { order(position: :asc) }
end
