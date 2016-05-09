# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create({email: 'gravityplanx@gmail.com', password: 'password'})

Game.create({name: 'Magic'})

Review.create({user: User.first, game: Game.first, red: 1, green: 1, white: 1, blue: 1, black: 1})