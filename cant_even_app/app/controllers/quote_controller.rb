class QuoteController < ApplicationController
  def index
    url = ""
    response = HTTParty.get(url)
    parsed_body = JSON.parse(response.body)
    render json: parsed_body
  end
end
