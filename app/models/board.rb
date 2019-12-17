class Board < ApplicationRecord
  #vilidates
  validates :title, :visibility, presence: true

  #ActiveRecord關聯設定
  has_many :lists, dependent: :destroy
  has_many :cards, dependent: :destroy

end
