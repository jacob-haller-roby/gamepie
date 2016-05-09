class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :red, :white, :green, :black, :blue, :description, :myReview

  def myReview
    if current_user
      Review.where(:game_id => object.id, :user_id => current_user.id ).first
    end
  end
end
