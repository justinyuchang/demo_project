class CardsController < ApplicationController
  before_action :find_board, only: [:create]
  before_action :load_card_items_params, only: [:update]
  
  def show
    @card_item = Card.find(params[:id])
    @comments = @card_item.comments
    p "="*50
    p "#{@comments}"
    p "="*50
    render json: { card: @card_item, comments: @comments}
  end

  def create
    @card = Card.create(card_params)
    @card_channel = {id: @card.id, title: @card.title,list_id: @card.list_id ,stats: "card_create"}
    BoardsChannel.broadcast_to(@board, @card_channel)
  end
  
  def edit 
  end 
  
  def update 
    @find_card.update(@card_item_params)
  end 
  
  def destroy
  end 

  private
  def find_board
    @board = Board.find(params[:board_id])
  end

  def  card_params
    params.require(:card).permit(:title, :list_id)
  end

  def load_card_items_params
    @find_card = Card.find(params[:id])
    @card_item_params = params.require(:card).permit(:description, :tags, :archived, :due_date)
  end
  
end
