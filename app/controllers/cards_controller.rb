class CardsController < ApplicationController
  before_action :find_board, only: [:create, :sortcard]
  before_action :find_card_sortable, only: [:sortcard]
  before_action :load_card_items_params, only: [:update]
  
  def show
    @card_item = Card.find(params[:id])
    render json: @card_item.get_card_hash
  end

  def create
    @card = Card.create(card_params)
    @card_channel = {id: @card.id, title: @card.title,list_id: @card.list_id ,status: "card_create"}
    BoardsChannel.broadcast_to(@board, @card_channel)
    render json: {status: 200}
  end
  
  def update 
    @find_card.update(@card_item_params)
    render json: @card_item_params
  end 
  
  def destroy
  end 

  def assign 
    @card = Card.find(params[:id])
    @user = User.find(params[:userId])
    if @card.users.include?(@user) == false 
      @card_member = @card.users.push(@user)
      @assignee = @card.users.select{|user| user == @user}
      render json: {status: "ok", assignee: @assignee} 
    else
      @card.users.delete(@user) if @user
      render json: @user
    end
  end 

  def sortcard
    if (@find_card.list_id == @find_list.id)
      card_at_list
    else
      card_not_at_list
    end
  end

  def card_at_list
    if @prev_card.blank?
      card_prev_nil
    elsif @next_card.blank?
      card_next_nil
    else
      card_not_nil
    end
  end

  def card_not_at_list
    @find_card.update(list_id: @find_list.id)
    if (@prev_card.blank?) && (@next_card.blank?)
      card_add = {list_id: @find_list.id, card_id: @find_card, status: "card_add"}
      BoardsChannel.broadcast_to(@board, card_add)
    elsif (@prev_card.blank?)
      card_prev_nil
    elsif (@next_card.blank?)
      card_next_nil
    else
      @find_card.insert_at(@next_card.position)
      card_add_after
    end
  end

  def card_prev_nil
    @find_card.move_to_top
    card_add_front
  end

  def card_next_nil
    @find_card.move_to_bottom
    card_add_after
  end

  def card_not_nil
    if ( @find_card.position < @prev_card.position )
      @find_card.insert_at(@prev_card.position)
    else
      @find_card.insert_at(@next_card.position)
    end
    card_add_front
  end

  def card_add_front
    add_front = {list_id: @find_list.id, card_id: @find_card, next_id: @next_card.id, status: "card_add_prev"}
    BoardsChannel.broadcast_to(@board, add_front)
  end

  def card_add_after
    add_after = {list_id: @find_list.id, card_id: @find_card, prev_id: @prev_card.id, status: "card_add_next"}
    BoardsChannel.broadcast_to(@board, add_after)
  end

  def tagging
    @card = Card.find(params[:id])
    @tags = params[:cardTags].split(', ')
    @tag_color = params[:tagColor]
    @selected_tag = @tags.select{ |tag| !@card.tags.exists?(name: tag) }
    if @selected_tag.map { |tag| @card.tags.exists?(name: tag) == false }  
      @append_tag = @selected_tag.map { |tag| @card.tags.create(name: tag, color: @tag_color)} 
    else 
    end 
    render json: @append_tag
  end 

  private
  def find_board
    @board = Board.find(params[:board_id])
  end

  def find_card_sortable
    @find_list = List.find(params[:list_id])
    @find_card = Card.find_by(id: params[:card])
    @next_card = Card.find_by(id: params[:next_card_id]) || nil
    @prev_card = Card.find_by(id: params[:prev_card_id]) || nil
    @find_card_array = params[:card_array]
  end

  def card_params
    params.require(:card).permit(:title, :list_id)
  end

  def load_card_items_params
    @find_card = Card.find(params[:id])
    @card_item_params = params.require(:card).permit(:title, :description, :due_date)
  end
end
