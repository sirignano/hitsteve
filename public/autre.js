Items = new Mongo.Collection("items");
Inventaire = new Meteor.Collection("inventaire");
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
  click: function () {
    if (Meteor.user().count < 5)
      Meteor.users.update({_id: this.userId}, {$inc: {'money': 5, 'count': 1}});
    items = Items.find({}, {sort: {'cost': 1}}).fetch();
    i = 0;
    while (items[i])
    {
      inv = Inventaire.findOne({
        user_id: Meteor.user()._id,
        name: items[i].name
      });
      if (!inv)
      {
        if (Meteor.user().money >= (items[i].cost / 2))
        {
          Inventaire.insert({
            user_id: Meteor.user()._id,
            name: items[i].name,
            cost: items[i].cost,
            number: 0
          });
        }
        return ;
      }
      i++;
    }
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