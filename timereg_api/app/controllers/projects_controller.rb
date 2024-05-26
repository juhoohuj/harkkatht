class ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: [:show, :update, :destroy, :add_user]
  before_action :authorize_user!, only: [:update, :destroy]

  def add_user
    @user = User.find_by(email: params[:email])
    if @user
      unless @project.users.include?(@user)
        @project.users << @user
        render json: { user: @user, message: 'User added successfully' }, status: :ok
      else
        render json: { message: 'User is already a member of the project' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  def index
    projects = current_user.projects
    render json: projects
  end

  def show
    render json: @project.to_json(include: [:time_logs, :users])
  end

  def create
    project = Project.new(project_params)
    project.users << current_user
    if project.save
      render json: project, status: :created
    else
      render json: project.errors, status: :unprocessable_entity
    end
  end

  def update
    if @project.update(project_params)
      render json: @project, status: :ok
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @project.destroy
    head :no_content
  end

  private

  def set_project
    @project = current_user.projects.find(params[:id])
  end

  def authorize_user!
    unless @project.users.include?(current_user)
      render json: { error: 'Not authorized' }, status: :forbidden
    end
  end

  def project_params
    params.require(:project).permit(:name, :description, :status, :start_date, :end_date)
  end
end
