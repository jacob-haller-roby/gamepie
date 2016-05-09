class Api::ReviewsController < ApplicationController

  def show
    render json: Review.all, :root => false
  end

  def create
    params[:user_id] = current_user.id
    puts current_user.id
    review = Review.create(review_params)
    render json: review, :root => false
  end

  def update
    Review.find(params[:id]).update!(review_params)
    render json: Review.find(params[:id]), :root => false
  end

  def my_review
    render json: Review.where(user_id: current_user.id, game_id: params[:game_id]).first, :root => false
  end


  protected

  def review_params
    params.permit(:game_id, :user_id, :white, :black, :green, :red, :blue)
  end


end
