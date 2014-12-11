
if (Meteor.isClient) {

  Meteor.subscribe('userData');
  Meteor.subscribe('items');
  Meteor.subscribe('inventaire');
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

    Template.hello.user = function () {
    return Meteor.user();
  }
  Template.hello.nb = function () {
    return Inventaire.find({user_id: Meteor.user()._id}, {sort: {'start': 1}}).count();
  }
    Template.hello.nbmax = function () {
    return Items.find().count();
  }
  //   Template.stats.user = function () {
  //    return Meteor.user();
  // }

  Template.hello.stats = function () {
    var ret = Inventaire.find({user_id: Meteor.user()._id}, {sort: {'start': 1}}).fetch();
    return ret
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
      // if (items[i].name == "Xavier")
      // {
      //   items[i].cost = occ(items[i].cost, user.xavier);
      //   // if (user.money < (items[i].cost / 2) && user.xavier == 0)
      //   //   items[i].name = "none";
      // }
      // else if (items[i].name == "Arthur")
      // {
      //   items[i].cost = occ(items[i].cost, user.arthur);
      //   // if (user.money < (items[i].cost / 2) && user.arthur == 0)
      //   //   items[i].name = "none";
      // }
      // else if (items[i].name == "Francois")
      // {
      //   items[i].cost = occ(items[i].cost, user.francois);
      //   // if (user.money < (items[i].cost / 2) && user.francois == 0)
      //   //   items[i].name = "none";
      // }
      // else if (items[i].name == "Steve Himself")
      // {
      //   items[i].cost = occ(items[i].cost, user.steve);
      //   // if (user.money < (items[i].cost / 2) && user.steve == 0)
      //   //   items[i].name = "none";
      // }
      // else if (items[i].name == "Brian")
      // {
      //   items[i].cost = occ(items[i].cost, user.brian);
      //   // if (user.money < (items[i].cost / 2) && user.brian == 0)
      //   //   items[i].name = "none";
      // }
      // else if (items[i].name == "Nathalie")
      // {
      //   items[i].cost = occ(items[i].cost, user.nathalie);
      //   // if (user.money < (items[i].cost / 2) && user.nathalie == 0)
      //   //   items[i].name = "none";
      // }
      // else if (items[i].name == "Ninja")
      // {
      //   items[i].cost = occ(items[i].cost, user.ninja);
      //   // if (user.money < (items[i].cost / 2) && user.ninja == 0)
      //   //   items[i].name = "none";
      // }
      // else if (items[i].name == "Lucca")
      // {
      //   items[i].cost = occ(items[i].cost, user.lucca);
      //   // if (user.money < (items[i].cost / 2) && user.lucca == 0)
      //   //   items[i].name = "none";
      // }
      // else if (items[i].name == "Melissa")
      // {
      //   items[i].cost = occ(items[i].cost, user.melissa);
      //   // if (user.money < (items[i].cost / 2) && user.melissa == 0)
      //   //   items[i].name = "none";
      // }
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

          Meteor.users.update({_id: user._id}, {$inc: {'money': user.rate}});
          Meteor.users.update({_id: user._id}, {$set: {'count': 0}});
          user.money += user.rate;
          Meteor.call('verif_inv', user);

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
      return Items.find();
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

// function occ(cost, nb)
// {
//   if (nb <= 0)
//     return cost;
//   return (Math.round(occ(cost + (cost / 10), nb - 1)));
// }

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
   Meteor.users.update({_id: this.userId}, {$set: {'money': 0, 'count': 0, 'rate': 0, 'ninja': 0, 'xavier': 0, 'arthur': 0, 'francois': 0, 'steve': 0, 'brian': 0, 'nathalie': 0, 'lucca': 0, 'melissa': 0}});
   Inventaire.remove({user_id: this.userId});
  },
  verif_inv: function (user) {
    var items = Items.find({}, {sort: {'cost': 1}}).fetch();
    var i = 0;
    if (!items)
      return ;
    var len = items.length;
    while (i < len && items[i])
    {
      var inv = Inventaire.findOne({
        user_id: user._id,
        name: items[i].name
      });
      if (!inv && i < len)
      {
//        console.log("le i avant " + i.toString() + " len " + len.toString());
        if (user.money >= (items[i].cost / 2))
        {
 //         console.log('1user ' + user.username + ' a ' + user.money + '$ et voit un ' + items[i].name + ' qui a un cout de ' + items[i].cost + ' ' + i.toString());
          Inventaire.insert({
            user_id: user._id,
            name: items[i].name,
            cost: items[i].cost,
            start: items[i].cost,
            number: 0
          });
//          console.log('2user ' + user.username + ' a ' + user.money + '$ et voit un ' + items[i].name + ' qui a un cout de ' + items[i].cost + ' ' + i.toString());
        }
        return ;
      }
      i++;
    }
  },
  click: function () {
    if (Meteor.user().count < 5)
      Meteor.users.update({_id: this.userId}, {$inc: {'money': Meteor.user().incr, 'count': 1}});
    Meteor.call('verif_inv', Meteor.user());
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
      inv = Inventaire.findOne({
        user_id: Meteor.user()._id,
        name: object
      });
      if (!inv)
        return ;
      if (inv.cost <= Meteor.user().money)
      {
        Meteor.users.update({_id: this.userId}, {$inc: {'rate': i.incr, 'money': (0 - inv.cost), 'count': 1}});
        Inventaire.update({_id: inv._id}, {$inc: {'number': 1, 'cost': Math.round(inv.cost / 10)}})
        return ;
      }
      // if (object == "Xavier" && (cost = occ(i.cost ,Meteor.user().xavier)) <= Meteor.user().money)
      //   Meteor.users.update({_id: this.userId}, {$inc: {'xavier': 1}});
      // else if (object == "Arthur" && (cost = occ(i.cost, Meteor.user().arthur)) <= Meteor.user().money)
      //   Meteor.users.update({_id: this.userId}, {$inc: {'arthur': 1}});
      // else if (object == "Francois" && (cost = occ(i.cost, Meteor.user().francois)) <= Meteor.user().money)
      //   Meteor.users.update({_id: this.userId}, {$inc: {'francois': 1}});
      // else if (object == "Steve Himself" && (cost = occ(i.cost, Meteor.user().steve)) <= Meteor.user().money)
      //   Meteor.users.update({_id: this.userId}, {$inc: {'steve': 1}});
      // else if (object == "Brian" && (cost = occ(i.cost, Meteor.user().brian)) <= Meteor.user().money)
      //   Meteor.users.update({_id: this.userId}, {$inc: {'brian': 1}});
      // else if (object == "Nathalie" && (cost = occ(i.cost, Meteor.user().nathalie)) <= Meteor.user().money)
      //   Meteor.users.update({_id: this.userId}, {$inc: {'nathalie': 1}});
      // else if (object == "Ninja" && (cost = occ(i.cost, Meteor.user().ninja)) <= Meteor.user().money)
      //   Meteor.users.update({_id: this.userId}, {$inc: {'ninja': 1}});
      // else if (object == "Lucca" && (cost = occ(i.cost, Meteor.user().lucca)) <= Meteor.user().money)
      //   Meteor.users.update({_id: this.userId}, {$inc: {'lucca': 1}});
      // else if (object == "Melissa" && (cost = occ(i.cost, Meteor.user().melissa)) <= Meteor.user().money)
      //   Meteor.users.update({_id: this.userId}, {$inc: {'melissa': 1}});
      // if (cost > 0 && cost <= Meteor.user().money)
      // Meteor.users.update({_id: this.userId}, {$inc: {'rate': i.incr, 'money': (0 - cost), 'count': 1}});
    }
  },
})

