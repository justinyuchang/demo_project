class CreateSearchUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :search_users do |t|
      t.string :email
      t.string :message
      t.boolean :status, default: false

      t.references :user, null: false, foreign_key: true
      t.references :board, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
