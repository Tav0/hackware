(function () {
	'use strict';

	angular.module('dash').controller('mainCtrl', mainCtrl);
	mainCtrl.$inject = ['$scope','$rootScope','gaugeService', 'configuration','serialService','$timeout','chartService','$filter','commonFactory','$parse','dashFactory'];

	function mainCtrl($scope, $rootScope, gaugeService, configuration, serialService,$timeout,chartService,$filter,commonFactory,$parse,dashFactory) {

		var recordset = configuration.detailedData,
			radarData = configuration.radar,
			tmpData = [];
		$scope.gauge = false;
		$scope.serial = false;
		$scope.refreshLegend = false;

		/**
		 * Graph definitions for the charts displayed for this controller.
		 * Each graph model is grouped by product
		 * $scope.allGraphs concatenates the grouped models
		 * Each grouped graph model is used in the directive to display the bottom chart.
		 * There is a parameter in that directive that allows to designate a type from an individual group currently
		 *
		 * We could refactor this so each graph is separate and we map it to an object.
		 */
		$scope.mid_score = [];
		$scope.monetizeGraphs = [
			{
				name: "facebook_rev",
				balloonText: "$[[facebook_rev]]: Facebook ([[date_sum]])",
				"id": "monetize-1",
				includeInMinMax: true,
				type: "column",
				valueField: "facebook_rev",
				fillAlphas:1,
				animationPlayed: true,
				classNameField:"classname",
				"chartCursor": {
					"graphBulletSize": 1.5,
					cursorAlpha:0
				}
			},
			{
				name: "youtube_rev",
				"id": "monetize-2",
				type: "column",
				balloonText: "$[[youtube_rev]]:Youtube ([[date_sum]])",
				valueField: "youtube_rev",
				fillAlphas:1,
				animationPlayed: true,
				classNameField:"classname",
				"chartCursor": {
					"graphBulletSize": 1.5,
					cursorAlpha:0
				}
			},
			{
				name: "vimeo_rev",
				"id": "monetize-3",
				type: "column",
				balloonText: "$[[vimeo_rev]]:Vimeo ([[date_sum]])",
				valueField: "vimeo_rev",
				fillAlphas:1,
				animationPlayed: true,
				classNameField:"classname",
				"chartCursor": {
					"graphBulletSize": 1.5,
					cursorAlpha:0
				}
			}];

		$scope.socialGraphs = [
			{
				name: "shares",
				"id": "social-1",
				type: "smoothedLine",
				balloonText: "[[shares]] Shares ([[date_sum]])",
				valueField: "shares",
				bullet:"round",
				animationPlayed: true,
				classNameField:"classname",
				"chartCursor": {
					"graphBulletSize": 1.5,
					cursorAlpha:0
				}
			},
			{
				name: "likes",
				"id": "social-2",
				type: "smoothedLine",
				balloonText: "[[likes]] Likes ([[date_sum]])",
				valueField: "likes",
				bullet:"round",
				animationPlayed: true,
				classNameField:"classname",
				"chartCursor": {
					"graphBulletSize": 1.5,
					cursorAlpha:0
				}
			},
			{
				name: "comments",
				"id": "social-3",
				type: "smoothedLine",
				balloonText: "[[comments]] Comments ([[date_sum]])",
				valueField: "comments",
				bullet:"round",
				animationPlayed: true,
				classNameField:"classname",
				"chartCursor": {
					"graphBulletSize": 1.5,
					cursorAlpha:0
				}
			},
			{
				name: "views",
				"id": "social-4",
				type: "smoothedLine",
				balloonText: "[[views]] Views ([[date_sum]])",
				valueField: "views",
				bullet:"round",
				animationPlayed: true,
				fillAlphas:.5,
				classNameField:"classname",
				"chartCursor": {
					"graphBulletSize": 1.5,
					cursorAlpha:0
				}
			},
			{
				name: "follows",
				"id": "social-5",
				type: "smoothedLine",
				balloonText: "[[follows]] Follows ([[date_sum]])",
				valueField: "follows",
				bullet:"round",
				animationPlayed: true,
				classNameField:"classname",
				"chartCursor": {
					"graphBulletSize": 1.5,
					cursorAlpha:0
				}
			}];

		$scope.allGraphs = $scope.socialGraphs.concat($scope.monetizeGraphs);

		$scope.$watch(function(){return dashFactory.getLegend();},function(newV,oldV){
			$scope.bottomGraphLegend = newV;
		});

		$scope.resetGraphTimeout = function(){
			$timeout.cancel($scope.timeoutAct);
			$scope.graphTimeout(15000);
		};

		$scope.graphTimeout = function(x){

			var to =(x)?x:5000;
			$scope.timeoutAct = $timeout(function(){
				$scope.refreshLegend = true;
				$scope.gauge = false;
				$scope.serial = false;
				$scope.radar = {};
				$scope.list0 = {};
				$scope.list1 = {};
			},to);
		};

		/**
		 * Setting up the custom graph settings for quaddrant one in this case the radar chart
		 */
		var quadOne = function () {
			$scope.mid_score = new gaugeService.getRadar(radarData);
			$scope.mid_score.colors = ["#00afec","#eaeaea"];
			$scope.mid_score.graphs = [
				{
					"balloonText": "[[type]]:[[value]]/100",
					"bullet": "round",
					"fontSize": 0,
					"id": "radar_1",
					"fillAlphas":.8,
					"valueField": "peers"
				},
				{
					"balloonText": "[[type]]:[[value]]/100",
					"bullet": "round",
					"id": "radar_2",
					"fillAlphas":.8,
					"valueField": "goals"
				}
			];
			$scope.mid_score.defs = {
				"filter": [
					{
						"x": "-50%",
						"y": "-50%",
						"width": "200%",
						"height": "200%",
						"id": "blur-it",
						"feGaussianBlur": {
							"in": "SourceGraphic",
							"stdDeviation": "10"
						}
					}
				]
			};

			$timeout(function(){
				$rootScope.$broadcast('chartSummary','gaugeListener',$scope.mid_score.graphs,'radar-score');
			},250);
		};

		/**
		 * Prep up the graph in the third quadrant
		 */
		var quadThree = function () {
			var bottomGraph = new serialService.getSerial(recordset);
				bottomGraph.categoryField="date_sum";
				bottomGraph.valueAxes[0].stackType = "regular";
				bottomGraph.graphs = angular.copy($scope.allGraphs);

			dashFactory.setLegend(new chartService.setLegend(bottomGraph.graphs));
			
			$scope.bottomGraph = bottomGraph;

			$timeout(function(){
				$rootScope.$broadcast('chartSummary','chartListener',bottomGraph.graphs,'dash-discovery-chart');
			},0);

		};

		// listeners for chart summary for serial;
		$rootScope.$on('chartSummary',function(evt,type,data,chart){
			//add a listener to this chart for rollovers via amcharts directive
			if (type == 'chartListener') {
				tmpData = data;
				$rootScope.$broadcast('amCharts.addListener',displayChartInfo, chart);
			} else if (type == 'gaugeListener'){
				tmpData = data;
				$rootScope.$broadcast('amCharts.addListener', displayGaugeInfo, chart);
			} else if (type == 'addKeyStrokes'){
				// TODO: add keystrokes
			}
		});

		var displayGaugeInfo = function(evt){
			$timeout(function(){
				$timeout.cancel($scope.timeoutAct);
				$scope.refreshLegend = false;
				$scope.graphTimeout();
				$scope.serial=false;
				$scope.gauge=true;
				$scope.radar = radarData;

				$rootScope.$broadcast('flicker','summary-serial-title');
				$scope.title='Overall Performance';
				var chosen = evt.item.dataContext,
					tmpArr = {};

				for (var key in chosen) {
					if (chosen.hasOwnProperty(key)) {
						tmpArr[key] = chosen[key];
					}
				}

				var recordData = evt.item.graph.data;
				var tmpArr = [];
				for(var i=0;i < recordData.length;i++){
					tmpArr.push(recordData[i].dataContext);
				}

				$scope.currentType =evt.item.category;
				$scope.currValueField = evt.graph.valueField;
				$scope.currPval = evt.item.dataContext.peers;
				$scope.currGval = evt.item.dataContext.goals;
			});
		};

		/**
		 * Gets the event data and grabs the graph info to display the items for the selected/hovered item.
		 * @param event
		 */
		var displayChartInfo = function(event){
			$timeout(function(){
				$timeout.cancel($scope.timeoutAct);
				$scope.refreshLegend = false;
				$scope.graphTimeout();
				$scope.serial=true;
				$scope.gauge=false;

				var chosen = event.item.dataContext,
					tmpArr = {};

				for (var key in chosen) {
					if (chosen.hasOwnProperty(key)) {

						// we need to create a mapping to the dataset returned instead of manually checking through a loop
						if (key != 'content_creator_id'){

							if (key == 'date_sum'){
								var tmpDate = new Date(chosen[key]); // this is custom formatting to display the date
								var serialTitle = $filter('date')(tmpDate,'MMMM d,yyyy');

								if (serialTitle != $scope.serialTitle){
									$rootScope.$broadcast('flicker','summary-serial-title');
								}

								$scope.serialTitle = serialTitle;
							} else {
								var tmp = key.replace("_"," "); // this should be unnecessary as a formatted name will come via service
								tmpArr[tmp] = chosen[key];
							}
						}
					}
				}

				var items = $filter('orderBy')(tmpArr, '-total'); // use angular order by function
				$scope.colCt = 2; // how many columns - so we can customize later on.
				var tmpList = commonFactory.loopObject(items,$scope.colCt);

				// assign the dynamic variables for the scope
				for (var i=0;i < $scope.colCt;i++){
					var model = $parse('list' + i);
					model.assign($scope,tmpList[i]);
				}
				// apply changes to the scope itself.
				$timeout(function(){
					$scope.$apply();
				},0);

				$scope.highlightChosen = $scope.bottomGraphLegend.filter(function (el) {
					return el.name == event.graph.name;
				})[0].display;  // filter the event graph name (on hover), to match up against the returned object and highlight the selected graph.

			},0);

		};

		var init = function () {
			quadThree();
			quadOne();
		};

		init();
	}

}());
