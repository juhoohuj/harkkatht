class RenameTimelogsToTimeLogs < ActiveRecord::Migration[6.1]
  def change
    rename_table :timelogs, :time_logs
  end
end

