class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    user = User.new(sign_up_params)
    if user.save
      sign_in(user)
      render json: { notice: 'Account created successfully' }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
