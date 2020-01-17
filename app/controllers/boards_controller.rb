class BoardsController < ApplicationController
  layout "board", :only => :index
  before_action :find_board, only: [:edit, :update, :destroy, :show, :searchuser]
  before_action :search_params, only: [:searchuser]

  def index
    @boards = current_user.boards.all
    @board = Board.new()
    @private_boards = current_user.boards.where(visibility: "私人")
    @public_boards = current_user.boards.where(visibility: "團隊")
    @star_boards = current_user.starred_boards.all
    @searchuser = current_user.search_users.all
  end

  def new
  end

  def show
    @lists = @board.lists.sorted.includes(:cards)
    @list = List.new()
  end

  def create
    # @board = current_user.boards.build(board_params)
    @board = Board.new(board_params)
    @board.users = [current_user] 

    if @board.save
      redirect_to board_path(@board.id), notice: "新增成功!"
    else
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

  def star
    board = Board.find(params[:board_id])
    star = StarBoard.find_by(user: current_user, board: board)
    starred = false

    if star
      star.destroy
      starred = false
    else
      current_user.star_boards.create(board: board)
      starred = true
    end
    render json: {status: 'ok', starred: starred}
  end

  def destroy
    current_user.boards.destroy(find_board)
    redirect_to boards_path, notice: "已刪除!"
  end

  def searchuser
    @user = User.find_by(email: @email)
    if @user.blank?
      render :js => "alert('沒有這位使用者，請重新輸入')"
    else
      if @board.user_ids.include?(@user.id) == false 
        @invitation = SearchUser.create(user: @user,
                                        board: @board,
                                        email: @email, 
                                        message: @message)
       ActionCable.server.broadcast "notifications:#{@user.id}", @invitation
     else
      render :js => "alert('使用者已加入此表單，請重新輸入')"
     end
    end
    respond_to do |format|
      format.js
    end
  end

  def agree_invite 
    @invitation = SearchUser.find(params[:id])
    @reply = params[:agree] 
    @board = Board.find(params[:board_id])
    if @reply == "true"
      @board.users << [current_user]
      @board.update(visibility: "Team")
      @invitation.destroy
    else
      @invitation.destroy
    end
    respond_to do |form|
      form.js
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
