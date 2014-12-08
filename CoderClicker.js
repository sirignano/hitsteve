if (Meteor.isClient) {
  Meteor.subscribe('userData');
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

    Template.hello.user = function () {
    return Meteor.user();
  }

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

Template.hello.players = function () {
  return Meteor.users.find({}, {sort: {'rate': -1}});
};

  Template.hello.items = function () {
  return [{name: "achazal", cost: 10}, {name: "xavier", cost: 10}, {name: "NINJA", cost: 100}, {name: "FLE", cost: 1000}, {name: "LUCCA", cost: 10000}, {name: "STEVE", cost: 100000}, {name: "BITE", cost: 1000000}, {name: "TAGUEULE", cost: 10000000}, {name: "trap", cost: 100000000000}, {name: "new", cost: 100000000000000000}, {name: "ze", cost: 10000000000000000000000}];
}

Template.hello.events({
  'click input.code': function () {
    Meteor.call('click');
  }
});

Template.hello.events({
  'click input.buy': function (event) {
    Meteor.call('buy', event.target.id); 
  }
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
        Meteor.setInterval(function() {
        Meteor.users.find({}).map(function(user) {
          Meteor.users.update({_id: user._id}, {$inc: {'money': user.rate, 'count': 0}})
          Meteor.users.update({_id: user._id}, {$set: {'count': 0}});

        });
      }, 1000)
    // code to run on server at startup
  });
      Meteor.publish("userData", function () {
      return Meteor.users.find({}, {sort: {'rate': -1}});
    });
  Accounts.onCreateUser(function(options, user) {
    user.money = 0;
    user.count = 0;
    user.rate = 0;
    return user;
  })
}

function ft_occ(val)
{
  var tab = new Array();
  tab.push(["10", "100", "1000", "10000", "100000", "1000000", "10000000", "100000000000", "100000000000", "100000000000000000", "10000000000000000000000", "10000000000000000000000"]);
  var i = 0;
  max = 12;
  while (i < max)
  {

    if (val === tab[0][i])
      return (1);
    i++;
  }
  return (0)
}

Meteor.methods({
  click: function () {
    if (Meteor.user().count < 5)
    Meteor.users.update({_id: this.userId}, {$inc: {'money': 1, 'count': 1}});
  },
   buy: function(amount)
   {
    if ((ft_occ(amount) == 0))
      Meteor.users.update({_id: this.userId}, {$set: {'rate': 0, 'money': 0, 'count': 0}}); 
    else if(Meteor.user().money >= amount && amount > 0 && Meteor.user().count < 5) 
      Meteor.users.update({_id: this.userId}, {$inc: {'rate': (Math.floor(amount/10)), 'money': (0 - amount), 'count': 1}}); 
  },
})

