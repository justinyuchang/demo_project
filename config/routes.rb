Rails.application.routes.draw do
  # 首頁
  root "boards#index"

  resources :boards, shallow: true do
    resources :lists, only: [:new, :create, :destroy]
    member  do
      post :searchuser
    end
    collection do
      put :agree_invite
    end
  end

  scope :lists do
    resources :cards, except: [:index] do
      put 'assign', on: :member
      post 'tagging', on: :member
      delete 'tearing', on: :member 

    resources :cards, except: [:index, :new, :edit] do
      resources :comments, only: [:create, :destroy]
      collection do
        patch :sort
      end
    end
  end 

  # resources :board_messages, only: [:new, :create, :destroy]

  # devise使用者登錄
  devise_for :users, controllers: {
                     sessions: "users/sessions",
                     registrations: "users/registrations",
                     omniauth_callbacks: 'users/omniauth_callbacks'
  }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
