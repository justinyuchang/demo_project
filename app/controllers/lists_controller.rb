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
    position =  if prev_list.blank?
                            (next_list.position) - 0.1
                          elsif next_list.blank?
                            (prev_list.position) + 0.1
                          else
                            (next_list.position + prev_list.position) / 2
                          end
    @list.update(position: position)
    if (prev_list.blank?) 
      list_add_prev = {list_id: @list.id, next_id: next_list.id, status: "list_add_prev"}
      # BoardsChannel.broadcast_to(@board, list_add_prev)
    else
      list_add_next = {list_id: @list.id, prev_id: prev_list.id, status: "list_add_next"}
      # BoardsChannel.broadcast_to(@board, list_add_next)
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
