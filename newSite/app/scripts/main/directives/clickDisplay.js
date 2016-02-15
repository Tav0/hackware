(function () {
	'use strict';
	// CLICK-DISPLAY DIRECTIVE

	angular.module('common').directive('clickDisplay', ['$timeout', '$rootScope','dashFactory','chartService',
		function ($timeout, $rootScope,dashFactory,chartService) {

		return {
			restrict: 'A',
			scope:{
				chart:'=',
				graph:'=',
				individual:'@'
			},
			link: function ($scope, $el, $attrs) {

				 if ($attrs.name == dashFactory.getMainChartState()){
					$el.addClass("selected");
				 } else {
					 $el.removeClass("selected");
				 }

				var loadGraph = function(){

					if ($attrs.individual){

						// select graph config for $attrs.individual if it exists (single out graph from 'chart' object
						var singleRec =$scope.graph.filter(function (el) {
							return el.id == $attrs.individual;
						});

						$scope.chart.graphs = singleRec;
						$rootScope.$broadcast('amCharts.renderChart',$scope.chart,'dash-discovery-chart');  // broadcast to the amcharts directive to re-render the chart
						$rootScope.$broadcast('chartSummary','chartListener',$scope.graph,'dash-discovery-chart');
					} else {

						dashFactory.setMainChartState($attrs.name);
						angular.element(".chart-channels .glyphicons").removeClass("selected");
						$el.addClass("selected");

						// select graph config (grouped) that's set in the attribute/scope.
						$scope.chart.graphs = $scope.graph;
						dashFactory.setLegend(new chartService.setLegend($scope.graph));
						$rootScope.$broadcast('amCharts.renderChart',$scope.chart,'dash-discovery-chart');
						$rootScope.$broadcast('chartSummary','chartListener',$scope.graph,'dash-discovery-chart');
					}
				};

				// onclick listener for this element to load graphs for chart
				$el.on("click",function(evt) {
					loadGraph();
				});

			}
		};
	}]);
}());