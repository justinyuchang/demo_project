class Card < ApplicationRecord
  acts_as_list scope: :list
  scope :sorted, -> { order(position: :asc) }

  validates :title, presence: true

  has_many :comments
  has_many :user_cards
  has_many :users, through: :user_cards
  belongs_to :list
end
