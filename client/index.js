//
// Basic Test Client using Apollo Client and Apollo GraphQL-Tag template kibrary
// No React yet

import ApolloClient, { createNetworkInterface } from 'apollo-client';

import gql from 'graphql-tag';

const networkInterface = createNetworkInterface({uri: 'http://localhost:3030/graphql'});

var webtoken = ""

//
// When upgrading to latest feathers-authentication
// we'll need to generate anonymous auth token from /auth/local, save it in localstorage
// and add it to every request
//
// networkInterface.use([{
//   applyMiddleware(req, next) {
//     if (!req.options.headers) {
//       req.options.headers = {};  // Create the header object if needed.
//     }
//     req.options.headers = {
//       authorization: localStorage.getItem('feathers-anon-jwt') ? localStorage.getItem('feathers-anon-jwt') : null
//     }
//     next();
//   }
// }]);

// todo: update to new way of doing this
const client = new ApolloClient({
  networkInterface
})

const displayResult = (result) => {
  document.querySelector('.result').innerHTML =
    JSON.stringify(result, null, 2);
};

const displayToken = (token) => {
  document.querySelector('.token').innerHTML = token
};

const displayLiveResults = (result, type) => {
  let el = document.querySelector('.liveResult.' + type)
  el.innerHTML = JSON.stringify(result, null, 2);
  el.classList.add('alert')
  setTimeout(() => el.classList.remove('alert'), 200)
};

const signupMutation = gql`mutation (
  $username: String!, 
  $firstname: String!, 
  $lastname: String!, 
  $phoneNumber: String!,
  $password: String!,
  $roles: [Roles!]){
  signUp(username: $username, password: $password, firstName: $firstname, lastName: $lastname, phoneNumber: $phoneNumber, roles: $roles)
  {
    _id
    username
    roles
  }
}`;

const loginMutation = gql`mutation ($username: String!, $password: String!){
  logIn(username: $username, password: $password) {
    token
    user {
      _id
      username
      roles
    }
  }
}`;

const ordersQuery = gql`query ($webtoken: String!) {
  allOrders(webtoken: $webtoken) {
        _id
        user {
          _id
          username
          firstName
          lastName
        }
        items {
          itemDescription
          itemPrice
        }
        total
        statusMessage
        fulfilled
        createdAt
	}
}`

const menuQuery = gql`query {
  menu {
    entrees {
      _id
      itemDescription
      itemPrice
      tags
      sides {
        _id
        itemDescription
        tags
      }
      upsells {
        _id
        itemDescription
        itemPrice
        tags
      }
    }
    sides {
      _id
      itemDescription
      itemPrice
      tags
    }
    appetizers {
      _id
      itemDescription
      itemPrice
      tags
    }
    deserts {
      _id
      itemDescription
      itemPrice
      tags
    }
    drinks {
      _id
      itemDescription
      itemPrice
      tags
    }
  }
}`

const observableMenuQuery = client.watchQuery({fetchPolicy: 'network-only', query: menuQuery, pollInterval: 1000 })
observableMenuQuery.subscribe({
  next: ({ data }) => displayLiveResults(data, "menu")
})

document.querySelector('.signup').addEventListener('click', () => {
  const username = document.getElementById('signup_username').value;
  const password = document.getElementById('signup_password').value;
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const phoneNumber = document.getElementById('phone_number').value;
  const roles = [document.getElementById('role').value];

  client
    .mutate({ mutation: signupMutation, fetchPolicy: 'network-only', variables: { username, firstname, lastname, phoneNumber, password, roles } })
    .then(displayResult, displayResult)
});

document.querySelector('.run').addEventListener('click', () => {
  const input = document.querySelector('.test-input').value;

  if (input.trim().indexOf("mutation") === 0) {
    client
      .mutate({ mutation: gql`${input}`, fetchPolicy: 'network-only' })
      .then(displayResult, displayResult)
  }

  if (input.trim().indexOf("query") === 0) {
    client
      .query({ query: gql`${input}`,  fetchPolicy: 'network-only' })
      .then(displayResult, displayResult)
  }
})

document.querySelector('.clear').addEventListener('click', (e) => {
  document.querySelector('.test-input').value = ""
})

var observableOrdersQuery, ordersSubscription;

document.querySelector('.login').addEventListener('click', () => {
  const username = document.getElementById('login_username').value;
  const password = document.getElementById('login_password').value;

  client
    .mutate({ mutation: loginMutation, fetchPolicy: 'network-only', variables: { username, password } })
    .then((result) => {
        if (result.data && result.data.logIn && result.data.logIn.token) {
          webtoken = result.data.logIn.token
          displayToken(webtoken)
          if (observableOrdersQuery) {
            observableOrdersQuery.stopPolling()
          }
          if (ordersSubscription) {
            ordersSubscription.unsubscribe()
          }

          observableOrdersQuery = client.watchQuery({fetchPolicy: 'network-only', query: ordersQuery, variables: { webtoken }, pollInterval: 1000 })
          ordersSubscription = observableOrdersQuery.subscribe({
            next: ({ data }) => displayLiveResults(data, "orders")
          })
        }
      displayResult(result)
    }, displayResult)
})

//
// ignore everything below (copy to clipboard functionality for test client)
//

  var txt = document.querySelector('.token')
  var btn = document.querySelector('.copy')
  
  var clipboard =
  {
    data      : '',
    intercept : false,
    hook      : function (evt)
    {
      if (clipboard.intercept)
      {
        evt.preventDefault();
        evt.clipboardData.setData('text/plain', clipboard.data);
        clipboard.intercept = false;
        clipboard.data      = '';
      }
    }
  };
  window.addEventListener('copy', clipboard.hook);
  btn.addEventListener('click', onButtonClick);
  function onButtonClick ()
  {
    clipboard.data = txt.innerText;
    if (window.clipboardData)
    {
      window.clipboardData.setData('Text', clipboard.data);
    }
    else
    {
      clipboard.intercept = true;
      document.execCommand('copy');
    }
  }

