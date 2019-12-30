class BoardsController < ApplicationController
  # devise方法:當前使用者=> current_user
  before_action :find_board, only: [:edit, :update, :destroy, :show, :searchuser]
  before_action :search_params, only: [:searchuser]

  def index
    @boards = current_user.boards.all
    @searchuser = current_user.search_users.all
    @board = Board.new
  end

  def new
  end

  def show
    @lists = @board.lists.all
    @board_message = BoardMessage.new(board: @board)
    @board_messages = @board.board_messages.includes(:user)
  end

  def create
    # @board = current_user.boards.build(board_params)
    @board = Board.new(board_params)
    @board.users = [current_user] 

    if @board.save
      # 成功
      redirect_to board_path(@board.id), notice: "新增成功!"
    else
      # 失敗
      render :new, notice: "請填寫標題及狀態"
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
    redirect_to boards_path, notice: "已刪除!"
  end

  def searchuser
    @user = User.find_by(email: @email)
    if @board.user_ids.include?(@user.id) == false 
       @invitation = SearchUser.create(user: @user,
                                       board: @board,
                                       email: @email, 
                                       message: @message)
       p "-"*30
       p "#{params}"
       p "-"*30
    else
      p "#{@user.id} is already a member."
      render :template => "shared/_navbarboard"
    end
  end

  def agree_invite 
    @invitation = SearchUser.find(params[:id])
    @reply = params[:agree] 
    @board = Board.find(params[:board_id])

    if @reply == "true"
      @board.users << [current_user]
      p "-"*50
      p "You are now join to #{@board.title}"
      p "-"*50
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
