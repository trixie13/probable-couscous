import angular from 'angular';
import angularMeteor from 'angular-meteor';

import forumTopics from '/imports/components/forumTopics/forumTopics';
import discussion from '/imports/components/discussion/discussion';
import '/imports/startup/accounts-config.js';

// module definition ------------------------------------------
 
angular.module('forumApp', [
		angularMeteor, 
		'forumTopics',
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
}

function onReady(){

}