Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations' }

  devise_scope :user do
    post 'register', to: 'registrations#create'
  end

  resources :projects do
    resources :time_logs, only: [:create, :update, :destroy, :index]
  end
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
end
