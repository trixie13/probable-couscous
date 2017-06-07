import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Discussions = new Mongo.Collection('discussions');

if(Meteor.isServer) {

	Meteor.publish('discussions', function discussionsPublication (){
		return Discussions.find({});
	});

	Meteor.publish('discussion', function(id){
		return Discussions.find({_id: id});
	});
}

Meteor.methods({
	// 'discussions.addComment' (topicId,username,comment) {
	// 	check(comment,String);

	// 	if(!Meteor.userId()) {
	// 		throw new Meteor.Error('not-authorized');
	// 	}
		
	// 	Discussions.update(
	//         // {_id: id },
	//         { $push: {
	//         	comments: {

	// 	        	username: username,
	// 	        	dateAdded: new Date(),
	// 	        	comment: comment
	//             	}
	//             }
	//     	}
	// 	);
	// 	console.log("Added a new comment: topicId " + topicId + 
	// 		" username " + username + " comment " + comment);
	// },
	'discussions.addComment' (topicId,username,comment){
		check(comment,String);
		if(!Meteor.userId()) {
			throw new Meteor.Error('You have to be logged in to post comments!');

		}
		Discussions.insert({
			topicId: topicId,
			username: username,
        	dateAdded: new Date(),
        	comment: comment
        })
        	
    	console.log("Added a new comment: topicId " + topicId + 
			" username " + username + " comment " + comment);
	},

	'discussions.remove' (discId) {
		check(discId,String);

		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
			return false;
		}
        
        //add check if userId is same as owner
		Discussions.remove(discId);
	},

	'discussions.get' (discId) {
		check(discId,String);

		return Discussions.findOne({"_id" : discId});
	}
})