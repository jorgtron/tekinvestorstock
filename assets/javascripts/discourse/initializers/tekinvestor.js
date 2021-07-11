window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-61110015-1', 'auto');


/*
 * easy-autocomplete
 * jQuery plugin for autocompletion
 * 
 * @author Łukasz Pawełczak (http://github.com/pawelczak)
 * @version 1.3.3
 * Copyright MIT License: https://github.com/pawelczak/easy-autocomplete/blob/master/LICENSE.txt
 */

var EasyAutocomplete=function(a){return a.Configuration=function(a){function b(){if("xml"===a.dataType&&(a.getValue||(a.getValue=function(a){return $(a).text()}),a.list||(a.list={}),a.list.sort||(a.list.sort={}),a.list.sort.method=function(b,c){return b=a.getValue(b),c=a.getValue(c),c>b?-1:b>c?1:0},a.list.match||(a.list.match={}),a.list.match.method=function(b,c){return b=a.getValue(b),c=a.getValue(c),b===c?!0:!1}),void 0!==a.categories&&a.categories instanceof Array){for(var b=[],c=0,d=a.categories.length;d>c;c+=1){var e=a.categories[c];for(var f in h.categories[0])void 0===e[f]&&(e[f]=h.categories[0][f]);b.push(e)}a.categories=b}}function c(){function b(a,c){var d=a||{};for(var e in a)void 0!==c[e]&&null!==c[e]&&("object"!=typeof c[e]||c[e]instanceof Array?d[e]=c[e]:b(a[e],c[e]));return void 0!==c.data&&null!==c.data&&"object"==typeof c.data&&(d.data=c.data),d}h=b(h,a)}function d(){if("list-required"!==h.url&&"function"!=typeof h.url){var b=h.url;h.url=function(){return b}}if(void 0!==h.ajaxSettings.url&&"function"!=typeof h.ajaxSettings.url){var b=h.ajaxSettings.url;h.ajaxSettings.url=function(){return b}}if("string"==typeof h.listLocation){var c=h.listLocation;h.listLocation="XML"===h.dataType.toUpperCase()?function(a){return $(a).find(c)}:function(a){return a[c]}}if("string"==typeof h.getValue){var d=h.getValue;h.getValue=function(a){return a[d]}}void 0!==a.categories&&(h.categoriesAssigned=!0)}function e(){h.ajaxSettings=void 0!==a.ajaxSettings&&"object"==typeof a.ajaxSettings?a.ajaxSettings:{}}function f(a){return void 0!==h[a]&&null!==h[a]?!0:!1}function g(a,b){function c(b,e){for(var f in e)void 0===b[f]&&a.log("Property '"+f+"' does not exist in EasyAutocomplete options API."),"object"!=typeof b[f]||d(f)||c(b[f],e[f])}function d(a){var b=["ajaxSettings","template"];return Array.prototype.contains=function(a){for(var b=this.length;b--;)if(this[b]===a)return!0;return!1},b.contains(a)}c(h,b)}var h={data:"list-required",url:"list-required",dataType:"json",listLocation:function(a){return a},xmlElementName:"",getValue:function(a){return a},autocompleteOff:!0,placeholder:!1,ajaxCallback:function(){},matchResponseProperty:!1,list:{sort:{enabled:!1,method:function(a,b){return a=h.getValue(a),b=h.getValue(b),b>a?-1:a>b?1:0}},maxNumberOfElements:6,hideOnEmptyPhrase:!0,match:{enabled:!1,caseSensitive:!1,method:function(a,b){return a=h.getValue(a),b=h.getValue(b),a===b?!0:!1}},showAnimation:{type:"normal",time:400,callback:function(){}},hideAnimation:{type:"normal",time:400,callback:function(){}},onClickEvent:function(){},onSelectItemEvent:function(){},onLoadEvent:function(){},onChooseEvent:function(){},onKeyEnterEvent:function(){},onMouseOverEvent:function(){},onMouseOutEvent:function(){},onShowListEvent:function(){},onHideListEvent:function(){}},highlightPhrase:!0,theme:"",cssClasses:"",minCharNumber:0,requestDelay:0,adjustWidth:!0,ajaxSettings:{},preparePostData:function(a){return a},loggerEnabled:!0,template:"",categoriesAssigned:!1,categories:[{maxNumberOfElements:4}]};this.get=function(a){return h[a]},this.equals=function(a,b){return f(a)&&h[a]===b?!0:!1},this.checkDataUrlProperties=function(){return"list-required"===h.url&&"list-required"===h.data?!1:!0},this.checkRequiredProperties=function(){for(var a in h)if("required"===h[a])return logger.error("Option "+a+" must be defined"),!1;return!0},this.printPropertiesThatDoesntExist=function(a,b){g(a,b)},b(),c(),h.loggerEnabled===!0&&g(console,a),e(),d()},a}(EasyAutocomplete||{}),EasyAutocomplete=function(a){return a.Logger=function(){this.error=function(a){console.log("ERROR: "+a)},this.warning=function(a){console.log("WARNING: "+a)}},a}(EasyAutocomplete||{}),EasyAutocomplete=function(a){return a.Constans=function(){var a={CONTAINER_CLASS:"easy-autocomplete-container",CONTAINER_ID:"eac-container-",WRAPPER_CSS_CLASS:"easy-autocomplete"};this.getValue=function(b){return a[b]}},a}(EasyAutocomplete||{}),EasyAutocomplete=function(a){return a.ListBuilderService=function(a,b){function c(b,c){function d(){var d,e={};return void 0!==b.xmlElementName&&(e.xmlElementName=b.xmlElementName),void 0!==b.listLocation?d=b.listLocation:void 0!==a.get("listLocation")&&(d=a.get("listLocation")),void 0!==d?"string"==typeof d?e.data=$(c).find(d):"function"==typeof d&&(e.data=d(c)):e.data=c,e}function e(){var a={};return void 0!==b.listLocation?"string"==typeof b.listLocation?a.data=c[b.listLocation]:"function"==typeof b.listLocation&&(a.data=b.listLocation(c)):a.data=c,a}var f={};if(f="XML"===a.get("dataType").toUpperCase()?d():e(),void 0!==b.header&&(f.header=b.header),void 0!==b.maxNumberOfElements&&(f.maxNumberOfElements=b.maxNumberOfElements),void 0!==a.get("list").maxNumberOfElements&&(f.maxListSize=a.get("list").maxNumberOfElements),void 0!==b.getValue)if("string"==typeof b.getValue){var g=b.getValue;f.getValue=function(a){return a[g]}}else"function"==typeof b.getValue&&(f.getValue=b.getValue);else f.getValue=a.get("getValue");return f}function d(b){var c=[];return void 0===b.xmlElementName&&(b.xmlElementName=a.get("xmlElementName")),$(b.data).find(b.xmlElementName).each(function(){c.push(this)}),c}this.init=function(b){var c=[],d={};return d.data=a.get("listLocation")(b),d.getValue=a.get("getValue"),d.maxListSize=a.get("list").maxNumberOfElements,c.push(d),c},this.updateCategories=function(b,d){if(a.get("categoriesAssigned")){b=[];for(var e=0;e<a.get("categories").length;e+=1){var f=c(a.get("categories")[e],d);b.push(f)}}return b},this.convertXml=function(b){if("XML"===a.get("dataType").toUpperCase())for(var c=0;c<b.length;c+=1)b[c].data=d(b[c]);return b},this.processData=function(c,d){for(var e=0,f=c.length;f>e;e+=1)c[e].data=b(a,c[e],d);return c},this.checkIfDataExists=function(a){for(var b=0,c=a.length;c>b;b+=1)if(void 0!==a[b].data&&a[b].data instanceof Array&&a[b].data.length>0)return!0;return!1}},a}(EasyAutocomplete||{}),EasyAutocomplete=function(a){return a.proccess=function(a,b,c){function d(b,c){var d=[],e="";if(a.get("list").match.enabled)for(var f=0,g=b.length;g>f;f+=1)e=a.get("getValue")(b[f]),a.get("list").match.caseSensitive||("string"==typeof e&&(e=e.toLowerCase()),c=c.toLowerCase()),e.search(c)>-1&&d.push(b[f]);else d=b;return d}function e(a){return void 0!==b.maxNumberOfElements&&a.length>b.maxNumberOfElements&&(a=a.slice(0,b.maxNumberOfElements)),a}function f(b){return a.get("list").sort.enabled&&b.sort(a.get("list").sort.method),b}var g=b.data,h=c;return g=d(g,h),g=e(g),g=f(g)},a}(EasyAutocomplete||{}),EasyAutocomplete=function(a){return a.Template=function(a){var b={basic:{type:"basic",method:function(a){return a},cssClass:""},description:{type:"description",fields:{description:"description"},method:function(a){return a+" - description"},cssClass:"eac-description"},iconLeft:{type:"iconLeft",fields:{icon:""},method:function(a){return a},cssClass:"eac-icon-left"},iconRight:{type:"iconRight",fields:{iconSrc:""},method:function(a){return a},cssClass:"eac-icon-right"},links:{type:"links",fields:{link:""},method:function(a){return a},cssClass:""},custom:{type:"custom",method:function(){},cssClass:""}},c=function(a){var c,d=a.fields;return"description"===a.type?(c=b.description.method,"string"==typeof d.description?c=function(a,b){return a+" - <span>"+b[d.description]+"</span>"}:"function"==typeof d.description&&(c=function(a,b){return a+" - <span>"+d.description(b)+"</span>"}),c):"iconRight"===a.type?("string"==typeof d.iconSrc?c=function(a,b){return a+"<img class='eac-icon' src='"+b[d.iconSrc]+"' />"}:"function"==typeof d.iconSrc&&(c=function(a,b){return a+"<img class='eac-icon' src='"+d.iconSrc(b)+"' />"}),c):"iconLeft"===a.type?("string"==typeof d.iconSrc?c=function(a,b){return"<img class='eac-icon' src='"+b[d.iconSrc]+"' />"+a}:"function"==typeof d.iconSrc&&(c=function(a,b){return"<img class='eac-icon' src='"+d.iconSrc(b)+"' />"+a}),c):"links"===a.type?("string"==typeof d.link?c=function(a,b){return"<a href='"+b[d.link]+"' >"+a+"</a>"}:"function"==typeof d.link&&(c=function(a,b){return"<a href='"+d.link(b)+"' >"+a+"</a>"}),c):"custom"===a.type?a.method:b.basic.method},d=function(a){return a&&a.type&&a.type&&b[a.type]?c(a):b.basic.method},e=function(a){var c=function(){return""};return a&&a.type&&a.type&&b[a.type]?function(){var c=b[a.type].cssClass;return function(){return c}}():c};this.getTemplateClass=e(a),this.build=d(a)},a}(EasyAutocomplete||{}),EasyAutocomplete=function(a){return a.main=function(b,c){function d(){return 0===t.length?void p.error("Input field doesn't exist."):o.checkDataUrlProperties()?o.checkRequiredProperties()?(e(),void g()):void p.error("Will not work without mentioned properties."):void p.error("One of options variables 'data' or 'url' must be defined.")}function e(){function a(){var a=$("<div>"),c=n.getValue("WRAPPER_CSS_CLASS");o.get("theme")&&""!==o.get("theme")&&(c+=" eac-"+o.get("theme")),o.get("cssClasses")&&""!==o.get("cssClasses")&&(c+=" "+o.get("cssClasses")),""!==q.getTemplateClass()&&(c+=" "+q.getTemplateClass()),a.addClass(c),t.wrap(a),o.get("adjustWidth")===!0&&b()}function b(){var a=t.outerWidth();t.parent().css("width",a)}function c(){t.unwrap()}function d(){var a=$("<div>").addClass(n.getValue("CONTAINER_CLASS"));a.attr("id",f()).prepend($("<ul>")),function(){a.on("show.eac",function(){switch(o.get("list").showAnimation.type){case"slide":var b=o.get("list").showAnimation.time,c=o.get("list").showAnimation.callback;a.find("ul").slideDown(b,c);break;case"fade":var b=o.get("list").showAnimation.time,c=o.get("list").showAnimation.callback;a.find("ul").fadeIn(b),c;break;default:a.find("ul").show()}o.get("list").onShowListEvent()}).on("hide.eac",function(){switch(o.get("list").hideAnimation.type){case"slide":var b=o.get("list").hideAnimation.time,c=o.get("list").hideAnimation.callback;a.find("ul").slideUp(b,c);break;case"fade":var b=o.get("list").hideAnimation.time,c=o.get("list").hideAnimation.callback;a.find("ul").fadeOut(b,c);break;default:a.find("ul").hide()}o.get("list").onHideListEvent()}).on("selectElement.eac",function(){a.find("ul li").removeClass("selected"),a.find("ul li").eq(w).addClass("selected"),o.get("list").onSelectItemEvent()}).on("loadElements.eac",function(b,c,d){var e="",f=a.find("ul");f.empty().detach(),v=[];for(var h=0,i=0,k=c.length;k>i;i+=1){var l=c[i].data;if(0!==l.length){void 0!==c[i].header&&c[i].header.length>0&&f.append("<div class='eac-category' >"+c[i].header+"</div>");for(var m=0,n=l.length;n>m&&h<c[i].maxListSize;m+=1)e=$("<li><div class='eac-item'></div></li>"),function(){var a=m,b=h,f=c[i].getValue(l[a]);e.find(" > div").on("click",function(){t.val(f).trigger("change"),w=b,j(b),o.get("list").onClickEvent(),o.get("list").onChooseEvent()}).mouseover(function(){w=b,j(b),o.get("list").onMouseOverEvent()}).mouseout(function(){o.get("list").onMouseOutEvent()}).html(q.build(g(f,d),l[a]))}(),f.append(e),v.push(l[m]),h+=1}}a.append(f),o.get("list").onLoadEvent()})}(),t.after(a)}function e(){t.next("."+n.getValue("CONTAINER_CLASS")).remove()}function g(a,b){return o.get("highlightPhrase")&&""!==b?i(a,b):a}function h(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}function i(a,b){var c=h(b);return(a+"").replace(new RegExp("("+c+")","gi"),"<b>$1</b>")}t.parent().hasClass(n.getValue("WRAPPER_CSS_CLASS"))&&(e(),c()),a(),d(),u=$("#"+f()),o.get("placeholder")&&t.attr("placeholder",o.get("placeholder"))}function f(){var a=t.attr("id");return a=n.getValue("CONTAINER_ID")+a}function g(){function a(){s("autocompleteOff",!0)&&g(),b(),c(),d(),e(),f()}function b(){t.off("keyup").keyup(function(a){function b(a){function b(){var a={},b=o.get("ajaxSettings")||{};for(var c in b)a[c]=b[c];return a}function c(a,b){return o.get("matchResponseProperty")!==!1?"string"==typeof o.get("matchResponseProperty")?b[o.get("matchResponseProperty")]===a:"function"==typeof o.get("matchResponseProperty")?o.get("matchResponseProperty")(b)===a:!0:!0}if(!(a.length<o.get("minCharNumber"))){if("list-required"!==o.get("data")){var d=o.get("data"),e=r.init(d);e=r.updateCategories(e,d),e=r.processData(e,a),k(e,a),t.parent().find("li").length>0?h():i()}var f=b();(void 0===f.url||""===f.url)&&(f.url=o.get("url")),(void 0===f.dataType||""===f.dataType)&&(f.dataType=o.get("dataType")),void 0!==f.url&&"list-required"!==f.url&&(f.url=f.url(a),f.data=o.get("preparePostData")(f.data,a),$.ajax(f).done(function(b){var d=r.init(b);d=r.updateCategories(d,b),d=r.convertXml(d),c(a,b)&&(d=r.processData(d,a),k(d,a)),r.checkIfDataExists(d)&&t.parent().find("li").length>0?h():i(),o.get("ajaxCallback")()}).fail(function(){p.warning("Fail to load response data")}).always(function(){}))}}switch(a.keyCode){case 27:i(),l();break;case 38:a.preventDefault(),v.length>0&&w>0&&(w-=1,t.val(o.get("getValue")(v[w])),j(w));break;case 40:a.preventDefault(),v.length>0&&w<v.length-1&&(w+=1,t.val(o.get("getValue")(v[w])),j(w));break;default:if(a.keyCode>40||8===a.keyCode){var c=t.val();o.get("list").hideOnEmptyPhrase!==!0||8!==a.keyCode||""!==c?o.get("requestDelay")>0?(void 0!==m&&clearTimeout(m),m=setTimeout(function(){b(c)},o.get("requestDelay"))):b(c):i()}}})}function c(){t.on("keydown",function(a){a=a||window.event;var b=a.keyCode;return 38===b?(suppressKeypress=!0,!1):void 0}).keydown(function(a){13===a.keyCode&&w>-1&&(t.val(o.get("getValue")(v[w])),o.get("list").onKeyEnterEvent(),o.get("list").onChooseEvent(),w=-1,i(),a.preventDefault())})}function d(){t.off("keypress")}function e(){t.focus(function(){""!==t.val()&&v.length>0&&(w=-1,h())})}function f(){t.blur(function(){setTimeout(function(){w=-1,i()},250)})}function g(){t.attr("autocomplete","off")}a()}function h(){u.trigger("show.eac")}function i(){u.trigger("hide.eac")}function j(a){u.trigger("selectElement.eac",a)}function k(a,b){u.trigger("loadElements.eac",[a,b])}function l(){t.trigger("blur")}var m,n=new a.Constans,o=new a.Configuration(c),p=new a.Logger,q=new a.Template(c.template),r=new a.ListBuilderService(o,a.proccess),s=o.equals,t=b,u="",v=[],w=-1;a.consts=n,this.getConstants=function(){return n},this.getConfiguration=function(){return o},this.getContainer=function(){return u},this.getSelectedItemIndex=function(){return w},this.getItemData=function(a){return v.length<a||void 0===v[a]?-1:v[a]},this.getSelectedItemData=function(){return this.getItemData(w)},this.build=function(){e()},this.init=function(){d()}},a.easyAutocompleteHandles=[],a.inputHasId=function(a){return void 0!==$(a).attr("id")&&$(a).attr("id").length>0?!0:!1},a.assignRandomId=function(b){var c="";do c="eac-"+Math.floor(1e4*Math.random());while(0!==$("#"+c).length);elementId=a.consts.getValue("CONTAINER_ID")+c,$(b).attr("id",c)},a}(EasyAutocomplete||{});$.fn.easyAutocomplete=function(a){return this.each(function(){var b=$(this),c=new EasyAutocomplete.main(b,a);EasyAutocomplete.inputHasId(b)||EasyAutocomplete.assignRandomId(b),c.init(),EasyAutocomplete.easyAutocompleteHandles[b.attr("id")]=c})},$.fn.getSelectedItemIndex=function(){var a=$(this).attr("id");return void 0!==a?EasyAutocomplete.easyAutocompleteHandles[a].getSelectedItemIndex():-1},$.fn.getItemData=function(a){var b=$(this).attr("id");return void 0!==b&&a>-1?EasyAutocomplete.easyAutocompleteHandles[b].getItemData(a):-1},$.fn.getSelectedItemData=function(){var a=$(this).attr("id");return void 0!==a?EasyAutocomplete.easyAutocompleteHandles[a].getSelectedItemData():-1};

  setTimeout(function(){

      //if($('li.current-user').length > 0 && $('li.current-user').html().indexOf('pdx') != -1) { loggedIn = true; } else { loggedIn = false;  }
      if($('li.current-user').length > 0 ) { loggedIn = true; } else { loggedIn = false;  }
      if($('#home-page').length > 0 && $('#col-2').length > 0) { homePage = true; } else { homePage = false; }
      if($('.stock-chart').length > 0 ) { stockPage = true; } else { stockPage = false; }
      
      if(homePage){
        
        if(loggedIn){ 
          displayUsersFavoriteStocks(false); 
          checkIfUserIsInsider(); 
          initSearchField();

        }

        displayTekIndex(false);
        console.log('refreshing stocks'); 
      }

      // add notice in fav stocks box if not signed in       
      if(!loggedIn && homePage) {
        $('#insider-cta').hide();
        $('#user-favorite-stocks .spinner').hide();
        $('#user-favorite-stocks .notice-not-logged-in').show();
        $('#tekindex .spinner').hide();
      }
      
      // run check every X ms to see if page has changed, if page has changed and new page is home page, refresh stock list
      oldTopicsCount=$('.topic-list tr').length;
      $(function() {
          setInterval(function() {
              if($('.topic-list tr').length!=oldTopicsCount) {
                   if(loggedIn){ displayUsersFavoriteStocks(true); checkIfUserIsInsider(); initSearchField(); } 
                   displayTekIndex(true);
                   console.log('page changed, updating stocks');
                  
                  // add notice in fav stocks box if not signed in       
                  if(!loggedIn && homePage) {
                    $('#insider-cta').hide();
                    $('#user-favorite-stocks .spinner').hide();
                    $('#user-favorite-stocks .notice-not-logged-in').show();
                    $('#tekindex .spinner').hide();
                    $('#tekindex .notice-not-logged-in').show();
                    

                  }

                  // if on stock page, make chart
                  if(stockPage) {
                      TradingView.onready(function()
                      {
                        var widget = new TradingView.widget({
                          fullscreen: true,
                          symbol: 'FUNCOM.OL',
                          interval: 'D',
                          container_id: "tv_chart_container",
                          //  BEWARE: no trailing slash is expected in feed URL
                          //datafeed: new Datafeeds.UDFCompatibleDatafeed("http://demo_feed.tradingview.com"),
                          datafeed: new Datafeeds.UDFCompatibleDatafeed("http://198.211.125.65"),
                          library_path: "charting_library/",
                          locale: "en",
                          //  Regression Trend-related functionality is not implemented yet, so it's hidden for a while
                          drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
                          disabled_features: ["use_localstorage_for_settings"],
                          enabled_features: ["study_templates"],
                          charts_storage_url: 'http://saveload.tradingview.com',
                                    charts_storage_api_version: "1.1",
                          client_id: 'tradingview.com',
                          user_id: 'public_user_id'
                        });
                      });  
                   }
                       
                   oldTopicsCount=$('.topic-list tr').length;
              } 
          },500);
      });

  }, 500);

    setInterval(function(){
      
      if(homePage){
        
        if(loggedIn){ displayUsersFavoriteStocks(true); }

        displayTekIndex(true);
        console.log('refreshing stocks, interval');
      }

  }, 120000); // refresh stocks every 2 minutes

  function checkIfUserIsInsider(){
      console.log('checkIfUserIsInsider');
      
      Discourse.ajax("/stock/is_user_insider", {
          type: "GET",
        }).then(function(data) {
          console.log(data);
          if(data.insider) {
            console.log("insider:true");
            $('.insider-thanks').show();
            $('#insider-cta').hide();
          } else {
            console.log("insider:false");
            $('#insider-cta').show();
          }
          

        });        
  }

  function displayUsersFavoriteStocks(forceRefresh) {
        console.log('displayUsersFavoriteStocks');
        console.log('forceRefresh:' + forceRefresh);
        $('#user-favorite-stocks .notice-not-logged-in').hide();
        $('#user-favorite-stocks .notice-no-favorites').hide();
        Discourse.ajax("/stock/get_users_favorite_stocks", {
          type: "GET",
        }).then(function(data) {
          
          //data = JSON.parse(data);
          //console.log('users fav stocks: ');
          //console.log(data.stock);

          stock_html = generateStockTable(data, "stock_data", forceRefresh);

          //console.log(data[0].length);

          $('#user-favorite-stocks .spinner').hide();
          if(data.stock.length > 0) { $('#user-favorite-stocks').append(stock_html); $('.easy-autocomplete').css('opacity', 1); } 
            else { $('#user-favorite-stocks .notice-no-favorites').show(); $('.easy-autocomplete').css('opacity', 1); }
          
          $('#user-favorite-stocks .number-animate').numberAnimate('init');

          
        });
      
  }

  

  function displayTekIndex(forceRefresh) {
        console.log('displayTekIndex');
        console.log('forceRefresh:' + forceRefresh);
        $('#tekindex .notice-not-logged-in').hide();
        Discourse.ajax("/stock/get_tekindex_stocks", {
          type: "GET",
        }).then(function(data) {
          //console.log('tekindex');
          //data = JSON.parse(data);
          //console.log(data.stock);

          //console.log(data[0].length);
          //console.log(stock_html);
          
          stock_html = generateStockTable(data, "tekindex_stock_data", forceRefresh);

          $('#tekindex .spinner').hide();
          $('#tekindex').append(stock_html);              
          
          $('#tekindex .number-animate').numberAnimate('init');
          

        });

  }

  function generateStockTable(data, divID, forceRefresh) {

        template = '';
        //console.log(data.stock);
      
        for (var i = data.stock.length - 1; i >= 0; i--) {
          
          //console.log('stock #' + i);
          
          //console.log(data.stock[i]);

          stock = data.stock[i];
          //console.log('doing stock:' + stock);
          //console.log('symbol:' + data.stock[i].stock[0]);

          ticker = data.stock[i].stock[0].toLowerCase();
          price = data.stock[i].stock[1];
          percent_change = data.stock[i].stock[2];
          last_updated = data.stock[i].stock[3];

          if(price != null) {
            
            price = formatNumber(price);

            price = price.toString().replace(".",",");

            percent_change = percent_change.toString();
            percent_change = percent_change.replace("+","");

            percent_change = formatNumber(percent_change);
            percent_change = percent_change.replace(".",",");
            
            change_direction = 'neutral';
            //console.log(percent_change);
            if(percent_change.indexOf("-") != -1){ change_direction = 'negative'; } else { change_direction = 'positive'; }
            
            if($("#" + divID).length == 0 || forceRefresh) { // stock data has not already been loaded
              template = template + '<tr data-symbol="' + ticker + '"><td class="td-ticker"><a href="/tags/' + ticker.toLowerCase().replace(".","_") + '"><span class="stock_symbol">' + ticker.toUpperCase() + '</span></a></td><td class="td-last"><span class="stock_last number-animate">' + price + '</span></td><td class="td-change"><span class="stock_change_percent ' + change_direction + '"><span class="number-animate">' + percent_change + '</span>%</span></td><td class="td-stock-unfavorite" onclick="removeStockFromUsersFavoriteStocks(&quot;' + ticker.toLowerCase() + '&quot;);"><span>&CircleMinus;</span></td></tr>';
            }

            if($("#" + divID).length > 0 && forceRefresh == false) { // stock data has been loaded, update existing stock numbers
              
                // update data
                //console.log('updating ' + divID + ticker + ' data to: ' + price + ', ' + percent_change + ' ' + ticker + ', ' + price);
                //console.log('here');
                //$('#tekindex_stock_data tr[data-symbol="next.ol"] .stock_last').numberAnimate('init');
                //console.log($('#tekindex_stock_data tr[data-symbol="next.ol"] .stock_last').numberAnimate());
                $("#" + divID + ' tr[data-symbol="' + ticker + '"] .stock_last').numberAnimate('set', price);
                //console.log('here2');
                $("#" + divID + ' tr[data-symbol="' + ticker + '"] .stock_change_percent .number-animate').numberAnimate('set', percent_change);
                // set up or down
                //console.log('here3');
                $("#" + divID + ' tr[data-symbol="' + ticker + '"] .change_icon, ' + "#" + divID + ' tr[data-symbol="' + ticker + '"] .stock_change_percent').removeClass('positive').removeClass('negative').addClass(change_direction);

            }

          }

        };

        if($("#" + divID).length == 0 || forceRefresh) { // stock data has not already been loaded
          
          if(forceRefresh) {
            $("#" + divID).remove();
            //console.log('removing stock data');
          }

          stock_html = '<div id="'+ divID + '" class="stock_data"><div class="container"><table id="stock_data_inner"><thead><th class="th-symbol">Ticker</th><th class="th-last">Siste</th><th class="th-change">I dag</th><th></th></thead><tbody>' + template + '</tbody></table></div></div>';
          //console.log(stock_html);
          return stock_html;
        }

    
  }

  function addStockToUsersFavoriteStocks(ticker) {
        
        // add to fav list UI before it has actually been added

        prepend_row = '<tr data-symbol="' + ticker.toLowerCase() + '"><td class="td-ticker"><a href="/tags/' + ticker.toLowerCase().replace(".","_") + '"><span class="stock_symbol">' + ticker.toUpperCase() + '</span></a></td><td class="td-last"><span class="stock_last number-animate"><div class="spinner spinner-mini"></div></span></td><td class="td-change"><span class="stock_change_percent"><span class="number-animate"><div class="spinner spinner-mini"></div></span></span></td><td class="td-stock-unfavorite"><span></span></td></tr>';

        $("#stock_data #stock_data_inner tbody").prepend(prepend_row);

        Discourse.ajax("/stock/add_stock_to_users_favorite_stocks?ticker=" + ticker.toLowerCase(), {
        type: "GET"
        }).then(function(data) {
          displayUsersFavoriteStocks(true); // force refresh
      });

        ga('send', 'event', 'Favorites', 'Add stock', ticker.toLowerCase());
    }

  function removeStockFromUsersFavoriteStocks(ticker) {
        
        $("#stock_data #stock_data_inner tbody [data-symbol='" + ticker + "']").remove();

        Discourse.ajax("/stock/remove_stock_from_users_favorite_stocks?ticker=" + ticker.toLowerCase(), {
        type: "GET"
        }).then(function(data) {
          displayUsersFavoriteStocks(true); // force refresh
      });

        ga('send', 'event', 'Favorites', 'Remove stock', ticker.toLowerCase());
    }

    function isStockUsersFavorite(ticker) {
        Discourse.ajax("/stock/get_users_favorite_stocks", {
          type: "GET",
        }).then(function(data) {
            //console.log(data.stock);
          //data = data.toString;

          for (var i = data.stock.length - 1; i >= 0; i--) {
            stock = jQuery.parseJSON(data.stock[i]);

            if(ticker.toLowerCase() == stock.symbol.toLowerCase()) { console.log(ticker + ' is a favorite stock: ' + stock.symbol.toLowerCase()); return true; }
          }
          console.log(ticker + ' is not a favorite stock');
          return false;

      });
    }
    
    function openSignupModal() {
      $('.btn.sign-up-btn').trigger("click");
      console.log('trigger');
      return false;
    }
  
    function openLoginModal() {
      $('.btn.login-btn').trigger("click");
      console.log('trigger');
      return false;
    }

    function initSearchField() {
        
        var options = {
            url: function(phrase) {
              return "/stock/symbol_search?ticker=" + phrase;
            },
            placeholder: "Legg til aksjene du vil følge...",
            getValue: "longname",
            requestDelay: 100,
            listLocation: "stock",
            template: {
              type: "custom",
              method: function(value, item) {
                return "<span class='stock-search-symbol'>" + item.symbol + "</span><span class='stock-search-value'>" + value + "</span><span class='stock-search-exchange'>" + item.exchange + "</span>";
              }
            },
            list: {

              onLoadEvent: function(){
                ga('send', 'event', 'Favorites', 'Starting to search', $('#stock-search').val());
              },
              onChooseEvent: function() {
                var value = $("#stock-search").getSelectedItemData().symbol;
                addStockToUsersFavoriteStocks(value);
                $('#stock-search').val('');

              } 
              
            }
          };

          $("#stock-search").easyAutocomplete(options);
    }

    function formatNumber(number)
    // formats 1 -> 1.00
    {
        //console.log('formatting number to: ' + parseFloat(number).toFixed(2));
        return parseFloat(number).toFixed(2);
    }
