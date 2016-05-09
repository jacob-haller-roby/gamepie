class Api::GamesController < ApplicationController
  def index
    render :json => Game.all, :root => false
  end

  def show
    render json: Game.find(params[:id]), :root => false
  end

  def calculate
    game = Game.find(params[:game_id])

    red = black = green = blue = white = 0
    game.reviews.each do |review|
      red += review.red
      black += review.black
      blue += review.blue
      white += review.white
      green += review.green
    end

    count = game.reviews.count

    red = red.to_f/count
    blue = blue.to_f/count
    green = green.to_f/count
    black = black.to_f/count
    white = white.to_f/count

    game.update(red: red, white: white, black: black, green: green, blue: blue)

    render json: game, :root => false

  end
end
