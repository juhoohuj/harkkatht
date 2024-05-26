class TimeLogsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project
  before_action :set_time_log, only: [:update, :destroy]
  before_action :authorize_user!, only: [:update, :destroy]

  def create
    time_log = @project.time_logs.build(time_log_params)
    time_log.user = current_user
    if time_log.save
      render json: time_log, status: :created
    else
      render json: time_log.errors, status: :unprocessable_entity
    end
  end

  def update
    if @time_log.update(time_log_params)
      render json: @time_log, status: :ok
    else
      render json: @time_log.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @time_log.destroy
    head :no_content
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_time_log
    @time_log = @project.time_logs.find(params[:id])
  end

  def authorize_user!
    unless @time_log.user == current_user || @project.users.include?(current_user)
      render json: { error: 'Not authorized' }, status: :forbidden
    end
  end

  def time_log_params
    params.require(:time_log).permit(:description, :start_date, :end_date, :hours)
  end
end
