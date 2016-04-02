var apiRoot = "http://localhost:8000"
var	authToken = ""

$.ajax({
	method: "POST",
	url: apiRoot + "/obtain-auth-token/",
	data: { username: "Brachamul", password: "purple14" }
})
	.done(function( response ) {
		authToken = "Token " + response.token
		console.log(authToken)
 	});


var Board = React.createClass({
	loadCardsFromServer: function() {
		$.ajax({
			url: apiRoot + this.props.url,
			dataType: 'json',
			cache: false,
			mimetype: 'application/json',
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: {"results": []} };
	},
	componentDidMount: function() {
		this.loadCardsFromServer();
		setInterval(this.loadCardsFromServer, this.props.pollInterval);
	},
	render: function() {
		var cards = this.state.data.results.map(function(card) {
			return (
				<Card
				key={card.slug}
				title={card.title}
		/*		tags={card.tags}
				people={card.people}
				timeRemaining={card.timeRemaining} */
				></Card>
			);
		});
		return (
			<div className="board">
				<h2 className="board__title">{this.props.title}</h2>
				{cards}
			</div>
		);
	}
});

var User = React.createClass({
	loadCurrentUserFromServer: function() {
		$.ajax({
			headers: { 'Authorization': authToken, },
			url: apiRoot + '/me/',
			dataType: 'json',
			cache: false,
			mimetype: 'application/json',
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error( apiRoot + '/me/', status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: "" };
	},
	componentDidMount: function() {
		this.loadCurrentUserFromServer();
		setInterval(this.loadCurrentUserFromServer, 2000);
	},
	render: function() {
		var user = this.state.data
		return (
			<div className="user">
				<h2 className="user__username">{user.username}</h2>
			</div>
		);
	},
	propTypes: {
		currentUser: React.PropTypes.bool,
		userName: React.PropTypes.string,
	},
});

var Card = React.createClass({
	render: function() {
		return (
			<article className="card">
				<h3 className="card__title">{this.props.title}</h3>
			{/*	<TagList data={this.props.tags}></TagList> */}
			</article>

			)
	}
})

var TagList = React.createClass({
	render: function() {
		var tags = this.props.data.map(function(tag) {
			return ( <span className="card__tag" slug={tag.slug} key={tag.slug} >{tag.text}</span> )
		});
		return ( <p className="card__tags">{tags}</p> )
	}
})

var PropositionForm = React.createClass({
	render: function() {
		return (
			<form id="get-form" class="pull-right">
				<fieldset>
					<div class="btn-group format-selection">
						<a class="btn btn-primary js-tooltip" href="/propositions/" rel="nofollow" title="Make a GET request on the Proposition List resource">GET</a>
						<button class="btn btn-primary dropdown-toggle js-tooltip" data-toggle="dropdown" title="Specify a format for the GET request">
							<span class="caret"></span>
						</button>
						<ul class="dropdown-menu">
							<li>
								<a class="js-tooltip format-option" href="/propositions/?format=json" rel="nofollow" title="Make a GET request on the Proposition List resource with the format set to `json`">json</a>
							</li>
							<li>
								<a class="js-tooltip format-option" href="/propositions/?format=api" rel="nofollow" title="Make a GET request on the Proposition List resource with the format set to `api`">api</a>
							</li>
						</ul>
					</div>
				</fieldset>
			</form>
		)
	}
})

ReactDOM.render(
	<div>
		<div id="projet" className="tabContent" >
			<User currentUser={true} pollInterval={2000} />
			<Board title="Débats en cours" url="/propositions/" pollInterval={2000} />
		</div>
		<div id="compass" className="tabContent"></div>
		<div id="trending" className="tabContent"></div>
	</div>,
	document.getElementById('mainContent')
);

