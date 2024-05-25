class CreateTimelogs < ActiveRecord::Migration[7.1]
  def change
    create_table :timelogs do |t|
      t.references :project, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.decimal :hours
      t.text :description
      t.date :entry_date
      t.string :status

      t.timestamps
    end
  end
end
