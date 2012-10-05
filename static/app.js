$("#add-tweet").click(function(){

	var TweetModel = Backbone.Model.extend({
		initialize : function() {
			this.name = 'search'
		}
	});
	
	var TweetCollection = Backbone.Collection.extend(
    {
        model: TweetModel,
        initialize: function() {
        },
		url:function()
		{
			// alert('https://search.twitter.com/search.json?q='+$("#Searched").val()+'&page='+this.page+'&callback=?');
			return 'https://search.twitter.com/search.json?q='+this.q+'&page='+this.page+'&callback=?';
		},
		q:"",
		page:1,
		parse:function(resp,xhr)
		{
			// alert(resp.results);
			return resp.results;
		}
   
    });

	var TweetController = Backbone.View.extend({
		initialize: function() {
			this.render();
		},
		render: function() {
			// this.template = _.template($('#tweet-view').html());
			this.template = _.template($('#tweet-view-pic').html());
            var dict = this.model.toJSON();
            var markup = this.template(dict);
            this.el.innerHtml = markup;
            return this;
		}

	});

	var AppController = Backbone.View.extend({
	
		events:{
			"click #add-tweet":'loadTweets'
		},
	
		initialize: function () {
			this.tweets = new TweetCollection();
			this._tweetsView = [];

			//set event handlers
			_.bindAll(this, 'onTweetAdd');
			this.tweets.bind('add', this.onTweetAdd);
			this.loadTweets();
		},

		
		addTweets: function () {
		
			// this.tweets.add({
				// 'text': $("#Searched").val(),
				// 'created_at': 'August 18, 2012'
			// });
			// this.tweets.add({
				// 'text': 'Kenneth Tweet: ',
				// 'created_at': 'August 18, 2012'
			// });

		},
		
		loadTweets: function () {
			$(this.el).find("ul").html("");
			// this.tweets.add({
				// 'text': 'Kenneth Tweet: ',
				// 'created_at': 'August 18, 2012'
			// });
			// this.tweets.add({
				// 'text': 'Kenneth Tweet: ',
				// 'created_at': 'August 18, 2012'
			// });
			
			
			
			var that=this;
			this.isloading=true;
			this.tweets.q=$("#Searched").val();
			this.tweets.fetch({
				add: that.onTweetAdd,
				success:function(tweets)
				{
					that.isloading=false;
				}
			});	
			
		},

		onTweetAdd: function(model) {
			var tweetView = new TweetController({
				model: model
			});
			this._tweetsView.push(tweetView);
			$(this.el).find('ul').append(tweetView.render().el.innerHtml);
		}
	});


	var app = new AppController({
		el: $('.twitter-feed')
	});
});