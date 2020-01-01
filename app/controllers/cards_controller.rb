class CardsController < ApplicationController
  before_action :card_params, only: [:create]
  before_action :load_card_items_params, only: [:update]
  
  def show
    @card_item = Card.find(params[:id])
    render json: @card_item
  end

  def create
    @card = Card.create(card_params)
    
  end
  
  def edit 
  end 
  
  def update 
    @find_card.update(@card_item_params)
  end 
  
  def destroy
  end 

  private
  def  card_params
    params.require(:card).permit(:title, :list_id)
  end

  def load_card_items_params
    @find_card = Card.find(params[:id])
    @card_item_params = params.require(:card).permit(:description, :tags, :archived, :due_date)
  end
  
end
