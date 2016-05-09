class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|

      t.timestamps null: false
      t.decimal :white, :precision => 3, :scale => 2
      t.decimal :black, :precision => 3, :scale => 2
      t.decimal :green, :precision => 3, :scale => 2
      t.decimal :blue, :precision => 3, :scale => 2
      t.decimal :red, :precision => 3, :scale => 2
      t.string :name
      t.string :description

    end
  end
end
