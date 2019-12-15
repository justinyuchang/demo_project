class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :title
      t.integer :position
      t.text :description
      t.string :due_date
      t.string :tags
      t.boolean :archived
      t.references :list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
