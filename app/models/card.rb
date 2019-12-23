class Card < ApplicationRecord
  # gem_include
  acts_as_list scope: :list
  # scope
  scope :sorted, -> { order(position: :asc) }

  # validates
  validates :title, presence: true

  has_many :user_cards
  has_many :users, through: :user_cards

  # ActiveRecord關聯設定
  belongs_to :list
end
