class AddUsrtBorderStatus < ActiveRecord::Migration[6.0]
  def change
    add_column :user_boards, :status, :boolean, default: true
    add_index :user_boards, :status
  end
end
