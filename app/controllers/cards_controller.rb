class CardsController < ApplicationController
  before_action :find_board, only: [:create, :sortcard]
  before_action :load_card_items_params, only: [:update]
  
  def show
    @card_item = Card.find(params[:id])
    @comments = @card_item.comments
    @assignee = @card_item.users
    render json: { card: @card_item, comments: @comments, assignee: @assignee}
  end

  def create
    @card = Card.create(card_params)
    @card_channel = {id: @card.id, title: @card.title,list_id: @card.list_id ,status: "card_create"}
    BoardsChannel.broadcast_to(@board, @card_channel)
    render json:@card_channel
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
      @assignee = @card.users.push(@user)
      render json: @assignee
    else
      @card.users.delete(@user)
    end
  end 

  def sortcard
    find_list = List.find(params[:list_id])
    find_card = Card.find_by(id: params[:card])
    find_card_array = params[:card_array]
      next_card = Card.find_by(id: params[:next_card_id]) || nil
      prev_card = Card.find_by(id: params[:prev_card_id]) || nil
      position = if (prev_card.blank?) && (next_card.blank?)
                              "position"
                            elsif prev_card.blank?
                              next_card.position / 2
                            elsif next_card.blank?
                              prev_card.position + 1000.0
                            else
                              (next_card.position + prev_card.position) / 2
                            end
      if (find_card.list_id == find_list.id)
        find_card.update(position: position)
        if (prev_card.blank?) 
          card_add_prev = {list_id: find_list.id, card_id: find_card, next_id: next_card.id, status: "card_add_prev"}
          BoardsChannel.broadcast_to(@board, card_add_prev)
        else
          card_add_next = {list_id: find_list.id, card_id: find_card, prev_id: prev_card.id, status: "card_add_next"}
          BoardsChannel.broadcast_to(@board, card_add_next)
        end
      else
        if position == "position"
          find_card.update(list_id: find_list.id)
          card_add = {list_id: find_list.id, card_id: find_card, status: "card_add"}
          BoardsChannel.broadcast_to(@board, card_add)
        else
          find_card.update(list_id: find_list.id, position: position)
          if (prev_card.blank?) 
            card_add_prev = {list_id: find_list.id, card_id: find_card, next_id: next_card.id, status: "card_add_prev"}
            BoardsChannel.broadcast_to(@board, card_add_prev)
          else
            card_add_next = {list_id: find_list.id, card_id: find_card, prev_id: prev_card.id, status: "card_add_next"}
            BoardsChannel.broadcast_to(@board, card_add_next)
          end
        end
      end
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
    @card_item_params = params.require(:card).permit(:description, :tags, :archived, :due_date)
  end
  
end
