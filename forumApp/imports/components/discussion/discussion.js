import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import template from './discussion.html';
import { Topics } from '../../api/topics.js';
import { Discussions } from '../../api/discussions.js';


class DiscussionCtrl {
	constructor($scope,$stateParams){
		$scope.viewModel(this);
		// $scope.subscribe('discussion', function () {
        //  return [$stateParams.topicId];
        //})
        
		
		discCtrl = this;
        discCtrl.subscribe('discussions');
        discCtrl.subscribe('topic', function() {
            return [$stateParams.topicId];
        });
        discCtrl.subscribe('topics');
        // discCtrl.subscribe('discussion',$stateParams.topicId);
     

		discCtrl.helpers({
            discussions () {
                return Discussions.find({topicId: $stateParams.topicId},{});
            },

            
            currentUser: function() {
                return Meteor.user();
            },

            topic: function() {
                return Topics.findOne({_id: $stateParams.topicId});
            }
		});

        discCtrl.topicId = $stateParams.topicId;

	};

    /* class methods */
    addComment(comment){

        username = discCtrl.currentUser.username;

        console.log(discCtrl.topicId);
        console.log(username);
        console.log(comment);

        Meteor.call('discussions.addComment',
            discCtrl.topicId,username,comment);
           //discCtrl.topicId,username,comment,
           // function(error){
           //     if(error){
           //         alert(error.message);
           //     }
            //});

        this.comment = '';
        console.log(this.discussions);

    }

    removeComment(comment){
       
        Meteor.call('discussions.remove',comment._id, function (error) {
            if(error) {
                alert(error.message);
            }
        });
    }
}

DiscussionCtrl.$inject = ['$stateParams'];

angular.module('discussion', [
        angularMeteor,
        'accounts.ui',
        'ui.router'
    ])

    .config(RoutesConfig)

    .component('discussion', {

        templateUrl: '/imports/components/discussion/discussion.html',
        controller: ['$scope','$stateParams', DiscussionCtrl]
        
    })

    .run(function($state){

    });

// rouetes config ---------------------------------
RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
function RoutesConfig($stateProvider,$urlRouterProvider){

	 $urlRouterProvider
        .otherwise('/discussion-error');

    $stateProvider
        .state('discussion', {
            url: '/discussion/{topicId}',
            templateUrl: '/views/discussion.html'
        })

        .state('discussion.add-comment', {
            url: '/addComment',
            templateUrl: '/views/addComment.html'
        });
}