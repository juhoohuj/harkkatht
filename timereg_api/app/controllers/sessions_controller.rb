class SessionsController < ApplicationController
  def create
    user = User.find_by(email: session_params[:email])
    if user&.valid_password?(session_params[:password])
      sign_in user
      render json: { notice: 'Logged in successfully' }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      sign_out current_user
      render json: { notice: 'Logged out successfully' }, status: :ok
    else
      render json: { error: 'No user is currently logged in' }, status: :unauthorized
    end
  end

  def authenticated
    if current_user
      render json: { authenticated: true, user: current_user }, status: :ok
    else
      render json: { authenticated: false }, status: :unauthorized
    end
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
