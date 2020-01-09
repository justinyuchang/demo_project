class BoardsController < ApplicationController
  layout "board", :only => :index
  before_action :find_board, only: [:edit, :update, :destroy, :show, :searchuser]
  before_action :search_params, only: [:searchuser]

  def index
    @boards = current_user.boards.all
    @board = Board.new()
    @private_boards = current_user.boards.where(visibility: "Private")
    @public_boards = current_user.boards.where(visibility: "Team")
    @star_boards = current_user.boards.where(integer: "1")
    @searchuser = current_user.search_users.all
  end

  def new
  end

  def show
    @lists = @board.lists.includes(:cards)
    @list = List.new()
    # @board_message = BoardMessage.new(board: @board)
    # @board_messages = @board.board_messages.includes(:user)

    if @board.users.size > 1
      @board.visibility = "Team"
    end
  end

  def create
    # @board = current_user.boards.build(board_params)
    @board = Board.new(board_params)
    @board.users = [current_user] 

    if @board.save
      redirect_to board_path(@board.id), notice: "新增成功!"
    else
      render :new, notice: "請填寫標題及狀態"
    end
  end

  def edit
  end

  def update
    if @board.update_attributes(board_params)
      redirect_to boards_path, notice: "資料更新成功!"
    else
      render :edit
    end
  end

  def destroy
    current_user.boards.destroy(find_board)
    redirect_to boards_path, notice: "已刪除!"
  end

  def searchuser
    @user = User.find_by(email: @email)
    if @board.user_ids.include?(@user.id) == false 
       @invitation = SearchUser.create(user: @user,
                                       board: @board,
                                       email: @email, 
                                       message: @message)
    else
      render :template => "shared/_navbarboard"
    end
  end

  def agree_invite 
    @invitation = SearchUser.find(params[:id])
    @reply = params[:agree] 
    @board = Board.find(params[:board_id])

    if @reply == "true"
      @board.users << [current_user]
      @invitation.destroy
    else
      @invitation.destroy
    end
  end
  
  private
  def board_params
    params.require(:board).permit(:title, :visibility)
  end

  def search_params
    @email = params.dig(:search, :email)
    @message = params.dig(:search, :message)
  end

  def find_board
    @board = Board.find(params[:id])
  end
end
