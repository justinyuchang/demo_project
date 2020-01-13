class CardsController < ApplicationController
  before_action :find_board, only: [:create, :sortcard]
  before_action :load_card_items_params, only: [:update]
  
  def show
    @card_item = Card.find(params[:id])
    @comments = @card_item.comments.order(id: :DESC)
    @assignee = @card_item.users
    @taglist = @card_item.tags
    render json: { card: @card_item, comments: @comments, assignee: @assignee, taglist: @taglist}
  end

  def create
    @card = Card.create(card_params)
    @card_channel = {id: @card.id, title: @card.title,list_id: @card.list_id ,status: "card_create"}
    BoardsChannel.broadcast_to(@board, @card_channel)
    render json: {status: 200}
  end
  
  def edit 
  end 
  
  def update 
    @find_card.update(@card_item_params)
    render json:{status: "ok"}
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
      @card.users.delete(@user)
      render json: @user
    end
  end 

  def sortcard
    find_list = List.find(params[:list_id])
    find_card = Card.find_by(id: params[:card])
    find_card_array = params[:card_array]
    next_card = Card.find_by(id: params[:next_card_id]) || nil
    prev_card = Card.find_by(id: params[:prev_card_id]) || nil
    if (find_card.list_id == find_list.id)
      if prev_card.blank?
        find_card.move_to_top
        card_add_prev = {list_id: find_list.id, card_id: find_card, next_id: next_card.id, status: "card_add_prev"}
        BoardsChannel.broadcast_to(@board, card_add_prev)
      elsif next_card.blank?
        find_card.move_to_bottom
        card_add_next = {list_id: find_list.id, card_id: find_card, prev_id: prev_card.id, status: "card_add_next"}
        BoardsChannel.broadcast_to(@board, card_add_next)
      else
        if ( find_card.position <  prev_card.position )
          find_card.insert_at(prev_card.position)
          card_add_prev = {list_id: find_list.id, card_id: find_card, next_id: next_card.id, status: "card_add_prev"}
          BoardsChannel.broadcast_to(@board, card_add_prev)
        else
          find_card.insert_at(next_card.position)
          card_add_next = {list_id: find_list.id, card_id: find_card, prev_id: prev_card.id, status: "card_add_next"}
          BoardsChannel.broadcast_to(@board, card_add_next)
        end
      end
    else
      if (prev_card.blank?) && (next_card.blank?)
        find_card.update(list_id: find_list.id )
        card_add = {list_id: find_list.id, card_id: find_card, status: "card_add"}
        BoardsChannel.broadcast_to(@board, card_add)
      elsif (prev_card.blank?)
        find_card.update(list_id: find_list.id )
        find_card.move_to_top
        card_add_prev = {list_id: find_list.id, card_id: find_card, next_id: next_card.id, status: "card_add_prev"}
        BoardsChannel.broadcast_to(@board, card_add_prev)
      elsif (next_card.blank?)
        find_card.update(list_id: find_list.id )
        find_card.move_to_bottom
        card_add_next = {list_id: find_list.id, card_id: find_card, prev_id: prev_card.id, status: "card_add_next"}
        BoardsChannel.broadcast_to(@board, card_add_next)
      else
        find_card.update(list_id: find_list.id )
        find_card.insert_at(next_card.position)
        card_add_next = {list_id: find_list.id, card_id: find_card, prev_id: prev_card.id, status: "card_add_next"}
        BoardsChannel.broadcast_to(@board, card_add_next)
      end
    end
  end

  def tagging
    @card = Card.find(params[:id])
    @tags = params[:cardTags].split(', ')

    @selected_tag = @tags.select{ |tag| !@card.tags.exists?(name: tag) }

    p "+"*50
    p "#{@selected_tag}"
    p "+"*50

    if @selected_tag.map { |tag| @card.tags.exists?(name: tag) == false }  
      @append_tag = @selected_tag.map { |tag| @card.tags.create(name: tag)} 
    else 
      p "Do nothing"
    end 
    render json: @append_tag
  end 

  private
  def find_board
    @board = Board.find(params[:board_id])
  end

  def card_params
    params.require(:card).permit(:title, :list_id)
  end

  def load_card_items_params
    @find_card = Card.find(params[:id])
    @card_item_params = params.require(:card).permit(:title, :description, :due_date)
  end
end
