class CreateBoardMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :board_messages do |t|
      t.string :message
      t.bigint :user_id
      t.bigint :board_id

      t.timestamps
      t.index ["user_id"], name: "index_board_messages_on_user_id"
      t.index ["board_id"], name: "index_board_messages_on_board_id"
    end
  end
end
