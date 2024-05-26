Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations' }

  resources :projects do
    member do
      post 'add_user'
    end
    resources :time_logs, only: [:create, :update, :destroy]
  end

  devise_scope :user do
    post 'register', to: 'registrations#create'
  end

  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  get 'authenticated', to: 'sessions#authenticated'
end
