class BoardsController < ApplicationController
  def index
    @boards = Board.all
  end

  def new
    @board = Board.new
  end

  def create
    @board = Board.new(board_params)

    if @board.save
      # 成功
      redirect_to boards_path, notice: "新增成功!"
    else
      # 失敗
      render :new
    end
  end

  def edit
    @board = Board.find_by(id: params[:id])
  end

  def update
    @board = Board.find_by(id: params[:id])

    if @board.update(board_params)
      # 成功
      redirect_to boards_path, notice: "資料更新成功!"
    else
      # 失敗
      render :edit
    end
  end

  def destroy
    @board = Board.find_by(id: params[:id])
    @board.destroy if @board
    redirect_to boards_path, notice: "Board已刪除!"
  end


  private
    def board_params
      params.require(:board).permit(:title, :visibility, )
    end
end
