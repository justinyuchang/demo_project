class FixCardDate < ActiveRecord::Migration[6.0]
  def change
    remove_column :cards, :due_date, :string
  end
end
