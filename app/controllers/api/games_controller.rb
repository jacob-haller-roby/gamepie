class Api::GamesController < ApplicationController
  def index
    render :json => Game.all, :root => false
  end

  def show
    render json: Game.find(params[:id]), :root => false
  end
end
