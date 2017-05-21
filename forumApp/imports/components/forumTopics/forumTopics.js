import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import template from './forumTopics.html';
import { Topics } from '../../api/topics.js';

class ForumTopicsCtrl {
	constructor($scope) {
	   $scope.viewModel(this);
       topicsCtrl = this;

       topicsCtrl.subscribe('topics');

       // controller variables
       topicsCtrl.random = false;

       topicsCtrl.helpers({
            topics () {
                return Topics.find({}, { 
                        sort: { createdAt: -1 }
                    }
                );

                // //check if selections are active
                // if (this.getReactively('random')) {
                //     Topics.find({
                //         "tag": "random"
                //     })
                // };
            },
            currentUser(){
                return Meteor.user();
            }

       })
    }

    /* addTopic function
       takes newTopic param
       inserts it into Topics Collection
       no return
    */
    addTopic(topicName,topicTag){
        
        console.log(topicName + " " + topicTag);
    
        Meteor.call('topics.insert',topicName,topicTag)

        //clear form
        this.topicName = '';
        this.topicTag = '';
    }

    /* removeTopic function
       removes topic param
       by id
    */
    removeTopic(topic){
        // Topics.remove(topic._id);
       
        Meteor.call('topics.remove',topic._id, function (error) {
            if(error) {
                alert(error.message);
            }
        });
    }
}
 
export default angular.module('forumTopics', [
        angularMeteor,
        'accounts.ui',
        'ui.router'
    ])

    .config(RoutesConfig)

	.component('forumTopics', {

	    templateUrl: 'imports/components/forumTopics/forumTopics.html',
	    controller: ['$scope', ForumTopicsCtrl]

    })

    .run(function($state){
        //only to initialize ui.router
    });

// routes -------------------------------------------

RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
function RoutesConfig($stateProvider,$urlRouterProvider){


    $urlRouterProvider
        .otherwise('/topics');

    $stateProvider
        .state('topics.add-topic', {
            url: '/addTopic',
            templateUrl: '/views/addtopic.html'
        });

        // .state('topics.topicdetail', {
        //     url: '/details',
        //     templateUrl: '/views/topicdetails.html'
        // })
};
