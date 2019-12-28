class CardsController < ApplicationController
  before_action :load_list_card_params, only: [:create]

  
  def show
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
  end 
  
  def destroy
  end 

  private
  def  load_list_card_params
    @card_params = params.permit( :board_id, :card, :list_name )
    @board_id = Board.find(@card_params[:board_id])
    @list_id = @board_id.lists.find_by(title: @card_params[:list_name])
    @card_title = @card_params[:card]
  end
end
