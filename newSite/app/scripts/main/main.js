(function () {
	'use strict';
	angular.module('dash',['ngResource'])
		.config(function($stateProvider) {

		// ROUTING FOR THE MAIN DASHBOARD
		var dashboard = {
			url: '/dashboard',
			views:{
				'dash@access':{
					controller: 'mainCtrl',
					templateUrl: 'scripts/main/partials/home.html'
				}
			},
			data:{
				nav:''
			}
		};

		$stateProvider.state('access.dash', dashboard);

	});
}());





