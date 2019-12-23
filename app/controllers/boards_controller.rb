class BoardsController < ApplicationController
  #devise方法:當前使用者=> current_user
  before_action :find_board, only: [:edit, :update, :destroy, :show, :searchuser]
  before_action :search_params, only: [:searchuser]

  def index
    @boards = current_user.boards.all
    @searchuser = current_user.search_users.all
  end

  def new
    @board = Board.new
  end

  def show
    @lists = List.new()
    @board_message = BoardMessage.new(board: @board)
    @board_messages = @board.board_messages.includes(:user)
  end

  def create
    # @board = current_user.boards.build(board_params)
    @board = Board.new(board_params)
    @board.users = [current_user] 

    if @board.save
      # 成功
      redirect_to boards_path, notice: "新增成功!"
    else
      # 失敗
      render :new
    end
  end

  def edit
  end

  def update
    if @board.update_attributes(board_params)
      # 成功
      redirect_to boards_path, notice: "資料更新成功!"
    else
      # 失敗
      render :edit
    end
  end

  def destroy
    current_user.boards.destroy(find_board)
    redirect_to boards_path, notice: "Board已刪除!"
  end

  def searchuser
    if @user = User.find_by(email: @email)
      SearchUser.create(user: @user,
                                              board: @board,
                                              email: @email, 
                                              message: @message)
    else
      render :template => "shared/_navbarboard"
    end
  end

  

  private
  def board_params
    params.require(:board).permit(:title, :visibility )
  end

  def search_params
    @email = params.dig(:search, :email)
    @message = params.dig(:search, :message)
  end

  def find_board
    @board = Board.find_by(id: params[:id])
  end
end
