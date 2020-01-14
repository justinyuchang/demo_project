class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :congigure_permitted_parameters, if: :devise_controller?

  private

  def  congigure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update, keys: [:attribute, :avatar])
  end
  
end
