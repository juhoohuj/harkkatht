# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

user = User.create!(email: 'test@example.com', password: 'password', password_confirmation: 'password')

Project.create!(name: 'Project 1', description: 'First project', status: 'active', start_date: Date.today, end_date: Date.today + 10.days, user: user)
Project.create!(name: 'Project 2', description: 'Second project', status: 'completed', start_date: Date.today - 20.days, end_date: Date.today - 10.days, user: user)
