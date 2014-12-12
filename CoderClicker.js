
if (Meteor.isClient) {

  Meteor.subscribe('userData');
  Meteor.subscribe('items');
  Meteor.subscribe('armes');
  Meteor.subscribe('inventaire');
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

    Template.hello.user = function () {
    return Meteor.user();
  }
    Template.hello.nbmax = function () {
    return Items.find().count();
  }


  Template.hello.stats = function () {
    var ret = Inventaire.find({user_id: Meteor.user()._id, time: -1}, {sort: {'start': 1}}).fetch();
    return ret
  }


Template.hello.players = function () {
  return Meteor.users.find({}, {sort: {'rate': -1}});
};

Template.hello.armes = function () {
  var armes = Armes.find().fetch();

 var i = 0;
var user = Meteor.user();
len = armes.length
while (i < len && armes[i])
{
  if (armes[i].cost <= Meteor.user().money)
    armes[i].class = 'btn-success';
  else
    armes[i].class = 'btn-warning';
  i++;
}

  return armes;
}

  Template.hello.items = function () {
    var items = Items.find().fetch();
    var i = 0;
    var user = Meteor.user();
    len = items.length
    while (i < len && items[i])
    {
      inv = Inventaire.findOne({
        user_id: Meteor.user()._id,
        name: items[i].name
      });
      if (!inv)
        items[i].name = "none";
      else
        items[i].cost = inv.cost;
      if (items[i].cost <= Meteor.user().money)
        items[i].class = 'btn-success';
      else
        items[i].class = 'btn-warning';

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

  }
});

Template.hello.events({
  'click div.img1bis': function (event) {

  }
});

Template.hello.events({
  'click input.reset': function (event) {
    Meteor.call('reset'); 
  }
});

Template.hello.events({
  'click input.engage': function (event) {
    Meteor.call('engage', event.target.id); 
  }
});
}

if (Meteor.isServer) {


  Meteor.startup(function () {
        Meteor.setInterval(function() {
        Meteor.users.find({}).map(function(user) {

          Meteor.users.update({_id: user._id}, {$inc: {'money': user.rate}});
          Meteor.users.update({_id: user._id}, {$set: {'count': 0}});
          user.money += user.rate;
          Meteor.call('verif_inv', user);
          Meteor.call('verif_arm', user);
          

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
        if (Armes.find().count() === 0)
        {
          Armes.insert({
            name: "couteau",
            cost: 100,
            time: 50,
            incr: 1
          });
          Armes.insert({
            name: "fusil a pompe",
            cost: 200,
            time: 25,
            incr: 3
          });
          Armes.insert({
            name: "bazooka",
            cost: 500,
            time: 5,
            incr: 9
          });
        }
    // code to run on server at startup
  });
    Meteor.publish("armes", function () {
      return Armes.find();
    });
    Meteor.publish("items", function () {
      return Items.find();
    });
    Meteor.publish("inventaire", function () {
      return Inventaire.find();
    });
      Meteor.publish("userData", function () {
      return Meteor.users.find({}, {sort: {'rate': -1}});
    });
  Accounts.onCreateUser(function(options, user) {
    user.money = 0;
    user.incr = 5;
    user.count = 0;
    user.rate = 0;
    user.nb_items = 0;
     return user;
  })
}


Items = new Mongo.Collection("items");
Inventaire = new Mongo.Collection("inventaire");
Armes = new Mongo.Collection("armes");
Meteor.methods({
  change_img1_to_bis: function () {
   //

     },
  change_img1: function () {
   //

     },
  reset: function () {
   Meteor.users.update({_id: this.userId}, {$set: {'money': 0, 'count': 0, 'rate': 0, 'incr': 5, 'nb_items': 0}});
   Inventaire.remove({user_id: this.userId});
  },
  verif_inv: function (user) {
    var items = Items.find({}, {sort: {'cost': 1}}).fetch();
    var i = user.nb_items;
    if (!items)
      return ;
    var len = items.length;
    if (i == 0 || (i > 0 && i < len && user.money >= items[i - 1].cost))
    {
      var inv = Inventaire.findOne({
        user_id: user._id,
        name: items[i].name
      });
      if (inv)
        return ;
      Inventaire.insert({
        user_id: user._id,
        name: items[i].name,
        cost: items[i].cost,
        start: items[i].cost,
        number: 0,
        time: -1
      });
      Meteor.users.update({_id: user._id}, {$inc: {'nb_items': 1}});
    }




  },
  verif_arm: function (user) {
    var inv = Inventaire.find({ user_id: user._id }).fetch();
    var len = inv.length;
    var i = 0;
    while (i < len && inv[i])
    {
      if (inv[i].time > 0)
        Inventaire.update({ _id: inv[i]._id },{$inc: {'time': -1}});
      else if (inv[i].time == 0)
      {
          Meteor.users.update({_id: user._id}, {$inc: {'incr': (0 - inv[i].incr)}});
          Inventaire.remove({ _id: inv[i]._id });
      }
      i++;
    }
  },
  click: function () {
    if (Meteor.user().count < 5)
      Meteor.users.update({_id: this.userId}, {$inc: {'money': Meteor.user().incr, 'count': 1}});
    Meteor.call('verif_inv', Meteor.user());
  },
  engage: function (object) {
    a = Armes.findOne({
      name: object
    })
    if (!a)
      Meteor.users.update({_id: this.userId}, {$set: {'rate': 0, 'money': 0, 'count': 0, 'ninja': 0, 'xavier': 0, 'arthur': 0, 'francois': 0, 'steve': 0, 'brian': 0, 'nathalie': 0, 'lucca': 0, 'melissa': 0}});
    else if (a.cost > 0 && Meteor.user().count < 5 && a.cost <= Meteor.user().money)
      {
        Meteor.users.update({_id: this.userId}, {$inc: {'incr': a.incr, 'money': (0 - a.cost), 'count': 1}});
        Inventaire.insert({
            user_id: Meteor.user()._id,
            name: a.name,
            cost: a.cost,
            start: a.cost,
            number: 1,
            time: a.time,
            incr: a.incr
        })
      }
  },
   buy: function(object)
   {
    i = Items.findOne({
      name: object
    });
    inv = Inventaire.findOne({
      user_id: Meteor.user()._id,
      name: object
    });
    if (!i || !inv)
      Meteor.users.update({_id: this.userId}, {$set: {'rate': 0, 'money': 0, 'count': 0, 'ninja': 0, 'xavier': 0, 'arthur': 0, 'francois': 0, 'steve': 0, 'brian': 0, 'nathalie': 0, 'lucca': 0, 'melissa': 0}});
    else if (i.cost > 0 && Meteor.user().count < 5)
    {
      if (inv.cost <= Meteor.user().money)
      {
        Meteor.users.update({_id: this.userId}, {$inc: {'rate': i.incr, 'money': (0 - inv.cost), 'count': 1}});
        Inventaire.update({_id: inv._id}, {$inc: {'number': 1, 'cost': Math.round(inv.cost / 10)}})
        return ;
      }
  
    }
  },
})

