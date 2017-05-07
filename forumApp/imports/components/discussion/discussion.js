import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import template from './discussion.html';
import { Topics } from '../../api/topics.js';
import forumTopics from '/imports/components/forumTopics/forumTopics.js'


class DiscussionCtrl {
	constructor($scope){
		$scope.viewModel(this);
		discCtrl = this;

		console.log(this);
	}
}

angular.module('forumTopics')
    .component('discussion', {

        templateUrl: '/imports/components/discussion/discussion.html',
        controller: ['$scope', DiscussionCtrl]
        
    });