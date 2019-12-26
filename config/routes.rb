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
      delete :refuse_invite
    end
  end



  resources :cards do 
    resources :comments, only: [:create, :destroy]
  end  

  resources :board_messages, only: [:new, :create, :destroy]

  # devise使用者登錄
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
