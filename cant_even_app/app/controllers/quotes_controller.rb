require 'pp'
class QuotesController < ApplicationController
  def index

    render json: Quote.all
  end

  def create
    pp params
    saved_quote = {
      message: params[:message],
      subtitle: params[:subtitle]
    }

    pp saved_quote

    Quote.create(saved_quote)

    render json: 'something'
  end
end