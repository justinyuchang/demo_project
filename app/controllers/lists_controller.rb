class ListsController < ApplicationController
  before_action :find_list_sortable, only: [:sortlist]
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

  def sortlist
    if (@prev_list.blank?) 
      list_prev_nil
    elsif (@next_list.blank?)
      list_next_nil
    else
      list_not_nil
    end
  end

  def list_prev_nil
    @list.move_to_top
    list_boardschannel(list_add_next)
  end

  def list_next_nil
    @list.move_to_bottom
    list_boardschannel(list_add_prev)
  end

  def list_not_nil
    if ( @list.position < @prev_list.position )
      @list.insert_at(@prev_list.position)
      list_boardschannel(list_add_prev)
    else
      @list.insert_at(@next_list.position)
      list_boardschannel(list_add_prev)
    end
  end

  def list_add_next
    {list: @list.id, next_id: @next_list.id, status: "list_add_prev"}
  end

  def list_add_prev
    {list: @list.id, prev_id: @prev_list.id, status: "list_add_next"}
  end

  def list_boardschannel(message)
    BoardsChannel.broadcast_to(@board, message)
  end

  private 
  def find_list_sortable 
    @list = List.find(params[:list])
    @next_list = List.find_by(id: params[:next_list_id]) || nil
    @prev_list = List.find_by(id: params[:prev_list_id]) || nil
  end 

  def find_board
    @board = Board.find(params[:board_id])
  end

  def list_params
    params.require(:list).permit(:title, :position, :archived)
  end 
end
