class ListsController < ApplicationController
  before_action :find_list, only: [:show, :edit, :update, :destroy]

  def index
    @lists = List.sorted
  end 
  
  def show
  end
  
  def new 
    @list = List.new 
  end 
  
  def create 
    @list = List.new(list_params)
    if @list.save
      redirect_to lists_path
    else 
      render :new 
    end 
  end 
  
  def edit 
  end 
  
  def update 
    if @list.update(list_params)
      redirect_to lists_path
    else 
      render :edit
    end
  end 
  
  def destroy
    @list.destroy if @list
    redirect_to lists_path
  end 

  private 

  def find_list 
    @list = List.find(params[:id])
  end 

  def list_params
    params.require(:list).permit(:title, :position, :archived)
  end 
end
