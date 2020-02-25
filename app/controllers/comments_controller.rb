class CommentsController < ApplicationController
  before_action :find_card, only: [:create, :destroy]

  def create 
    @comment = @card.comments.create(comment_params)
    render json: @comment.comment_to_h
  end 

  private 
  def comment_params
    params.require(:comment)
          .permit(:content)
          .merge(user: current_user)
  end

  def find_card
    @card = Card.find(params[:card_id])
  end
end
