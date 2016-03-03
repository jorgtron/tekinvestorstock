module Jobs
  class UpdateStocks < Jobs::Scheduled

  	include Sidekiq::Worker

    every 5.minutes

    def execute(args)
      
    	  # find all stocks in tekindex
          
          @tickers = ["FUNCOM.OL", "STAR-A.ST", "STAR-B.ST", "GIG.OL", "BTCUSD=X", "NEL.OL", "THIN.OL", "OPERA.OL", "AGA.OL", "KIT.OL", "BIOTEC.OL", "NAS.OL", "NOM.OL", "BIRD.OL", "NEXT.OL"]

          # find all favorited stocks
		  puts "Finding all favorite stocks"

          User.find_each do |user|
		  	
		  	puts "finding favorites for user id: #{user.id}"
		  	
		  	unless user.custom_fields["favorite_stocks"].nil? || user.custom_fields["favorite_stocks"].empty?
		  		
		  		users_favorite_stocks = user.custom_fields["favorite_stocks"].split(',')
				puts users_favorite_stocks

				# add to array
				@tickers.concat users_favorite_stocks

			end
		  	
		  end

          # remove duplicates
          @tickers = @tickers.uniq

          # sort alphabetically

          @tickers = @tickers.sort_by { |ticker| ticker.downcase }
          @tickers.map!(&:downcase)

          set_stock_data(@tickers)  

    end

  	def set_stock_data (tickers)

  		# handles multiple stocks in one request
        if !tickers.nil? 
		      puts "Fetching stock data for #{tickers.size} stocks: #{tickers}"
        
          #tickers = ["FUNCOM.OL", "STAR-A.ST"]
          stocks = StockQuote::Stock.quote(tickers)

          puts "processing.."
          puts stocks.size
          puts "stocks"

  	      for index in 0 ... stocks.size

      		  puts "-- Processing: #{index}"

            unless stocks[index].symbol.nil? || stocks[index].symbol == ""

      		  	::PluginStore.set("final2_stock_data_last_values", stocks[index].symbol.downcase, stocks[index].to_json)
           		::PluginStore.set("final2_stock_data_last_values_last_updated", stocks[index].symbol.to_json, Time.now.to_i)
              
            end 
            
            #puts "#{stocks[index].to_json}"

  		    end

  		    puts "Done!"

        end

  	end

  end
end
