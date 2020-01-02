class CommentsController < ApplicationController
  before_action :find_card, only: [:create, :destroy]

  def create 
    p "="*50
    p "#{comment_params}"
    p "="*50
    @comment = @card.comments.create(comment_params)
    render json: @comment
  end 

  def destroy
    @comment.destroy if @comment
    redirect_to card_path(@card.id)
  end 

  private 
  
  def comment_params
    params.require(:comment).permit(:content)
                            .merge(user: current_user)
  end

  def find_card
    @card = Card.find(params[:card_id])
  end
end
