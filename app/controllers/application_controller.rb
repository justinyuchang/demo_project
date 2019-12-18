class ApplicationController < ActionController::Base
    #devise filters users
    before_action :authenticate_user!
end
