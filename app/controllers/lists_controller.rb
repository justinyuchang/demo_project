class ListsController < ApplicationController
  before_action :find_list, only: [:sortlist]
  before_action :find_board, only: [:create, :sortlist]

  def index
    @lists = List.sorted
  end 
  
  def create 
    @list = @board.lists.create(list_params)
    @list_channel = {id: @list.id,title: @list.title, status: "list_create"}
    BoardsChannel.broadcast_to(@board, @list_channel)
    render json:{status: "ok"}
  end 
  
  def destroy
  end 

  def sortlist
    next_list = List.find_by(id: params[:next_list_id]) || nil
    prev_list = List.find_by(id: params[:prev_list_id]) || nil
    if (prev_list.blank?) 
      @list.move_to_top
      list_add_prev = {list: @list.id, next_id: next_list.id, status: "list_add_prev"}
      BoardsChannel.broadcast_to(@board, list_add_prev)
    elsif (next_list.blank?)
      @list.move_to_bottom
      list_add_next = {list: @list.id, prev_id: prev_list.id, status: "list_add_next"}
      BoardsChannel.broadcast_to(@board, list_add_next)
    else
      if ( @list.position <  prev_list.position )
        @list.insert_at(prev_list.position)
        list_add_next = {list: @list.id, prev_id: prev_list.id, status: "list_add_next"}
        BoardsChannel.broadcast_to(@board, list_add_next)
      else
        @list.insert_at(next_list.position)
        list_add_next = {list: @list.id, prev_id: prev_list.id, status: "list_add_next"}
        BoardsChannel.broadcast_to(@board, list_add_next)
      end
    end
  end

  private 
  def find_list 
    @list = List.find(params[:list])
  end 

  def find_board
    @board = Board.find(params[:board_id])
  end

  def list_params
    params.require(:list).permit(:title, :position, :archived)
  end 
end
