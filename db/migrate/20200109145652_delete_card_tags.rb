class DeleteCardTags < ActiveRecord::Migration[6.0]
  def change
    remove_column :cards, :tags
  end
end
