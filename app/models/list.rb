class List < ApplicationRecord
  #gem_include
  acts_as_list

  #vilidates
  validates :title, presence: true
  
  #ActiveRecord關聯設定
  has_many :cards, -> { order(position: :asc) }, dependent: :destroy 

  #scope
  scope :sorted, -> { order(position: :asc) }
  
end
