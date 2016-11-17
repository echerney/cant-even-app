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

  def destroy
    pp params
    deleted_quote = Quote.find(params[:id])
    deleted_quote.destroy

    render json: 'something'
  end


end
