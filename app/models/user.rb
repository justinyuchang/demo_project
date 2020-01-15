class User < ApplicationRecord
  # gem_include
  devise :database_authenticatable,
         :registerable,
         :recoverable, 
         :rememberable, 
         :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  has_many :user_boards
  has_many :boards, through: :user_boards

  has_many :user_cards
  has_many :cards, through: :user_cards

  has_many :board_message

  has_many :search_users
  
  has_one_attached :avatar

  validate :correct_avatar_mime_type
  validates :username, :email, presence: true
  validates :username, :email, uniqueness: true
  
  def self.from_google_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
    end
  end
  

  private

  def correct_avatar_mime_type
    if avatar.attached? && !avatar.content_type.in?(%w(image/png image/jpg image/jpeg image/jfif))
      avatar.purge if self.new_record? # Only purge the offending blob if the record is new
      errors.add(:avatar, 'Must be an image file')
    end
  end

end
