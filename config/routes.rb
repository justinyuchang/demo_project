Rails.application.routes.draw do
  root "boards#index"

  resources :boards, shallow: true do
    resources :lists, only: [:new, :create, :destroy] do
      collection do
        patch :sortlist
      end
    end
    member  do
      post :searchuser
    end
    collection do
      put :agree_invite
    end
  end

  scope :lists do
    resources :cards, except: [:index, :new, :edit] do
      put 'assign', on: :member
      resources :comments, only: [:create, :destroy]
      collection do
        patch :sortcard
      end
    end
  end 

  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
end
