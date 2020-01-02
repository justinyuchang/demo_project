class CardsController < ApplicationController
  before_action :load_list_card_params, only: [:create]
  before_action :load_card_items_params, only: [:update]
  
  def show
    p "--------------#{params}----------------"
    p "--------------#{params[:id]}----------------"
    @card_item = Card.find(params[:id])
    @comments = @card_item.comments
    p "="*50
    p "#{@comments}"
    p "="*50
    render json: { card: @card_item, comments: @comments}
  end

  def create
    p "--------------#{@card_params}----------------"
    p "--------------#{params[:list_name]}----------------"
    p "--------------#{params[:card]}----------------"
    p "--------------#{params[:board_id]}----------------"
    p "--------------#{@board_id.id}----------------"
    p "--------------#{@list_id.id}----------------"
    @card = @list_id.cards.create(title: @card_title)
  end
  

  
  def edit 
  end 
  
  def update 
    p "--------------#{@find_card.id}----------------"
    p "--------------#{@card_item_params}----------------"
    @find_card.update(@card_item_params)
  end 
  
  def destroy
  end 

  private
  def  load_list_card_params
    @card_params = params.require(:card).permit(:board_id, :card_text, :list_name)
    @board_id = Board.find(@card_params[:board_id])
    @list_id = @board_id.lists.find_by(title: @card_params[:list_name])
    @card_title = @card_params[:card_text]
  end

  def load_card_items_params
    @find_card = Card.find(params[:id])
    @card_item_params = params.require(:card).permit(:description, :tags, :archived, :due_date)
  end
end
