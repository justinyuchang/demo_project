class Card < ApplicationRecord
  acts_as_list scope: :list
  scope :sorted, -> { order(position: :asc) }

  validates :title, presence: true

  belongs_to :list

  has_many :comments

  has_many :user_cards
  has_many :users, through: :user_cards

  has_many :taggings
  has_many :tags, through: :taggings
  
  # def tag_list=(names)
  #   self.tags = names.split(',').map do |n|
  #     Tag.where(name: n.strip).first_or_create! 
  #   end
  # end 

  # def tag_list
  #   tag.map(&:name).join(', ')
  # end 
end
