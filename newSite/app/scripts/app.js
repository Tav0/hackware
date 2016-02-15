(function () {
	'use strict';

	function startup($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,$uiViewScrollProvider) {
		$urlRouterProvider.otherwise('/site'); // default route points to the MAIN module.
		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		$httpProvider.defaults.transformRequest = function (data) {
			if (data === undefined) {
				return data;
			}
			return JSON.stringify(data);
		};

		$locationProvider.html5Mode(true);
		$uiViewScrollProvider.useAnchorScroll();

		var index = {
			views : {
				'@' : {
					templateUrl: 'scripts/common2/partials/auth.html'
				}
			}
		};

		$stateProvider.state('index', index);
	}

	angular.module('hackware', [
		'ngCookies',
		'ngAnimate',
		'viewhead',
		'ui.router',
		'ui.bootstrap',
		'home'
	]).config([
		'$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
		'$uiViewScrollProvider', startup]);
}());
