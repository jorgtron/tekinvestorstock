module Jobs
  class UpdateCryptocurrencies < ::Jobs::Scheduled

  	include Sidekiq::Worker

    every 10.minutes

    def execute(args)

      # find all cryptocurrencies (at the moment, yahoo finance lookup api does not have all of the ccs that cryptonator has prices for, but we store all the prices from cryptonator)

      source = "https://api.coinmarketcap.com/v1/ticker/?limit=0"
      puts source

      resp = Net::HTTP.get_response(URI.parse(source))

      puts "code: "
      puts resp.code

      if resp.code == "200" # skip next steps if any error (no stock data etc)
        puts "1"
        data = resp.body
        #puts data

        result = JSON.parse(resp.body)
        puts result

        #puts result

        if !result.nil?
          result.each do |row|

            #puts row["symbol"]
            ticker = row["symbol"]

            price = 0
            price_btc = 0
            last_updated = 0
            change_percent = 0

            price = row["price_usd"].to_f.round(2) unless row["price_usd"].nil?
            price_btc = row["price_btc"].to_f.round(2) unless row["price_btc"].nil?
            #change_absolute = result["ticker"]["change"].to_f
            last_updated = row["last_updated"] unless row["last_updated"].nil?

            change_percent = row["percent_change_24h"] + "%" unless row["percent_change_24h"].nil?

            puts "storing: #{ticker}-usd & #{ticker}-btc / #{price} / #{change_percent}"

            # store USD prices

            ::PluginStore.set("stock_price", ticker.downcase + "-usd", price.to_s)
            ::PluginStore.set("stock_change_percent", ticker.downcase + "-usd", change_percent.to_s)
            ::PluginStore.set("stock_last_updated", ticker.downcase + "-usd", last_updated.to_s)

            ::PluginStore.set("stock_price", ticker.downcase + "-btc", price_btc.to_s)
            ::PluginStore.set("stock_change_percent", ticker.downcase + "-btc", change_percent.to_s)
            ::PluginStore.set("stock_last_updated", ticker.downcase + "-btc", last_updated.to_s)

            #puts "stored data"
            #puts ::PluginStore.get("stock_price", ticker + "-USD")
            #puts ::PluginStore.get("stock_change_percent", ticker + "-USD")
            #puts ::PluginStore.get("stock_price", ticker + "-BTC")
            #puts ::PluginStore.get("stock_change_percent", ticker + "-BTC")

            #puts "end2"


          end


        end

      end

    end

  end
end
