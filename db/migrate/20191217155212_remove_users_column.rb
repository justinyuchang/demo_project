class RemoveUsersColumn < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :board_id, :integer
  end
end
