module Jobs
  class UpdateStockInfo < ::Jobs::Scheduled

  	include Sidekiq::Worker

    every 6.hours

    def execute(args)

      # find all new investment symbols faved and traded
      puts "get company name and description for all new investments:"

      #investments = ["AAPL", "FUNCOM.OL"]

      @tickers = []
        long_string_of_all_favorited_tickers = ""

        # find all favorited stocks
        puts "Finding all favorited stocks by active users"

        User.where("last_seen_at > ?", 12.weeks.ago).each do |user|

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

        # sort alphabetically

        @tickers = @tickers.sort_by { |ticker| ticker.downcase }
        @tickers.map!(&:downcase)

        # remove duplicates
        @tickers = @tickers.uniq

        puts @tickers


      source = "https://finance.yahoo.com/quote/"
      #puts source

      @tickers.each do |investment|

        if ::PluginStore.get("investment_name", investment.downcase).nil?

          puts "processing: " + investment
          investment.gsub! "usd=x", "-usd"
          investment.gsub! "eur=x", "-eur"

          resp = Net::HTTP.get_response(URI.parse(source + investment.upcase))

          puts "code: "
          puts resp.code

          if resp.code == "200" # skip next steps if any error (no stock data etc)

            puts "1"
            data = resp.body

            # find company name

            str1_markerstring = 'shortName":"'
            str2_markerstring = '",'

            investment_name = data[/#{str1_markerstring}(.*?)#{str2_markerstring}/m, 1]

            #remove suffixes from cryptos

            investment_name.slice! " USD"
            investment_name.slice! " EUR"
            investment_name.slice! " NOK"
            investment_name.slice! "=" # wont work with = in name

            puts "investment_name: " + investment_name

            unless investment_name.nil? || investment_name == ''
              puts "storing.."
              ::PluginStore.set("investment_name", investment.downcase, investment_name)

              # find company description (if avail)

              str1_markerstring = 'longBusinessSummary":"'
              str2_markerstring = '",'

              investment_description = data[/#{str1_markerstring}(.*?)#{str2_markerstring}/m, 1]

              unless investment_description.nil?
                investment_description.gsub! '\u002F', '/'
                puts "investment_description: " + investment_description

                ::PluginStore.set("investment_description", investment.downcase, investment_description)

              end

              #puts "stored data"
              #puts ::PluginStore.get("stock_price", ticker + "-USD")
              #puts ::PluginStore.get("stock_change_percent", ticker + "-USD")
              #puts ::PluginStore.get("stock_price", ticker + "-BTC")
              #puts ::PluginStore.get("stock_change_percent", ticker + "-BTC")



            end

          else
            puts "error retrieving page"
          end
          puts "done"
        else
          puts investment + " already stored, skipping"
        end
    end
end

end
end
