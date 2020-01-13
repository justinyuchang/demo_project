class AddDateOnCard < ActiveRecord::Migration[6.0]
  def change
    add_column :cards, :due_date, :datetime
  end
end
