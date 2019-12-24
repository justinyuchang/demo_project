class CommentsController < ApplicationController
  before_action :find_card, only: [:create]

  

  def create 
    @comment = @card.comments.build(comment_params)
    if @comment.save 
      redirect_to card_path(@card.id)
    else
      redirect_to card_path(@card.id)
    end
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
