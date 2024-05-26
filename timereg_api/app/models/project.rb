class Project < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :time_logs, dependent: :destroy

  validates :name, presence: true
end
