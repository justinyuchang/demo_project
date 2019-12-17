class RemoveBoardsColumn < ActiveRecord::Migration[6.0]
  def change
    remove_column :boards, :user_id, :integer
    remove_column :boards, :room_id, :integer
  end
end
