class User < ApplicationRecord
  #gem_include
  devise :database_authenticatable, :registerable,
                :recoverable, :rememberable, :validatable,
                :omniauthable, omniauth_providers: [:facebook, :google_oauth2]

  #ActiveRecord關聯設定
  has_many :user_boards
  has_many :boards, through: :user_boards

  has_many :user_cards
  has_many :cards, through: :user_cards

  has_many :board_message
  
  has_one_attached :user_avatar


  #omniauth第三方認證
  def self.from_google_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
    end
  end

end
