class Project < ApplicationRecord
  belongs_to :user
  has_many :time_logs
end

