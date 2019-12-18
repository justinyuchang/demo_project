class CreateBoardMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :board_messages do |t|
      t.string :message
      t.bigint :user_id

      t.timestamps
      t.index ["user_id"], name: "index_board_messages_on_user_id"
    end
  end
end
