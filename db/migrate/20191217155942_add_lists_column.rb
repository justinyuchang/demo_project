class AddListsColumn < ActiveRecord::Migration[6.0]
  def change
    add_reference :lists, :board, foreign_key: true
  end
end
