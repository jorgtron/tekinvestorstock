module Jobs
  class GenerateChatTokens < ::Jobs::Scheduled

  	include Sidekiq::Worker

    every 6.hours

    def execute(args)

        puts "Finding all users"

        users = User.order(last_seen_at: :desc)
	group = Group.find_by("lower(name) = ?", "insider")

        users.each do |user|

  		  	puts "processing: " + user.username

          # we give tokens to all users, not just insiders, so one is already available when they become insiders
          #isInsider = false



          if group && GroupUser.where(user_id: user.id, group_id: group.id).exists?
            isInsider = true

            # data we need to generate token

            userID = user.id
            username = user.username

            chat_role = "participant"

            if userID == 1 || user.username == "pdx" # if pdx
              chat_role = "admin"
            end

            user_profile_url = "https://tekinvestor.no/users/" + user.username
            avatarURL = user.small_avatar_url

            data = {
              api_key: "6nbB6SkMfI09ZGnX8raYQDB4Gae414GS8Hbezx2lJR4W53860",
              app_id: "28df8c16-d97d-4a2a-8819-167d07c4f3b5",
              user_name: username,
              user_id: userID.to_s,
              chat_role: chat_role,
              user_profile_url: user_profile_url,
              user_avatar_url: avatarURL
            }

            puts data

            # generate token

            #if username == "pdx"  #for testing only

              puts "running import"

              #{:api_key=>"6nbB6SkMfI09ZGnX8raYQDB4Gae414GS8Hbezx2lJR4W53860", :app_id=>"28df8c16-d97d-4a2a-8819-167d07c4f3b5", :user_name=>"pdx", :user_id=>1, :chat_role=>"admin", :user_profile_url=>"https://tekinvestor.no/users/pdx", :user_avatar_url=>"//localhost:3000/user_avatar/localhost/pdx/45/1784_1.png"}

              url = URI.parse('https://api.iflychat.com/api/1.1/token/generate')
              http = Net::HTTP.new(url.host, url.port)
              http.use_ssl = true

              request = Net::HTTP::Post.new(url, {'Content-Type' => 'application/json'})
              request.set_form_data(data)

              response = http.request(request)

              # assign token to user
              unless response.body == nil
                puts response.body
                hash = JSON.parse response.body

                unless hash["key"] == nil || hash["key"] == ""
                  puts "assigning token " + hash["key"]
                  user.custom_fields["iflychat_token"] = hash["key"]
                  user.save
                end
              end
          #end

          else
            isInsider = false
          end

  		  end

        puts "complete"

      end

  end
end
