class Card < ApplicationRecord
  #gem_include
  acts_as_list scope: :list

  #vilidates
  validates :title, presence: true

  #ActiveRecord關聯設定
  belongs_to :list

end
