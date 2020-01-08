class CardsController < ApplicationController
  before_action :find_board, only: [:create]
  before_action :load_card_items_params, only: [:update]
  
  def show
    @card_item = Card.find(params[:id])
    @comments = @card_item.comments
    @assignee = @card_item.users
    render json: { card: @card_item, comments: @comments, assignee: @assignee}
  end

  def create
    @card = Card.create(card_params)
    @card_channel = {id: @card.id, title: @card.title,list_id: @card.list_id ,stats: "card_create"}
    BoardsChannel.broadcast_to(@board, @card_channel)
    render json:@card_channel
  end
  
  def edit 
  end 
  
  def update 
    p "="*50
    p "#{params}"
    p "="*50
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

  def sort
    find_list = List.find(params[:list_id])
    find_card = Card.find_by(id: params[:card])
    find_card_array = params[:card_array]
    if find_card_array.include?((find_card.id).to_s)
      next_card = Card.find_by(id: params[:next_card_id])
      prev_card = Card.find_by(id: params[:prev_card_id])
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
      else
        if position == "position"
          find_card.update(list_id: find_list.id)
        else
          find_card.update(list_id: find_list.id, position: position)
        end
      end

    else
      p "unnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
      
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
    @card_item_params = params.require(:card).permit(:description, :tag_list, :archived, :due_date)
  end
  
end
