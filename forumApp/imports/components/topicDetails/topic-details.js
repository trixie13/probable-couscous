import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import template from './topic-details.html';
import { Topics } from '../../api/topics.js';
// import forumTopics from '/imports/components/forumTopics/forumTopics.js';


class TopicDetailsCtrl {

	constructor($scope, $stateParams){
		$scope.viewModel(this);
        $scope.subscribe('topic', function () {
            return [$stateParams.topicId];
        })
		
        detailsCtrl = this;

        detailsCtrl.helpers({
            topic: function() {
                return Topics.findOne({_id:$stateParams.topicId});
            }    
        });

	};

}
TopicDetailsCtrl.$inject = ['$stateParams'];

angular.module('topicDetails', [
        angularMeteor,
        'accounts.ui',
        'ui.router'
    ])

    .config(RoutesConfig)

    .component('topicDetails', {

        templateUrl: '/imports/components/topicDetails/topic-details.html',
        controller: ['$scope','$stateParams', TopicDetailsCtrl]
        
    })

    .run(function($state){

    });

// rouetes config ---------------------------------
RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
function RoutesConfig($stateProvider,$urlRouterProvider){

	 $urlRouterProvider
        .otherwise('/topic-details');

    $stateProvider
            .state('topic-details', {
                url: '/topic-details/{topicId}',
                templateUrl: '/views/topicdetails.html'
            });
}