
if (Meteor.isClient) {

  Meteor.subscribe('userData');
  Meteor.subscribe('items');
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

    Template.hello.user = function () {
    return Meteor.user();
  }

    Template.stats.user = function () {
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
    var items = Items.find().fetch();
    var i = 0;
    var user = Meteor.user();
    while (items[i])
    {
      if (items[i].name == "Xavier")
      {
        items[i].cost = items[i].cost + (5 * user.xavier);
        // if (user.money < (items[i].cost / 2) && user.xavier == 0)
        //   items[i].name = "none";
      }
      else if (items[i].name == "Arthur")
      {
        items[i].cost = items[i].cost + (5 * user.arthur);
        // if (user.money < (items[i].cost / 2) && user.arthur == 0)
        //   items[i].name = "none";
      }
      else if (items[i].name == "Francois")
      {
        items[i].cost = items[i].cost + (5 * user.francois);
        // if (user.money < (items[i].cost / 2) && user.francois == 0)
        //   items[i].name = "none";
      }
      else if (items[i].name == "Steve Himself")
      {
        items[i].cost = items[i].cost + (5 * user.steve);
        // if (user.money < (items[i].cost / 2) && user.steve == 0)
        //   items[i].name = "none";
      }
      else if (items[i].name == "Brian")
      {
        items[i].cost = items[i].cost + (5 * user.brian);
        // if (user.money < (items[i].cost / 2) && user.brian == 0)
        //   items[i].name = "none";
      }
      else if (items[i].name == "Nathalie")
      {
        items[i].cost = items[i].cost + (5 * user.nathalie);
        // if (user.money < (items[i].cost / 2) && user.nathalie == 0)
        //   items[i].name = "none";
      }
      else if (items[i].name == "Ninja")
      {
        items[i].cost = items[i].cost + (5 * user.ninja);
        // if (user.money < (items[i].cost / 2) && user.ninja == 0)
        //   items[i].name = "none";
      }
      else if (items[i].name == "Lucca")
      {
        items[i].cost = items[i].cost + (5 * user.lucca);
        // if (user.money < (items[i].cost / 2) && user.lucca == 0)
        //   items[i].name = "none";
      }
      else if (items[i].name == "Melissa")
      {
        items[i].cost = items[i].cost + (5 * user.melissa);
        // if (user.money < (items[i].cost / 2) && user.melissa == 0)
        //   items[i].name = "none";
      }
      i++;
    }
  return items;
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

Template.hello.events({
  'click div.img1': function (event) {
   // Meteor.call('change_img1_to_bis');
         // u = document.getElementsByClassName("img1");
         //  u.className = "img1bis";
  }
});

Template.hello.events({
  'click div.img1bis': function (event) {
   // Meteor.call('change_img1');
     //       u = document.getElementsByClassName("img1bis");
     // u.className = "img1";
  }
});

Template.hello.events({
  'click input.reset': function (event) {
    Meteor.call('reset'); 
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
        if (Items.find().count() === 0)
        {
                    Items.insert({
                      name: "Xavier",
                      cost: 100,
                      incr: 1
                    });
                    Items.insert({
                      name: "Arthur",
                      cost: 200,
                      incr: 3
                    });
                    Items.insert({
                      name: "Francois",
                      cost: 500,
                      incr: 9
                    });
                    Items.insert({
                      name: "Steve Himself",
                      cost: 800,
                      incr: 15
                    });
                    Items.insert({
                      name: "Brian",
                      cost: 1000,
                      incr: 21
                    });
                    Items.insert({
                      name: "Nathalie",
                      cost: 1300,
                      incr: 28
                    });
                    Items.insert({
                      name: "Ninja",
                      cost: 1500,
                      incr: 35
                    });
                    Items.insert({
                      name: "Lucca",
                      cost: 2000,
                      incr: 50
                    });
                    Items.insert({
                      name: "Melissa",
                      cost: 3000,
                      incr: 75
                    });
        }
    // code to run on server at startup
  });
        Meteor.publish("items", function () {
      return Items.find();
    });
      Meteor.publish("userData", function () {
      return Meteor.users.find({}, {sort: {'rate': -1}});
    });
  Accounts.onCreateUser(function(options, user) {
    user.money = 0;
    user.count = 0;
    user.rate = 0;
    user.xavier = 0;
    user.arthur = 0;
    user.francois = 0;
    user.steve = 0;
    user.brian = 0;
    user.nathalie = 0;
    user.ninja = 0;
    user.lucca = 0;
    user.melissa = 0;
    return user;
  })
}

Items = new Mongo.Collection("items");
Meteor.methods({
  change_img1_to_bis: function () {
   //

     },
  change_img1: function () {
   //

     },
  reset: function () {
   Meteor.users.update({_id: this.userId}, {$set: {'money': 0, 'count': 0, 'rate': 0, 'ninja': 0, 'xavier': 0, 'arthur': 0, 'francois': 0, 'steve': 0, 'brian': 0, 'nathalie': 0, 'lucca': 0, 'melissa': 0}});
  },
  click: function () {
    if (Meteor.user().count < 5)
    Meteor.users.update({_id: this.userId}, {$inc: {'money': 5, 'count': 1}});
  },
   buy: function(object)
   {
    i = Items.findOne({
      name: object
    });
    cost = -1;
    if (!i)
      Meteor.users.update({_id: this.userId}, {$set: {'rate': 0, 'money': 0, 'count': 0, 'ninja': 0, 'xavier': 0, 'arthur': 0, 'francois': 0, 'steve': 0, 'brian': 0, 'nathalie': 0, 'lucca': 0, 'melissa': 0}});
    else if (i.cost > 0 && Meteor.user().count < 5)
    {
      if (object == "Xavier" && (cost = i.cost + (5 * Meteor.user().xavier)) <= Meteor.user().money)
        Meteor.users.update({_id: this.userId}, {$inc: {'xavier': 1}});
      else if (object == "Arthur" && (cost = i.cost + (5 * Meteor.user().arthur)) <= Meteor.user().money)
        Meteor.users.update({_id: this.userId}, {$inc: {'arthur': 1}});
      else if (object == "Francois" && (cost = i.cost + (5 * Meteor.user().francois)) <= Meteor.user().money)
        Meteor.users.update({_id: this.userId}, {$inc: {'francois': 1}});
      else if (object == "Steve Himself" && (cost = i.cost + (5 * Meteor.user().steve)) <= Meteor.user().money)
        Meteor.users.update({_id: this.userId}, {$inc: {'steve': 1}});
      else if (object == "Brian" && (cost = i.cost + (5 * Meteor.user().brian)) <= Meteor.user().money)
        Meteor.users.update({_id: this.userId}, {$inc: {'brian': 1}});
      else if (object == "Nathalie" && (cost = i.cost + (5 * Meteor.user().nathalie)) <= Meteor.user().money)
        Meteor.users.update({_id: this.userId}, {$inc: {'nathalie': 1}});
      else if (object == "Ninja" && (cost = i.cost + (5 * Meteor.user().ninja)) <= Meteor.user().money)
        Meteor.users.update({_id: this.userId}, {$inc: {'ninja': 1}});
      else if (object == "Lucca" && (cost = i.cost + (5 * Meteor.user().lucca)) <= Meteor.user().money)
        Meteor.users.update({_id: this.userId}, {$inc: {'lucca': 1}});
      else if (object == "Melissa" && (cost = i.cost + (5 * Meteor.user().melissa)) <= Meteor.user().money)
        Meteor.users.update({_id: this.userId}, {$inc: {'melissa': 1}});
      if (cost > 0 && cost <= Meteor.user().money)
      Meteor.users.update({_id: this.userId}, {$inc: {'rate': i.incr, 'money': (0 - cost), 'count': 1}});
    }
  },
})

