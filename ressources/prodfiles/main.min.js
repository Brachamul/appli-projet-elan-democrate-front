'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var apiRoot = "http://localhost:8000";

// Import Bootstrap components via the ReactBootstrap library
//	import { Grid, Col, Row, Clearfix, Button, Input, ButtonInput } from 'react-bootstrap'
var Grid = ReactBootstrap.Grid;
var Col = ReactBootstrap.Col;
var Row = ReactBootstrap.Row;
var Clearfix = ReactBootstrap.Clearfix;
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var ButtonInput = ReactBootstrap.ButtonInput;

var LOG_IN = 'LOG_IN';
var NEW_ALERT = 'NEW_ALERT';
var REMOVE_ALERT = 'REMOVE_ALERT';

function authenticationApp() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? {
		authToken: false,
		username: "Guest"
	} : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case LOG_IN:
			return _extends({}, state, { authToken: action.authToken });
		default:
			return state;
	}
}

function alerts() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case NEW_ALERT:
			return [].concat(_toConsumableArray(state), [{
				level: action.level, // success, info, warning or danger
				text: action.text
			}]);
		case REMOVE_ALERT:
			return [].concat(_toConsumableArray(state.slice(0, action.index)), _toConsumableArray(state.slice(action.index + 1)));

		// Can't use splice to avoid mutating the state
		// Instead, concatenating the array before my object and the one after
		default:
			return state;
	}
}

var potatoApp = Redux.combineReducers({ authenticationApp: authenticationApp, alerts: alerts });

var store = Redux.createStore(potatoApp);

store.dispatch({ type: NEW_ALERT, level: "warning", text: "This is a message!" });
console.log(store.alerts);

//	dispatch(LogIn({text: 'Asks the server for an authentication token'}))

var Alerts = React.createClass({
	displayName: 'Alerts',

	render: function render() {
		console.log(store.alerts);
		return React.createElement(
			Alert,
			{ bsStyle: 'warning' },
			React.createElement(
				'strong',
				null,
				'Holy guacamole!'
			),
			' Best check yo self, you\'re not looking too good.'
		);
	}
});

var App = React.createClass({
	displayName: 'App',

	render: function render() {
		return React.createElement(LoginPage, null);
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
});

var LoginPage = React.createClass({
	displayName: 'LoginPage',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'loginPage' },
			React.createElement(Header, null),
			React.createElement(Grid, { fluid: true }),
			React.createElement(
				'div',
				{ className: 'container-fluid well' },
				React.createElement(
					'div',
					{ className: 'row-fluid' },
					React.createElement(LoginForm, { title: 'Connexion', titleLevel: 1, authURL: '/obtain-auth-token/' })
				)
			)
		);
	}
});

var LoginForm = React.createClass({
	displayName: 'LoginForm',

	authenticateWithServer: function authenticateWithServer() {
		console.log('authenticating...');
		console.log(apiRoot + this.props.authURL);
	},
	handleSubmit: function handleSubmit(e) {
		e.preventDefault();
		$.ajax({
			method: "POST",
			url: apiRoot + this.props.authURL,
			data: { username: "Brachamul", password: "potato" },
			success: function success(response) {
				store.dispatch({
					type: LOG_IN,
					authToken: "Token " + response.token
				});
			},
			error: function error(xhr, status, err) {}
		});
	},
	login: function login(e) {
		e.preventDefault();
		// Here, we call an external AuthService. We’ll create it in the next step
		Auth.login(this.state.user, this.state.password).catch(function (err) {
			console.log("Error logging in", err);
		});
	},

	render: function render() {
		return React.createElement(
			'form',
			{ onSubmit: this.handleSubmit, role: 'form' },
			React.createElement(Title, { title: this.props.title, titleLevel: this.props.titleLevel }),
			React.createElement('hr', null),
			React.createElement(Input, { name: 'username', label: 'Username:', type: 'text', maxLength: '30', autoCapitalize: 'off', autoCorrect: 'off', autofocus: '' }),
			React.createElement(Input, { name: 'password', label: 'Password:', type: 'text', maxLength: '72', autoCapitalize: 'off', autoCorrect: 'off' }),
			React.createElement(ButtonInput, { type: 'submit', value: 'Log in', bsStyle: 'primary', block: true })
		);
	}
});

var Title = React.createClass({
	displayName: 'Title',

	propTypes: {
		title: React.PropTypes.string,
		titleLevel: React.PropTypes.number
	},
	render: function render() {
		if (this.props.titleLevel == 1) return React.createElement(
			'h1',
			null,
			this.props.title
		);
		if (this.props.titleLevel == 2) return React.createElement(
			'h2',
			null,
			this.props.title
		);
		if (this.props.titleLevel == 3) return React.createElement(
			'h3',
			null,
			this.props.title
		);
		if (this.props.titleLevel == 4) return React.createElement(
			'h4',
			null,
			this.props.title
		);
		if (this.props.titleLevel == 5) return React.createElement(
			'h5',
			null,
			this.props.title
		);
		if (this.props.titleLevel == 6) return React.createElement(
			'h6',
			null,
			this.props.title
		);
	}
});

var Brand = React.createClass({
	displayName: 'Brand',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'brand' },
			React.createElement('i', { className: 'fa fa-chevron-right' }),
			' ',
			React.createElement(
				'strong',
				null,
				'Élan Démocrate'
			)
		);
	}
});

var Header = React.createClass({
	displayName: 'Header',

	render: function render() {
		return React.createElement(
			'header',
			null,
			React.createElement(TopFrame, null),
			React.createElement(
				'nav',
				{ className: 'tabFrame' },
				React.createElement(
					'a',
					{ className: 'tabFrame__button active', 'data-target-tab': 'projet' },
					React.createElement('i', { className: 'tabFrame__button__icon fa fa-file-text' })
				),
				React.createElement(
					'a',
					{ className: 'tabFrame__button', 'data-target-tab': 'compass' },
					React.createElement('i', { className: 'tabFrame__button__icon fa fa-compass' })
				),
				React.createElement(
					'a',
					{ className: 'tabFrame__button', 'data-target-tab': 'trending' },
					React.createElement('i', { className: 'tabFrame__button__icon fa fa-hashtag' })
				)
			)
		);
	}
});

var TopFrame = React.createClass({
	displayName: 'TopFrame',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'topFrame' },
			React.createElement(
				'div',
				{ className: 'topFrame__brand' },
				React.createElement(Brand, null)
			),
			React.createElement(
				'a',
				{ href: '#search', className: 'topFrame__icon' },
				React.createElement('i', { className: 'fa fa-search' })
			),
			React.createElement(
				'a',
				{ href: '#menu', className: 'topFrame__icon' },
				React.createElement('i', { className: 'fa fa-ellipsis-v' })
			)
		);
	}
});

var Board = React.createClass({
	displayName: 'Board',

	loadCardsFromServer: function loadCardsFromServer() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			mimetype: 'application/json',
			success: function (data) {
				this.setState({ data: data });
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function getInitialState() {
		return { data: { "results": [] } };
	},
	componentDidMount: function componentDidMount() {
		this.loadCardsFromServer();
		setInterval(this.loadCardsFromServer, this.props.pollInterval);
	},
	render: function render() {
		var cards = this.state.data.results.map(function (card) {
			return React.createElement(Card, {
				key: card.slug,
				title: card.title
				/*		tags={card.tags}
    		people={card.people}
    		timeRemaining={card.timeRemaining} */
			});
		});
		return React.createElement(
			'div',
			{ className: 'board' },
			React.createElement(
				'h2',
				{ className: 'board__title' },
				this.props.title
			),
			cards
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
	displayName: 'Card',

	render: function render() {
		return React.createElement(
			'article',
			{ className: 'card' },
			React.createElement(
				'h3',
				{ className: 'card__title' },
				this.props.title
			)
		);
	}
});

var TagList = React.createClass({
	displayName: 'TagList',

	render: function render() {
		var tags = this.props.data.map(function (tag) {
			return React.createElement(
				'span',
				{ className: 'card__tag', slug: tag.slug, key: tag.slug },
				tag.text
			);
		});
		return React.createElement(
			'p',
			{ className: 'card__tags' },
			tags
		);
	}
});

var PropositionForm = React.createClass({
	displayName: 'PropositionForm',

	render: function render() {
		return React.createElement(
			'form',
			{ id: 'get-form', className: 'pull-right' },
			React.createElement(
				'fieldset',
				null,
				React.createElement(
					'div',
					{ className: 'btn-group format-selection' },
					React.createElement(
						'a',
						{ className: 'btn btn-primary js-tooltip', href: '/propositions/', rel: 'nofollow', title: 'Make a GET request on the Proposition List resource' },
						'GET'
					),
					React.createElement(
						'button',
						{ className: 'btn btn-primary dropdown-toggle js-tooltip', 'data-toggle': 'dropdown', title: 'Specify a format for the GET request' },
						React.createElement('span', { className: 'caret' })
					),
					React.createElement(
						'ul',
						{ className: 'dropdown-menu' },
						React.createElement(
							'li',
							null,
							React.createElement(
								'a',
								{ className: 'js-tooltip format-option', href: '/propositions/?format=json', rel: 'nofollow', title: 'Make a GET request on the Proposition List resource with the format set to `json`' },
								'json'
							)
						),
						React.createElement(
							'li',
							null,
							React.createElement(
								'a',
								{ className: 'js-tooltip format-option', href: '/propositions/?format=api', rel: 'nofollow', title: 'Make a GET request on the Proposition List resource with the format set to `api`' },
								'api'
							)
						)
					)
				)
			)
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('mainContent'));

$(document).ready(function () {

	$('.tabFrame__button').click(function () {
		$('.tabFrame__button').removeClass('active');
		$(this).addClass('active');
		var tabName = $(this).attr('data-target-tab');
		openTab(tabName);
	});
});

function openTab(tabName) {
	$('.tabContent').fadeOut(300, function () {
		$('#' + tabName).fadeIn();
	});
}