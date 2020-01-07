class FixPositionColumn < ActiveRecord::Migration[6.0]
  def change
    change_column :cards, :position, :float
  end
end
