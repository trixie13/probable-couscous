import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import template from './forumTopics.html';
import { Topics } from '../../api/topics.js';

class ForumTopicsCtrl {
	constructor($scope) {
	   $scope.viewModel(this);
       topicsCtrl = this;
       topicsCtrl.topicsToShow = [];

       topicsCtrl.subscribe('topics');

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

       topicsCtrl.topicsToShow = topicsCtrl.topics;
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

    sortByTime(order){
        if(order === 'newest'){
            console.log('new');
            topicsCtrl.topicsToShow = topicsCtrl.topics.sort(function(a,b){
                if(a.createdAt > b.createdAt){
                    return -1
                }else{
                    if(a.createdAt == b.createdAt){
                        return 0;
                    }else{
                        return 1;
                    }
                }
            });
            console.log("sorted - newest");
            console.log(topicsCtrl.topicsToShow);
        }
        if(order === 'oldest'){
            console.log('old');
            topicsCtrl.topicsToShow = topicsCtrl.topics.sort(function(a,b){
                if(a.createdAt < b.createdAt){
                    return -1
                }else{
                    if(a.createdAt == b.createdAt){
                        return 0;
                    }else{
                        return 1;
                    }
                }
            });
            console.log("sorted - oldest");
            console.log(topicsCtrl.topicsToShow);
        }
    }

    filterOptions(option){
        if(option === 'byMe'){

            var checked = $('input#added-by-me').prop('checked');
        
            if(checked){
                topicsCtrl.topicsToShow = topicsCtrl.topicsToShow
                                          .filter(function(topic){
                                              return topic.owner == Meteor.user()._id;
                                          });
                console.log("filtered - added by me");
            } else {
                topicsCtrl.topicsToShow = topicsCtrl.topics;
                console.log("filtered - added by me -- disabled");
            }

        }
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
