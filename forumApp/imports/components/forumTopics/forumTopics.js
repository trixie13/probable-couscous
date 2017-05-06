import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import template from './forumTopics.html';
import { Topics } from '../../api/topics.js';

class ForumTopicsCtrl {
	constructor($scope) {
	   $scope.viewModel(this);

       this.subscribe('topics');

       // controller variables
       this.random = false;

       this.helpers({
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
        // Topics.insert({
        //     name: newTopic,
        //     createdAt: new Date,
        //     owner: Meteor.userId(),
        //     username: Meteor.user().username
        // });
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
        Meteor.call('topics.remove',topic._id);
    }
}
 
export default angular.module('forumTopics', [
        angularMeteor
    ])

    // .config(['$stateProvider'].
    //     function($stateProvider){

    //         $stateProvider
    //             .state('topics'), {
    //                 url: '/topics',
    //                 component: 'forumTopics',
    //             };
    // })

	.component('forumTopics', {

	    templateUrl: 'imports/components/forumTopics/forumTopics.html',
	    controller: ['$scope', ForumTopicsCtrl]

    });
