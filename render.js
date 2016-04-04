var apiRoot = "http://localhost:8000"

var App = React.createClass({
	authenticate: function() {
		$.ajax({
			method: "POST",
			url: apiRoot + this.props.authURL,
			data: { username: "Brachamul", password: "purple14" },
			success: function(data) {
				this.props.authToken = "Token " + response.token
				console.log(this.props.authToken)
			},
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			},
		})
	},
	render: function(){
		return(
			<LoginPage/>
		);
	}
//		render: function(){
//			return(
//				<div id="app">
//					<Header />
//					<div id="projet" className="tabContent" >
//	{/*					<User authToken={this.props.authToken} currentUser={true} pollInterval={2000} /> */}
//						<Board title="Débats en cours" url={apiRoot + "/propositions/"} pollInterval={2000} />
//					</div>
//					<div id="compass" className="tabContent"></div>
//					<div id="trending" className="tabContent"></div>
//				</div>
//			);
//		},
})

var LoginPage = React.createClass({
	render: function(){
		return(
			<div className="loginPage">
				<Header/>
				<div className="container-fluid well" >
					<div className="row-fluid">
						<LoginForm title="Connexion" titleLevel={1} />
					</div>
				</div>
			</div>
		)
	}
})

var LoginForm = React.createClass({
	render: function(){
		return(
			<form action="/api-auth/login/" role="form" method="post" >
				<Title title={this.props.title} titleLevel={this.props.titleLevel} />
				<hr/>				
				<div className="clearfix control-group ">
					<div className="form-group">
						<label htmlFor="login_username">Username:</label>
						<input id="login_username" name="username" maxLength="100" autoCapitalize="off" autoCorrect="off" className="form-control textinput textInput" required="" autofocus="" type="text"/>
					</div>
				</div>
				<div className="clearfix control-group ">
					<div className="form-group">
						<label htmlFor="login_password">Password:</label>
						<input id="login_password" name="password" maxLength="100" autoCapitalize="off" autoCorrect="off" className="form-control textinput textInput" required="" type="password"/>
					</div>
				</div>
				<div className="form-actions-no-box">
					<input name="submit" value="Log in" className="btn btn-primary form-control" type="submit"/>
				</div>
			</form>
		);
	}
})

var Title = React.createClass({
	propTypes: {
		title: React.PropTypes.string,
		titleLevel: React.PropTypes.number,
	},
	render: function(){
		if (this.props.titleLevel == 1) return(<h1>{this.props.title}</h1>)
		if (this.props.titleLevel == 2) return(<h2>{this.props.title}</h2>)
		if (this.props.titleLevel == 3) return(<h3>{this.props.title}</h3>)
		if (this.props.titleLevel == 4) return(<h4>{this.props.title}</h4>)
		if (this.props.titleLevel == 5) return(<h5>{this.props.title}</h5>)
		if (this.props.titleLevel == 6) return(<h6>{this.props.title}</h6>)
	}
})


var Brand = React.createClass({
	render: function(){
		return(
			<div className="brand">
				<i className="fa fa-chevron-right"></i>
				&nbsp;
				<strong>Élan Démocrate</strong>
			</div>
		)
	}
})

var Header = React.createClass({
	render: function(){
		return(
			<header>
			
				<TopFrame/>

				<nav className="tabFrame">
				
					<a className="tabFrame__button active" data-target-tab="projet">
						<i className="tabFrame__button__icon fa fa-file-text"></i>
					</a>
					
					<a className="tabFrame__button" data-target-tab="compass">
						<i className="tabFrame__button__icon fa fa-compass"></i>
					</a>
					
					<a className="tabFrame__button" data-target-tab="trending">
						<i className="tabFrame__button__icon fa fa-hashtag"></i>
					</a>
				
				</nav>
			
			</header>
		);
	}
})

var TopFrame = React.createClass({
	render: function(){
		return(
			<div className="topFrame">
				<div className="topFrame__brand">
					<Brand/>
				</div>
				<a href="#search" className="topFrame__icon">
					<i className="fa fa-search"></i>
				</a>
				<a href="#menu" className="topFrame__icon">
					<i className="fa fa-ellipsis-v"></i>
				</a>
			</div>
		)
	}
})

var Board = React.createClass({
	loadCardsFromServer: function() {
		$.ajax({
			url: this.props.url,
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


//	var User = React.createClass({
//		loadCurrentUserFromServer: function() {
//			$.ajax({
//				headers: { 'Authorization': this.props.authToken, },
//				url: apiRoot + '/me/',
//				dataType: 'json',
//				cache: false,
//				mimetype: 'application/json',
//				success: function(data) {
//					this.setState({data: data});
//				}.bind(this),
//				error: function(xhr, status, err) {
//					console.error( apiRoot + '/me/', status, err.toString());
//				}.bind(this)
//			});
//		},
//		getInitialState: function() {
//			return {data: {"username": "Potato"} };
//		},
//		componentDidMount: function() {
//	//		this.loadCurrentUserFromServer();
//	//		setInterval(this.loadCurrentUserFromServer, 2000);
//		},
//		render: function() {
//			var user = this.state.data
//			return (
//				<div className="user">
//					<h2 className="user__username">{user.username}</h2>
//				</div>
//			);
//		},
//		propTypes: {
//			currentUser: React.PropTypes.bool,
//			userName: React.PropTypes.string,
//		},
//	});

var Card = React.createClass({
	render: function() {
		return (
			<article className="card">
				<h3 className="card__title">{this.props.title}</h3>
			{/*	<TagList data={this.props.tags}></TagList> */}
			</article>
		);
	}
})

var TagList = React.createClass({
	render: function() {
		var tags = this.props.data.map(function(tag) {
			return ( <span className="card__tag" slug={tag.slug} key={tag.slug} >{tag.text}</span> );
		});
		return ( <p className="card__tags">{tags}</p> );
	}
})

var PropositionForm = React.createClass({
	render: function() {
		return (
			<form id="get-form" className="pull-right">
				<fieldset>
					<div className="btn-group format-selection">
						<a className="btn btn-primary js-tooltip" href="/propositions/" rel="nofollow" title="Make a GET request on the Proposition List resource">GET</a>
						<button className="btn btn-primary dropdown-toggle js-tooltip" data-toggle="dropdown" title="Specify a format for the GET request">
							<span className="caret"></span>
						</button>
						<ul className="dropdown-menu">
							<li>
								<a className="js-tooltip format-option" href="/propositions/?format=json" rel="nofollow" title="Make a GET request on the Proposition List resource with the format set to `json`">json</a>
							</li>
							<li>
								<a className="js-tooltip format-option" href="/propositions/?format=api" rel="nofollow" title="Make a GET request on the Proposition List resource with the format set to `api`">api</a>
							</li>
						</ul>
					</div>
				</fieldset>
			</form>
		);
	}
})

ReactDOM.render(
	<App authURL="/obtain-auth-token/" />,
	document.getElementById('mainContent')
)
