// import angular from 'angular';
// import angularMeteor from 'angular-meteor';
// import { Meteor } from 'meteor/meteor';

// import template from './discussion.html';
// import { Topics } from '../../api/topics.js';
// import forumTopics from '/imports/components/forumTopics/forumTopics.js';


// class DiscussionCtrl {
// 	constructor($scope){
// 		$scope.viewModel(this);
// 		discCtrl = this;

// 		console.log(this);
// 	}
// }

// angular.module('discussion', [
//         angularMeteor,
//         'accounts.ui',
//         'ui.router'
//     ])

//     .config(RoutesConfig)

//     .component('discussion', {

//         templateUrl: '/imports/components/discussion/discussion.html',
//         controller: ['$scope', DiscussionCtrl]
        
//     })

//     .run(function($state){

//     });

// // rouetes config ---------------------------------
// RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
// function RoutesConfig($stateProvider,$urlRouterProvider){

// 	 $urlRouterProvider
//         .otherwise('/topic-details');

//     $stateProvider
//         .state('topic-details', {
//             url: '/topic-details/{topidId}',
//             templateUrl: '/views/topicdetails.html'
//         });
// }