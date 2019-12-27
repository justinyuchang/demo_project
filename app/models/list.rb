class List < ApplicationRecord
  # gem_include
  acts_as_list

  # validates
  validates :title, presence: true
  
  # ActiveRecord關聯設定
  has_many :cards, -> { order(position: :asc) }, dependent: :destroy 
  belongs_to :board

  # scope
  scope :sorted, -> { order(position: :asc) }
  
end
