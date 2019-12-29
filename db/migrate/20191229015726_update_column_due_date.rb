class UpdateColumnDueDate < ActiveRecord::Migration[6.0]
  def down
    add_column :cards, :due_date, :date
  end
end
