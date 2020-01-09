class ChangeListsPosition < ActiveRecord::Migration[6.0]
  def change
    change_column :lists, :position, :float
  end
end
