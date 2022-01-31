module SymbolSearch
  def self.queue_key
    "queue_symbol_search"
  end

  def self.get_queue
    queue = Discourse.redis.get(queue_key).to_s

    JSON.parse(queue) rescue []
  end

  def self.get_cached_symbols(symbol)
    symbol = symbol.to_s.downcase.strip

    return [] if symbol.blank?

    redis_key = "symbol_search_#{symbol}"

    cached = Discourse.redis.get(redis_key)

    if cached.blank?
      stocks = symbol_search(symbol)

      Discourse.redis.set(redis_key, stocks.to_json)
    else
      stocks = JSON.parse(cached)
    end

    queue = get_queue

    queue.push(symbol)
    queue = queue.uniq

    Discourse.redis.set(queue_key, queue.to_json)

    stocks
  end

  def self.process_queue
    queue = get_queue

    queue.size.times do
      symbol = queue.shift
      stocks = symbol_search(symbol)
      redis_key = "symbol_search_#{symbol}"

      Discourse.redis.set(redis_key, stocks.to_json)
      Discourse.redis.set(queue_key, queue.to_json)
    end
  end

  def self.symbol_search(symbol)
    puts "searching for symbol.."
    puts symbol

    source = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?region=US&q=" + symbol

    uri = URI.parse(source)
    http = Net::HTTP.new(uri.host, uri.port)
    #= "Authorization: key=34750c705518e0927e0e16f87f65ee60";
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request_header = { "X-RapidAPI-Host" => "apidojo-yahoo-finance-v1.p.rapidapi.com", "X-RapidAPI-Key" => "ee6e3e1f1dmshe3286ace2bfae9ap12f657jsn9c02a0696281" }
    request = Net::HTTP::Get.new(uri.request_uri, request_header)
    result = http.request(request)

    #         puts response
    #puts result.body
    result = JSON.parse(result.body)

    # do it again to get Oslo stocks

    source2 = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?region=US&q=" + symbol + ".OL"

    uri = URI.parse(source2)
    http = Net::HTTP.new(uri.host, uri.port)
    #= "Authorization: key=34750c705518e0927e0e16f87f65ee60";
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request_header = { "X-RapidAPI-Host" => "apidojo-yahoo-finance-v1.p.rapidapi.com", "X-RapidAPI-Key" => "ee6e3e1f1dmshe3286ace2bfae9ap12f657jsn9c02a0696281" }
    request = Net::HTTP::Get.new(uri.request_uri, request_header)
    result2 = http.request(request)
    #puts result2.body


    result2 = JSON.parse(result2.body)


    # sort by putting norwegian stocks first
    important_stocks = []
    the_rest = []

    result["quotes"].each do |stock|
      if stock['symbol'].include? ".OL"
         important_stocks.push(stock)
      else
         the_rest.push(stock)
      end
    end

    result2["quotes"].each do |stock|
      if stock['symbol'].include? ".OL"
         important_stocks.push(stock)
      end
    end

    stocks = important_stocks + the_rest

    #puts stocks

    stocks
  end
end
