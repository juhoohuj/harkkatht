class AddForeignKeyConstraintsToTimeLogs < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :time_logs, :projects unless foreign_key_exists?(:time_logs, :projects)
    add_foreign_key :time_logs, :users unless foreign_key_exists?(:time_logs, :users)
  end
end