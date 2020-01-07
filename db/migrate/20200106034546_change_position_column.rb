class ChangePositionColumn < ActiveRecord::Migration[6.0]
  def change
    change_column :cards, :position, :float, default: 10000.0
  end
end
