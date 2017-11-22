import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.messages.helpers({
    messages: function(){
        return Messages.find({}, {sort: {createdAt: -1}});
    }
});

Template.registerHelper('formatDame', function(date) {
    return moment(date).format('MM-DD-YYYY, h:mm:ss a');
});

Template.messages.onCreated(function bodyOnCreated(){
    Meteor.subscribe('messages');
});

Template.add.events({
    'submit #messageForm'(event){
        event.preventDefault();
        const target = event.target;
        const text = target.text.value;

        Meteor.call('messages.insert', text);

        return false;
    } 
});

Template.messages.events({
    'dblclick .message'(){
        Meteor.call('messages.remove', this._id);
    }
});