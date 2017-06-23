
import request from 'request-promise';

const makeRequest = request.defaults({
  baseUrl: 'http://localhost:3030',
  json: true
});

export default function Resolvers(){

    let app = this;

    // GraphQL Resolvers are used to compose app state via 
    // FeathersJS-based, data-oriented microservices 
    //
    // We have one microservice per db collection or table in SQL terms
    //
    // We compose app state via Resolvers in the mid tier rather than implement relational 
    // joins in the database. This assures app logic is encapsulated in the Resolvers

    return {

      // drill-down resolvers for the data structure returned by query and mutation resolvers 
      // which is passed into the first param (aka "root") 
      // args is defined in the schema

      // we wrap promise-returning Feathers service methods in another promise because sometimes
      // those methods encounter an unhandled exception and/or explivcitly throw an error as opposed 
      // to properly rejecting the promise (by handling the exception and/or rejecting instead of 
      // throwing an error.) 
      //
      // For more context, see e,g.:           
      // http://2ality.com/2016/03/promise-rejections-vs-exceptions.html 

      User: {
        favoriteItems(user, args, context){
          let Items = app.service('/items');
          // get all the items in user's favorited items
            return new Promise(function(resolve, reject) {
              Items.find({
                query: {
                  _id: {
                    $in: user.favoriteItemsIds
                  }
                }
              })
              .then((item) => resolve(item))
              .catch((err) => resolve(err))
            })
        },
        orders(user, args, context){
          let Orders = app.service('/orders');
          return new Promise(function(resolve, reject) {
              Orders.find({
                query: {
                  _id: {
                    $in: user.orderIds
                  }
                }
              })
              .then((order) => resolve(order))
              .catch((err) => reject(err))
          })
        },
        pendingOrders(user, args, context){
          let Orders = app.service('/orders');
          return new Promise(function(resolve, reject) {
            Orders.find({
              query: {
                _id: {
                  $in: user.orderIds
                }
              }
            })
            .then((orders) => resolve(orders.filter((order) => !order.fulfilled)))
            .catch((err) => reject(err))
          })
        }
      },
      Item: {
        sides(item, args, context){
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
            Items.find({
              query: 
                  {_id: 
                    {
                      $in: item.sideIds
                    }
                  }
            })
            .then((items) => resolve(items))
            .catch((err) => reject(err))
          })
        },
        upsells(item, args, context){
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
            Items.find({
              query: 
                  {_id: 
                    {
                      $in: item.upsellIds 
                    }
                  }
            })
            .then((items) => resolve(items))
            .catch((err) => reject(err))
          })
        }
      },
      Order: {
        user(order, args, context){
          let Users = app.service('/users');
          return Users.get(order.userId)
        },
        items(order, args, context){
          let Items = app.service('/items')
          return new Promise(function(resolve, reject) {
            Items.find({
              query: 
                  {_id: 
                    {
                      $in: order.itemIds 
                    }
                  }
            })
            .then((items) => resolve(items))
            .catch((err) => reject(err))
          })
        }
      },
      Menu: {
        entrees(root, args, context){
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
            Items.find({
              query: {
                menuCategory: "ENTRE"
              }
            })
            .then((items) => resolve(items))
            .catch((err) => reject(err))
          })
        },
        sides(root, args, context){
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
            Items.find({
              query: {
                menuCategory: "SIDE"
              }
            })
            .then((items) => resolve(items))
            .catch((err) => reject(err)) 
          }) 
        },
        appetizers(root, args, context){
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
            Items.find({
              query: {
                menuCategory: "APPETIZER"
              }
            })
            .then((items) => resolve(items))
            .catch((err) => reject(err))
          })
        },
        deserts(root, args, context){
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
            Items.find({
              query: {
                menuCategory: "DESERT"
              }
            })
            .then((items) => resolve(items))
            .catch((err) => reject(err))
          })
        },
        drinks(root, args, context){
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
            Items.find({
              query: {
                menuCategory: "DRINK"
              }
            })
            .then((items) => resolve(items))
            .catch((err) => reject(err))
          })
        },
        upsells(root, args, context){
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
            Items.find({
              query: {
                menuCategory: "UPSELL"
              }
            })
            .then((items) => resolve(items))
            .catch((err) => reject(err))
          })
        }
      },
      AuthPayload : {
        user(auth, args, context) {
          return Promise.resolve(auth.data);
        }
      },

      // Root query Resolvers (return output type to be resolved by the above)
      // args are defined in schema 
      RootQuery: {
        // returns user based on token, i.e. whoami
        user(root, args, context) {
            let Viewer = app.service('/viewer');
            context.token = args.webtoken
            return new Promise(function(resolve, reject) {
              Viewer
                .find(context)
                .then((user) => resolve(user))
                .catch((err) => reject(err))
            })
        },
        user(root, args, context){
          let Users = app.service('/users');
          context.token = args.webtoken
          return new Promise(function(resolve, reject) {
            Users.find({
              query: {
                username: args.username
              }
            })
            .then((users) => resolve(users[0]))
            .catch((err) => reject(err))
          })
        },
        users(root, args, context){
          context.token = args.webtoken
          let Users = app.service('/users');
          return new Promise(function(resolve, reject) {
            Users
              .find({})
              .then((user) => resolve(user))
              .catch((err) => reject(err))
          })
        },
        item(root, { _id }, context){
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
            Items
              .get(_id)
              .then((item) => resolve(item))
              .catch((err) => reject(err))
          })
        },
        items(root, { menuCategory }, context){
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
            Items.find({
              query: {
                menuCategory
              }
            })
            .then((item) => resolve(item))
            .catch((err) => reject(err))
          })
        },
        allItems(root, args, context){
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
            Items
              .find({})
              .then((item) => resolve(item))
              .catch((err) => reject(err))
          })
        },
        order(root, args, context){
          context.token = args.webtoken
          let Orders = app.service('/orders')
          return new Promise(function(resolve, reject) {
            Orders
              .get(args._id)
              .then((order) => resolve(order))
              .catch((err) => reject(err))
          })
        },
        allOrders(root, args, context){
          context.token = args.webtoken
          let Orders = app.service('/orders');
          return new Promise(function(resolve, reject) {
            Orders
              .find({})
              .then((order) => resolve(order))
              .catch((err) => reject(err))
          })
        },
        menu(root, args, context){
          // menu doesn't exist in db, entirely composite structure
          return Promise.resolve({})
        }
      },

      // Root mutation Resolvers (return output type to be resolved by the above)
      // args are defined in schema 
      RootMutation: {
        signUp(root, args, context){
          let Users = app.service('/users');
          return new Promise(function(resolve, reject) {
            Users
              .create(args)
              .then((user) => resolve(user))
              .catch((err) => reject(err))
          })
        },
        logIn(root, {username, password}, context){
          return new Promise(function(resolve, reject) {
            makeRequest({
              uri: '/auth/local',
              method: 'POST',
              body: { username: username, password: password }
            })
            .then((result) => resolve(result))
            .catch((err) => reject(err))
          })
        },
        createItem(root, args, context){
          context.token = args.webtoken;
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
                Items
                  .create(args.item, context)
                  .then((item) => resolve(item))
                  .catch((err) => reject(err))
          })
        },
        editItem(root, args, context){
          context.token = args.webtoken;
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
            Items
              .patch(args._id, args.item, context)
              .then((item) => resolve(item))
              .catch((err) => reject(err))
            })
        },
        removeItem(root, args, context){
          context.token = args.webtoken;
          let Items = app.service('/items');
          return new Promise(function(resolve, reject) {
            Items
            .remove(args._id, context)
            .then((item) => resolve(item))
            .catch((err) => reject(err))
          })
        },
        createOrder(root, args, context){
          context.token = args.webtoken;
          let Orders = app.service('/orders');
          let Users = app.service('/users');
          let Items = app.service('/items');

          return new Promise(function(resolve, reject) {
              Items.find({
                query: 
                    {_id: 
                      {
                        $in: args.order.itemIds 
                      }
                    }
              }).then((items) => {
                  let total = `$${items.reduce((sum, item) => {
                                return sum + Number(item.itemPrice.slice(1))
                                }, 0)}`

                  args.order.total = total

                  Orders
                    .create(args.order, context)
                    .then((order) => {
                      Users
                        .update(order.userId, { $push: { orderIds: order._id } }, context)
                        .then((user) => {
                          resolve(order)
                        })
                        .catch((err) => reject(err))
                    }).catch((err) => reject(err)) 
              }).catch((err) => reject(err))
          })
        }
      }

  }
}

