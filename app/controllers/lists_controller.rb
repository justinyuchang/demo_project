class ListsController < ApplicationController
  before_action :find_list, only: [:show, :edit, :update, :destroy]
  before_action :find_board, only: [:create, :new]

  def index
    @lists = List.sorted
  end 
  
  def show
  end
  
  def new 
  end 
  
  def create 
    @list = @board.lists.create(list_params)
    @list_channel = {id: @list.id,title: @list.title, stats: "list_create"}
    BoardsChannel.broadcast_to(@board, @list_channel)
    render json:{status: "ok"}
  end 
  
  def edit 
  end 
  
  def update 
    if @list.update(list_params)
      redirect_to root_path
    else 
      render :edit
    end
  end 
  
  def destroy
  end 

  private 
  def find_list 
    @list = List.find(params[:id])
  end 

  def find_board
    @board = Board.find(params[:board_id])
  end

  def list_params
    params.require(:list).permit(:title, :position, :archived)
  end 
end
