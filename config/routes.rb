Rails.application.routes.draw do
  # 首頁
  root "boards#index"

  resources :boards
  resources :lists

  resources :cards do 
    resources :comments, only: [:create, :destroy]
  end  

  resources :board_messages

  # devise使用者登錄
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
