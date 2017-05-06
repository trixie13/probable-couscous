import angular from 'angular';
import angularMeteor from 'angular-meteor';

import forumTopics from '/imports/components/forumTopics/forumTopics';
import '/imports/startup/accounts-config.js';
 
angular.module('forumApp', [
		angularMeteor, 
		forumTopics.name,
		'accounts.ui',
		'ui.router'
	]);

angular.module('forumApp')
    .config(['$stateProvider',
        function($stateProvider) {

    	//default route
    	// $urlRouterProvider
	    // 	.otherwise('/topics');

    	$stateProvider
    	    .state('home', {
    	    	url: '/home',
    	    	templateUrl: '/views/home.html'
    	    })
            .state('login', {
                url: '/login',
                templateUrl: '/views/login.html'
            });
        }
    ])

    .run(function($state){
    	//only to initialize ui.router
    });

function onReady(){

}