class CreateLists < ActiveRecord::Migration[6.0]
  def change
    create_table :lists do |t|
      t.string :title
      t.integer :position
      t.boolean :archived

      t.timestamps
    end
  end
end
