class Comment < ApplicationRecord
  belongs_to :card
  belongs_to :user

  def comment_to_h
    {
      id: id,
      content: content,
      author: user.username,
      created_at: created_at.strftime('%Y-%m-%d %H:%M:%S')
    }
  end
end
