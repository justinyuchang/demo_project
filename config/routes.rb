Rails.application.routes.draw do
  resources :boards
  resources :lists
  resources :cards
end
