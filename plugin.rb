# name: stock
# about:
# version: 0.1
# authors: JT

register_asset "javascripts/tekinvestor.js.es6"
register_asset "javascripts/jquery.easy-autocomplete.min.js"
register_asset "javascripts/charting_library/datafeed/udf/datafeed.js"
register_asset "javascripts/charting_library/charting_library.min.js"

require 'net/http'

gem 'drip-ruby', '3.3.1', {require: false}
require 'drip'

load File.expand_path("../stock.rb", __FILE__)


StockPlugin = StockPlugin

require_relative "lib/symbol_search"

after_initialize do
  #load File.expand_path("../app/controllers/topics_controller.rb", __FILE__)
  # load jobs
  load File.expand_path("../app/jobs/scheduled/email_export.rb", __FILE__)
  load File.expand_path("../app/jobs/scheduled/update_stock_info.rb", __FILE__)
  load File.expand_path("../app/jobs/scheduled/update_stocks.rb", __FILE__)
  load File.expand_path("../app/jobs/scheduled/update_cryptocurrencies.rb", __FILE__)
  load File.expand_path("../app/jobs/scheduled/update_tekindex.rb", __FILE__)
  load File.expand_path("../app/jobs/scheduled/generate_chat_tokens.rb", __FILE__)

  module StockPlugin

    class Engine < ::Rails::Engine
      engine_name "stock_plugin"
      isolate_namespace StockPlugin
    end

    class StockController < ActionController::Base
      include CurrentUser

      def get_stocks_favorite_count
        if !params[:ticker].nil?

          stock_favorite_count = ::PluginStore.get("stock_favorite_count", params[:ticker])

          if stock_favorite_count.nil?
            ::PluginStore.set("stock_favorite_count", params[:ticker], 0)
          end

          render json: ::PluginStore.get("stock_favorite_count", params[:ticker]).to_i

        end
      end

      def update_stocks_favorite_count(ticker)

        if !params[:ticker].nil?

        # TODO: rewrite below as sidekiq job

        #  stock_favorite_count = ::PluginStore.get("stock_favorite_count", params[:ticker])

         # if stock_favorite_count.nil?
          #  ::PluginStore.set("stock_favorite_count", params[:ticker], 0)
          #else
           # ::PluginStore.set("stock_favorite_count", params[:ticker], stock_favorite_count.to_i - 1)
          #nd

        end
      end

      def add_stock_to_users_favorite_stocks
        if !current_user.nil?
          update_stocks_favorite_count(params[:ticker])
          stocks_array = current_user.custom_fields["favorite_stocks"]

          if !stocks_array.nil?
            stocks_array = stocks_array.split(',')
            stocks_array = stocks_array.push(params[:ticker]).uniq
          else
            stocks_array = [params[:ticker]]
          end

          current_user.custom_fields["favorite_stocks"] = stocks_array.join(",")
          current_user.save

          # update this stock immediately so it can show in the list of stocks if its a new stock we havent seen before
          Jobs::UpdateStocks.new.import_all_stocks_from_rapidapi([params[:ticker]]) if ::PluginStore.get("stock_price", params[:ticker]).nil?

          render json: { message: stocks_array.join(",") }
          #render json: { message: "added OK" }
        else
          render json: { message: "not logged in" }
        end
      end

    def remove_stock_from_users_favorite_stocks
        if !current_user.nil?
          update_stocks_favorite_count(params[:ticker])

          stocks_array = current_user.custom_fields["favorite_stocks"]

          if !stocks_array.nil?
            stocks_array = stocks_array.split(',')
            stocks_array.map!(&:downcase)
            stocks_array.delete(params[:ticker])
          end

          current_user.custom_fields["favorite_stocks"] = stocks_array.join(",")
          current_user.save
          #render json: { message: stocks_array.join(",") }
          render json: { message: "removed OK" }
        else
          render json: { message: "not logged in" }
        end
      end

      def get_users_favorite_stocks
        if !current_user.nil?

          #loop through users favorite stocks

          @stock_data = []
          @stocks_symbol = []
          @stocks_last_updated = []
          @stocks_price = []
          @stocks_change_percent = []

          current_favorite_stocks_array = current_user.custom_fields["favorite_stocks"]

          if !current_favorite_stocks_array.nil?

            current_user.custom_fields["favorite_stocks"].split(',').each do |ticker|

              #stock_last_updated = ::PluginStore.get("final2_stock_data_last_values_last_updated", ticker)

              # if no data, update now
              #if stock_last_updated.nil? || stock_last_updated == ''
                #set_stock_data(ticker)
                # todo: trigger sidekiq job to update one stock!
              #end

              @stock_price = ::PluginStore.get("stock_price", ticker)
              @stock_change_percent = ::PluginStore.get("stock_change_percent", ticker)
              @stock_last_updated = ::PluginStore.get("stock_last_updated", ticker)

              # if stock not yet has data (not retrieved by scheduled job yet)
              if @stock_price.nil?
                @stock_price = "0"
                @stock_change_percent = "0"
                @stock_last_updated = "0"
              end

              @stock_data = @stock_data << [ticker, @stock_price, @stock_change_percent, @stock_last_updated]

              #puts @stocks_data

            end
          end

          render json: @stock_data

        else
          render json: { message: "not logged in" }
        end
      end

      def get_tekindex_stocks

          #loop through users favorite stocks
          @stock_data = []
          @tekindex = ::PluginStore.get("tekinvestor", "tekindex_stocks").split(",").uniq #created in update_tekindex_job

          @tekindex[0...99].reverse.each do |ticker|

            ticker = ticker.downcase
            @stock_price = ::PluginStore.get("stock_price", ticker)
            @stock_change_percent = ::PluginStore.get("stock_change_percent", ticker)
            @stock_last_updated = ::PluginStore.get("stock_last_updated", ticker)

            @stock_data = @stock_data << [ticker, @stock_price, @stock_change_percent, @stock_last_updated]

          end

          render json: @stock_data

      end

      def set_stock_data (ticker)

        # TODO: rewrite as sidekiq job
        #if !ticker.nil?

         # stock = StockQuote::Stock.quote(ticker).to_json

          #::PluginStore.set("final2_stock_data_last_values", ticker.downcase, stock)
          #::PluginStore.set("final2_stock_data_last_values_last_updated", ticker.downcase, Time.now.to_i)

        #end

      end

      def get_stock_data(ticker)
        if ticker.nil?
          ::PluginStore.get('final2_stock_data_last_values', ticker)
        end
      end

      def symbol_search
#
#           puts "searching for symbol.."
#           puts params[:ticker]
#
#           source = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?region=US&q=" + params[:ticker]
#
#           uri = URI.parse(source)
#           http = Net::HTTP.new(uri.host, uri.port)
#            #= "Authorization: key=34750c705518e0927e0e16f87f65ee60";
#           http.use_ssl = true
#           http.verify_mode = OpenSSL::SSL::VERIFY_NONE
#           request_header = { "X-RapidAPI-Host" => "apidojo-yahoo-finance-v1.p.rapidapi.com", "X-RapidAPI-Key" => "ee6e3e1f1dmshe3286ace2bfae9ap12f657jsn9c02a0696281" }
#           request = Net::HTTP::Get.new(uri.request_uri, request_header)
#           result = http.request(request)
#
# #         puts response
#           #puts result.body
#           result = JSON.parse(result.body)
#
#           # do it again to get Oslo stocks
#
#           source2 = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?region=US&q=" + params[:ticker] + ".OL"
#
#           uri = URI.parse(source2)
#           http = Net::HTTP.new(uri.host, uri.port)
#            #= "Authorization: key=34750c705518e0927e0e16f87f65ee60";
#           http.use_ssl = true
#           http.verify_mode = OpenSSL::SSL::VERIFY_NONE
#           request_header = { "X-RapidAPI-Host" => "apidojo-yahoo-finance-v1.p.rapidapi.com", "X-RapidAPI-Key" => "ee6e3e1f1dmshe3286ace2bfae9ap12f657jsn9c02a0696281" }
#           request = Net::HTTP::Get.new(uri.request_uri, request_header)
#           result2 = http.request(request)
#           #puts result2.body
#
#
#           result2 = JSON.parse(result2.body)
#
#
#           # sort by putting norwegian stocks first
#           important_stocks = []
#           the_rest = []
#
#           result["quotes"].each do |stock|
#
#             if stock['symbol'].include? ".OL"
#                 important_stocks.push(stock)
#             else
#                 the_rest.push(stock)
#             end
#
#           end
#
#           result2["quotes"].each do |stock|
#
#             if stock['symbol'].include? ".OL"
#                 important_stocks.push(stock)
#             end
#
#           end
#
#           stocks = important_stocks + the_rest
#
#           #puts stocks
#
#           render json: stocks

        render json: SymbolSearch.get_cached_symbols(params[:ticker])
      end

      def is_user_insider
        if !current_user.nil?

          # data we need to generate token
          userID = current_user.id
          username = current_user.username
          userEmail = UserEmail.find_by_user_id(userID).email

          group = Group.find_by("lower(name) = ?", "insider")

          # find chat token set for this user
          # token is used in js to load chat with proper username and avatar

          if group && GroupUser.where(user_id: current_user.id, group_id: group.id).exists?

            # generate new iflychat token on every page load

            chat_role = "participant"

            if userID == 1 || current_user.username == "pdx" # if pdx
              chat_role = "admin"
            end

            user_profile_url = "https://tekinvestor.no/users/" + current_user.username
            avatarURL = current_user.small_avatar_url

            data = {
              api_key: "6nbB6SkMfI09ZGnX8raYQDB4Gae414GS8Hbezx2lJR4W53860",
              app_id: "28df8c16-d97d-4a2a-8819-167d07c4f3b5",
              user_name: username,
              user_id: userID.to_s,
              chat_role: chat_role,
              user_profile_url: user_profile_url,
              user_avatar_url: avatarURL
            }

#            puts data

            # generate token

              url = URI.parse('https://api.iflychat.com/api/1.1/token/generate')
              http = Net::HTTP.new(url.host, url.port)
              http.use_ssl = true

              request = Net::HTTP::Post.new(url, {'Content-Type' => 'application/json'})
              request.set_form_data(data)

              response = http.request(request)

              # assign token to user
              unless response.body == nil
#                puts response.body
                hash = JSON.parse response.body

                unless hash["key"] == nil || hash["key"] == ""
#                  puts "assigning token " + hash["key"]
                  current_user.custom_fields["iflychat_token"] = hash["key"]
                  current_user.save
                end
              end

              chat_token = nil
              chat_token = current_user.custom_fields["iflychat_token"]


            render json: { insider: true, chat_token: chat_token, email: userEmail, username: username, userid: userID }
          else
            render json: { insider: false, email: userEmail, username: username, userid: userID }
          end

        else
          render json: { message: "not logged in" }

        end
        return
      end


      # user stock price

      def set_user_stock

        ::PluginStore.set("user_stock", current_user.id.to_s, params[:value])
        render json: nil
        return
      end

      def get_user_stock

        render json: ::PluginStore.get("user_stock", current_user.id.to_s)
        return

      end

      # user avg stock price

      def set_user_average_price

        ::PluginStore.set("user_average_price", current_user.id.to_s, params[:value])
        render json: nil
        return
      end

      def get_user_average_price

        render json: ::PluginStore.get("user_average_price", current_user.id.to_s)
        return

      end

    end

  end

  StockPlugin::Engine.routes.draw do
    get '/stock_data' => 'stock#stock_data'
    get '/user_stock' => 'stock#get_user_stock'
    get '/set_user_stock' => 'stock#set_user_stock'

    get '/is_user_insider' => 'stock#is_user_insider'
    get '/get_users_favorite_stocks' => 'stock#get_users_favorite_stocks'
    get '/add_stock_to_users_favorite_stocks' => 'stock#add_stock_to_users_favorite_stocks'
    get '/remove_stock_from_users_favorite_stocks' => 'stock#remove_stock_from_users_favorite_stocks'

    get '/get_tekindex_stocks' => 'stock#get_tekindex_stocks'

    get '/symbol_search' => 'stock#symbol_search'

    get '/user_average_price' => 'stock#get_user_average_price'
    get '/set_user_average_price' => 'stock#set_user_average_price'
  end

  Discourse::Application.routes.append do
    mount ::StockPlugin::Engine, at: '/stock'
  end

  module ::Jobs
    class SymbolSearchQueue < ::Jobs::Scheduled
      every 5.minutes

      def execute(args)
        return if Rails.env.development?

        SymbolSearch.process_queue
      end
    end
  end
end
