class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.valid_password?(params[:password])
      sign_in user
      render json: { notice: 'Logged in successfully' }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def destroy
    sign_out current_user
    render json: { notice: 'Logged out successfully' }, status: :ok
  end
end