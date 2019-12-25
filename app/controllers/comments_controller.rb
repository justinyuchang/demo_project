class CommentsController < ApplicationController
  before_action :find_card, only: [:create, :destroy]

  

  def create 
    @comment = @card.comments.build(comment_params)
    if @comment.save 
      respond_to do |format|
        format.js 
      end
    else
      redirect_to card_path(@card.id)
    end
  end 

  def destroy
    @comment.destroy if @comment
    redirect_to card_path(@card.id)
  end 

  private 
  
  def comment_params
    params.require(:comment).permit(:content,
                                    :card_id)
                            .merge(user: current_user)
  end

  def find_card
    @card = Card.find(params[:card_id])
  end
end
