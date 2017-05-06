// import angular from 'angular';
// import angularMeteor from 'angular-meteor';

// import forumTopics from '../imports/components/forumTopics/forumTopics';
// import '../imports/startup/accounts-config.js';
 
// angular.module('forumApp', [
// 		angularMeteor, 
// 		forumTopics.name,
// 		'accounts.ui',
// 		'ui.router'
// 	])

//     .config(function($urlRouterProvider, $stateProvider) {

//     	//default route
//     	$urlRouterProvider
// 			.when('/','/topics')
// 	    	.otherwise('/topics');

//     	$stateProvider
//     	    .state('topics', {
//     	    	url: '/topics',
//     	    	templateUrl: '../imports/components/forumTopics/forumTopics.html'
//     	    })
//     })

//     .run(function($state){
//     	//only to initialize ui.router
//     });

// function onReady(){

// }