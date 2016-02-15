(function () {
	'use strict';
	angular.module('home', ['ngResource'])
	.config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.when('/site', '/site');

		var home = {
			url: '/site',
			views: {
				'main@home' : {
					templateUrl: 'scripts/home/partials/home.html'
				}
			}
		};

		$stateProvider.state('main.home', home);
	});
}());
