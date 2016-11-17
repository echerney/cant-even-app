class CreateQuotes < ActiveRecord::Migration[5.0]
  def change
    create_table :quotes do |t|
      t.integer :id
      t.string  :message
      t.string  :subtitle

      t.timestamps
    end
  end
end
