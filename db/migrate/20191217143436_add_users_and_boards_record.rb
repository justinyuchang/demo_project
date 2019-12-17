class AddUsersAndBoardsRecord < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :board, foreign_key: true
  end
end
