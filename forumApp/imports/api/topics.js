import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

 
export const Topics = new Mongo.Collection('topics');

if (Meteor.isServer) {
	//code only runs on server
	Meteor.publish('topics', function topicsPublication() {
		return Topics.find();
	});
}

Meteor.methods({
	'topics.insert' (text,text) {
		check(text,String);

		//check if user is logged before adding a topic
		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		Topics.insert({
			name: text,
			tag: text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},

	'topics.remove' (topicId) {
		check(topicId,String);

		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
			return false;
		}
        
        //add check if userId is same as owner
		Topics.remove(topicId);
	}
});
