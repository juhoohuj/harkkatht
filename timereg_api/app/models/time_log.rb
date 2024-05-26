class TimeLog < ApplicationRecord
  belongs_to :project
  belongs_to :user

  validates :description, :entry_date, :hours, presence: true
end
