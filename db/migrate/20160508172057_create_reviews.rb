class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|

      t.timestamps null: false
      t.integer :game_id
      t.integer :user_id
      t.integer :white
      t.integer :black
      t.integer :green
      t.integer :blue
      t.integer :red
    end
  end
end
