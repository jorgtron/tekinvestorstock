module Jobs
  class UpdateTekindex < ::Jobs::Scheduled

  	include Sidekiq::Worker

    every 12.hours

    def execute(args)


    	  # find all stocks for tekindex

        @tickers = []
        long_string_of_all_favorited_tickers = ""

        # find all favorited stocks
     	  puts "Tekindex: Finding all favorited stocks by active users"

        User.where("last_seen_at > ?", 4.weeks.ago).each do |user|

  		  	puts "finding favorites for user id: #{user.id}"

  		  	unless user.custom_fields["favorite_stocks"].nil? || user.custom_fields["favorite_stocks"].empty?

    		  	users_favorite_stocks = user.custom_fields["favorite_stocks"].split(',')
    				unless users_favorite_stocks.nil?
              long_string_of_all_favorited_tickers = long_string_of_all_favorited_tickers + users_favorite_stocks.to_s.downcase
            end

            puts users_favorite_stocks

    				# add to array

    				@tickers.concat users_favorite_stocks

    			end

  		  end

        # remove duplicates
        @tickers = @tickers.uniq
	@tickers = @tickers.flatten

        # sort alphabetically

        @tickers = @tickers.sort_by { |ticker| ticker.downcase }
        @tickers.map!(&:downcase)

        # remove duplicates
        @tickers = @tickers.uniq

        puts @tickers


        puts long_string_of_all_favorited_tickers

        # find how many users have faved each stock, add to array as [ticker, count]

        ticker_with_count_array = []

        @tickers.each do |ticker|
          count = long_string_of_all_favorited_tickers.downcase.scan(ticker.downcase).size
          puts ticker + ":" + count.to_s + " have faved"
          new_array = [ticker, count]
	  # sometimes erroneous tickers get added (not sure why, but lets remove them)
	  unless ticker.downcase == "nan" || ticker.downcase == "b" || ticker.downcase == "u" || ticker.downcase == "pci" || ticker.downcase == "nano" || ticker.downcase == "t"  || ticker.downcase == "o"  || ticker.downcase == "bg" || ticker.downcase == "nano.ol" || ticker.downcase == "kahoot-me.ol" || ticker.downcase == "ultimo.ol"
        	  ticker_with_count_array.push(new_array)
	  end
        end

        # sort by count

        ticker_with_count_array = ticker_with_count_array.sort_by(&:last).reverse
        puts ticker_with_count_array.to_s

        # split and store in plugin store

        ticker_array = ticker_with_count_array.collect(&:first)
        puts ticker_array.to_s
        ::PluginStore.set("tekinvestor", "tekindex_stocks", ticker_array.join(","))

    end

  end
end
