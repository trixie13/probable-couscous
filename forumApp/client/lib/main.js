import angular from 'angular';
import angularMeteor from 'angular-meteor';

import forumTopics from '/imports/components/forumTopics/forumTopics';
import topicDetails from '/imports/components/topicDetails/topic-details';

import '/imports/startup/accounts-config.js';

// module definition ------------------------------------------
 
angular.module('forumApp', [
		angularMeteor, 
		'forumTopics',
        'topicDetails',
		'ui.router'
	]);

angular.module('forumApp')
    .controller('ForumAppController',ForumAppController);

angular.module('forumApp')
    .config(RoutesConfig);


// controller --------------------------------------------------

function ForumAppController(){
    var appCtrl = this;

    appCtrl.$onInit = function () {

    }

}


// routes ------------------------------------------------------

RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];

function RoutesConfig($stateProvider,$urlRouterProvider){

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/views/home.html'
            })
            .state('topics', {
                url: '/topics',
                templateUrl: '/views/topics.html',
                controller: 'ForumAppController as appCtrl'
            });
            // .state('topic-details', {
            //     url: '/topic-details/{topicId}',
            //     templateUrl: '/views/topicdetails.html'
            // });
}

function onReady(){

}