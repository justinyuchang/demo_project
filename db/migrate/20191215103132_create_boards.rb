class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.string :title
      t.string :visibility
      t.integer :user_id
      t.string :room_id
      t.string :integer

      t.timestamps
    end
  end
end
