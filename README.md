
## Making Change a First-Class Citizen

A maintainable application architecture requires that the UI to only contain the rendering logic and the queries and mutations against the underlying data model on the server. A maintainable architecture requires that the UI does not derive or compose app state since that would embed business logic in the client. App state should be persisted on backend store(s) and projected in the required to the client via a dynamic, demand-driven data layer, outside the UI, that lets the client pull any data (without the limitation of a fixed backend API) and with the projected app state refreshing automatically in th UI as mutations occur on the server that affect it, which gives us a highly interactive, realtime UX/UI that's free of the extra complexity of business logic and app-state projection/shaping logic, therefore making it stratight forward to change the UI and keep up with changing business needs.

In other words, the architecture discussed here makes Change a first-class citizen. 

The dynamic, demand-driven data layer is provided in this architecture by GraphQL which allows us to define a statically typed schema on the server that captures the various data types and relationships between them in our domain model, and wire the schema to data sources via resolver functions that connect to data-oriented microservices API and resolve client-specified "queries" and "mutations" against the schema. This way UI developers may code against the schema and eliminate all miscommunication with --and dependency on-- backend developers, which is what delays so many projects and makes adding new features a major chore rather then a simple and joyful process. 

Making microservices 'data oriented' means that each service is a join-free ORM or ODM model that represents exactly just one table or one collection in the database and exposing a CRUD interface plus a Find method that leverages database-specific adapter with a Standard Query DSL.) The services could also wrap an existing API and exposes it through the same exact interface. This makes backend development trivial by elininating complex relational queries from the codebase and moving app-state mutation, derivation and composition out of microservices and into I/O-bound, schema-based, input/output data type resolvers that resolve GraphQL queries and mutations from the client.

With this approach, the UI developer's job becomes a much more pleasant and simpler task of building the GraphQL schema, building the UI components and specifying the queries and mutations (at the schema level) per each I/O event. This way the UI becomes a thin realtime I/O layer, without any business logic. 

In summary, we use GraphQL dynamically derive and/or compose a UI-specific projection/shape of our app state, via composable, data-oriented microservices, and then have that projection of app state updated in real time (with help of GraphQL Subscriptions) whenever the data behind the rendered portion of app state changes. 

Currently popular architectures that derive and/or compose "app state" in the client (usin Redux, MobX, et al) and therefore necessarily embed business logic and app-state projection/shaping into the client thus making change a second class citizen. While those architectures also enable things like 'optimistic UI updates' and 'offline first' they exponentially complicate the work involved when it comes to making changes to the application based on ever-changing business requirements. 

Frameworks like Facebook's Relay Modern (and Apollo Client when offline/optimistic-update features are used) can bring back those capabilities to this architecture, at the cost of putting back business logic (but not app-state projection/shaping) into the client. However, 'offline-first' and 'optimistic UI updates' are purely meaningless in most if not all business applications where liveness and transactionality are essential parts of the UK. 

So while it's possible to use Facebook's Relay Modern without its offline/optimistic-update features, and conform to the design patterns described here, it is not necessary. That's especially true if one wishes to use VueJS, Angular 4 or Ember 2 instead of React.

This particular implementation uses the Apollo Client which gives us greater flexbility to implement the design patterns of this architecture without sacrificing any aspect (see: https://dev-blog.apollodata.com/apollo-link-creating-your-custom-graphql-client-c865be0ce059)

![GraphQL](https://s29.postimg.org/b7ifw7vc7/image1.png)


## Some Challenges and Considerations

1. We should separate dynamic and static data in the client, conceptually as well as physically. The two are often conflated and that creates architectural complexity. Static data is something like menu items in a food ordering app. Dynamic data is something like what the status of an order. While we may cache static data on the client, we should keep dynamic data on the server to avoid the complexity of cache eviction. GraphQL subscriptions are used to keep data in the UI up to date with app state on the server. We can use other techniques to eliminbate any chance of the client making issuing and mutations that reply on a previous version of app state, without making the server stateful. 

2. The need for service hooks: we need to be able to make sure the user is authenticated and authorized before executing a query or a mutation (and conditionally avoiding doing so) This way we can implement authentication and authorization/role checks in those hooks, as opposed to co-mingling with the logic of the business process. 

3. The need for realtime mutation events that perform well at scale: when something changes on the server, we need to know about it, but only if we care about it. This calls for dynamic subscriptions. 

4. We should be able to validate data in mutations from client on both the client (for instant feedback) and in our business logic inside GraphQL resolvers (for security)

5. We should be able to implement secure authentication using OAuth and Email/Password, via JSON Web Tokens (no cookies.)

6. We should be able to implement authorization independent of our database or network interface.

## Data-Oriented Microservices via FeathersJS

The important new concept FeathersJS gives us in NodeJS is that of composable, data-oriented services. A service is just a JavaScript object that provides one or more of the following queries and mutations using the following data-oriented, uniform API (CRUD plus Find with Query DSL that extends to DB and wraps existing API), which is callable from any other service, and, therefore, composable. 

```javascript
// All service methods return a promise
// In case of Find, params include query (Standard Query DSL), provider (rest/sockets/grpc/etc) and Bearer token
// missing query returns all records the user is authorized to access
// Elsewhere, params only contain provider and token, and ids in case of mutating multiple entries

var myService =
{
find: function(params) {},
get: function(id, params) {},
create: function(data, params) {}, // data can be an array (for multiple entry creation)
update: function(id, data, params) {},
patch: function(id, data, params) {}, // id may be omitted if one or more id's are provided in params (patch multiple entries)
remove: function(id, params) {}, // id may be omitted if one or more id's are provided in params (remove multiple entries)
setup: function(app, path) {}
}
// Use this service in your application at the /todos endpoint app.use('/todos', myService);
```

The key innovation in combining GraphQL with Features is about having composable, data-oriented services that have a uniform CRUD interface plus a Query DSL that is adapted for various backends (SQL, NoSQL, APIs, etc), where every table or collection in db is mapped to a service with GraphQL providing the application-level, expressive interface on top of that. This means that service composition replaces relational joins. For example, if we want to get all comments for a given post, we would not associate the posts table with the comments table (as that would violate the clean, maintainable pattern of having separate, decoupled services) and instead we would call the find(...) API on the comments service passing in the post id. We can also delete every comment that belongs to a given user using the same inter-service composition defined in the GraphQL resolvers, by calling the remove() API on the comments service passing in the user id.

Feathers will also hook into the mutative methods (create, update, patch, remove) and send events to listening clients when they successfully return. An application then can be made real-time just by listening to those events (with filtering rules on server side) and updating itself with the new data. It's important to note that backend services should not consume mutation events from Feathers services. The mutation events are meant for clients to update their state, not for other services to consume and opaquely mutate app state. If you want something to happen in an external system you should use Feathers after-hooks. If you want something to happen to Feathers connected data store after a given successful mutation then listen to the mutation event in the client that originated the mutation and create another mutation via GraphQL.

We use GraphQL schema to specify application-level data types and the relationships between them and we use GraphQL resolvers to specify which Feathers services to call in order to resolve the data type being requested (via Feathers services) and filter the result hierarchically before it's consumed by the client. Our GraphQL resolvers use the Feathers services to get the type being requested and all the types that it references. This means that the resolvers themselves are decoupled from the type of data store, which is a necessary for a clean, decoupled GraphQL implementation. In addition, 'before' and 'after' hooks in Feathers allow us to add things like authorization and sanitation (security layer) and any follow up action like send email to user. Validation can happen generically in the UI or as driven by business logic in the resolvers.   

## Data-Oriented Microservices

Let’s consider two entities, which each one of them is dealing with a different table in the database. The Deal Table is connected to Customer Table by Foreign Key (FK), so whenever we need information about the deals of a single customer, a simple SQL join will do the job.

![database](https://s29.postimg.org/55at5q6w7/image2.jpg)

In order to transform the whole relationship into a decoupled services approach we get rid of the FK. By doing this the service Deal will have to provide all the safeguards of an FK handling. In this particular case, every time a new request comes, we need to check if a deal does exist for the given customer and return only those deals.

Essentially, the services will be like this:

![services](https://s29.postimg.org/m4jrkzi3r/image3.jpg)

This radical approach brings up the following question:

With the old approach, a simple SQL join will bring us both the customer and deal information. Now, we need to perform two primary key lookups in order to get the same result (see Distributed Transactions and Concurrency Control.) Is the new approach slower because we need to make two calls to gather same information? The answer: it depends. We don't need SQL joins in this approach. Data is joined at the services layer and is normalized based on relations expressed in the GraphQL schema, which are implemented by resolvers which call into services, where each service encapsulates only one table/collection. There is no longer a relational join overhead. We're doing a simple lookup or update against a single table/collection. But the answer is that it depends on our schema design and the complexity of our query. 

However, the benefits in turning those entities into services are:
  
  1. The Deal and Customer tables can be in different databases (or schemas) without overwhelming a single database when we need to scale. Same for the Deal and Customer services.
  2. Maintenance of each service can be done easily, as each table doesn’t relate to anything else.

## Pagination

At this juncture, pagination of results can be done by either GraphQL or Feathers. It's best to use Windowing rather than stateful pagination. This involves moving the fetch/display window over that data, or row at a time. 

## Protecting Service Methods

There are some times where you may want to use a service method inside your application or allow other servers in your cluster access to a method, but you don't want to expose a service method publicly. We've created a bundled hook that makes this really easy.

```javascript
const hooks = require('feathers-hooks');

app.service('users').before({
  // Users can not be created by external access
  create: hooks.disable('external'),
});
```

## Concurrent Mutations in Shared Resources

What happens in this kind of microservices architecture when we need to make multiple mutations (in promise chained calls) that are part of a single transaction (end state) across one or more services? Nothing if you have only one user and you're not interleaving writes. But what if you have two or more users concurrently using your application, with reads/writes against the same set of data?  The way this architecture is setup is we have inter-service composition happening in the GraphQL mutation resolvers. So for a transaction implementing dependent mutations asynchronously, the mutation resolver would orchestrate that transaction using conditional writes to guarantee consistency of our app state. If we're using a distributed database, for web scale transaction management, we would use one, like Google's Cloud Spanner, that can implement non-blocking concurrency control to guarantee consistency.

Some possible directions:

  1. Consistency Features of DynamoDB: https://quabase.sei.cmu.edu/mediawiki/index.php/Amazon_DynamoDB_Consistency_Features (also see DynamoDB Java transaction library)

  2. Consistency Features of Google's Cloud Spanner: https://cloud.google.com/spanner/docs/transactions

  3. Non-Blocking Optimistic Concurrency Control in SQL for Single DB Instance (see section below)

We should design the application to minimize write contention and for that we may use conditional updates to implement optimistic locking so that nothing is happening at the same time to the same resource or set of resources. We can also acquire read-write locks so nothing can happen to a resource between the time we check its state and the time we apply an dependent update to it or to another resource. That's pessimistic read-write locking. The onus is on us to design the app in a way that leads to minimal or no contention because contention will either slow things down or lead to inconsistent state. 

## Two-Phase Commit (2PC) 

While optimistic concurrency control (OCC) can take care of a whole class of problems, what happens if we're in the middle of a transaction that mutates (through promise-chained service invocations) many tables in our database and the application server crashes? The fact that we use data oriented microservices, where each service represents a table and that we may have dependent mutations that are carried out via separate services, means that we have to account for possibility of server crashing in the middle of a transaction. To solve this, many databases support a two-phase commit (2PC) process where we can rollback a transaction upon server failure or any logical failure. 

In a distributed DB scenario, Google Cloud Spanner also supports 2PC: https://cloud.google.com/spanner/docs/transactions and Amazon's DynamoDB supports this via a Java transaction library.

## Distributed Transactions

A distributed transaction includes one or more statements that, individually or as a group, update data on two or more distinct nodes of a distributed database. 

Databases that can be distributed may offer serializability or lineralizability or both (e.g. CockroachDB.)In a distributed database setting, the minimum required standard for transactional apps is serializability.  

## Optimistic Locking (for a single db instance)

The point is that Optimistic Locking is not a database feature, not for MySQL nor for others: optimistic locking is a practice that is applied using the DB with standard instructions.

Let's have a very simple example and say that you want to do this in a code that multiple users/clients can run concurrently.

This assumes use of Feathers-Knex rather than Sequelize and assumes one DB instance, not distributed.


SELECT data from a row having one ID field (iD) and two data fields (val1, val2)
optionally do your calculations with data
UPDATE data of that row

### The NO LOCKING way to is:

NOTE: all code {between curl brackets} is intended to be in the app code and not in the SQL side

```sql
-
SELECT iD,
       val1,
       val2
FROM theTable
WHERE iD = @theId;
 
- {code that calculates newVal1, newVal2} -
UPDATE theTable
SET val1 = @newVal1,
    val2 = @newVal2
WHERE iD = @theId;
 
- {GO ON WITH your other code}
```

### The OPTIMISTIC LOCKING way is:

NOTE: all code {between curl brackets} is intended to be in the app code and not in the SQL side

Note that the key point is in the structure of the UPDATE instruction and the subsequent number of AffectedRows check. It is these two things together that let your code realize that someone has already modified the data in between when you have executed the SELECT and UPDATE. 

```sql
-
SELECT iD,
       val1,
       val2,
       VERSION
FROM theTable
WHERE iD = @theId;
 
- {code that calculates newVal1, newVal2} -

UPDATE theTable
SET val1 = @newVal1,
    val2 = @newVal2,
    VERSION = VERSION + 1
WHERE iD = @theId
  AND VERSION = @oldversion;
 
- {IF AffectedRows == 1 } 
- {proceed with other code} 
- {ELSE} 
- {decide what to do since it has gone bad} 
- {endif}
```

Here is shown that we can use a dedicated field (that is modified each time we do an UPDATE) to see if anyone was quicker than us and changed the row between our SELECT and UPDATE. 

## Client State

The Apollo GraphQL client, which we've chosen to use in this architecture, persists query results in a local cache (for the purpose of composing and/or deriving app state in the client for Optimistic and Offline-First UI implementations) To get around this complexity, we use forceFetch to bypass cache and GraphQl Subscriptions to update fetched, dynamic data.

After loading the data, instead of having to fetch app state from the server continuously to keep transient client state in sync, which does not scale, Feathers realtime events save the day by telling us only when there has been a change to the data. This means that each route on the client has to listen to those events that relate to it so it can update its data, and when the route comes up again we would fetch again from the server. 

We leave it to the client to decide exactly what part of that area of app state it wants to refresh. So if you have e.g. a grid of 100K rows and UI is displaying rows 20-60, we won't care if rows 500-2500 have changed, so we don't need to push that data to the client. Since GraphQL Subscriptions are dynamically specified by the client this isn't an issue. 

The local state of the component can be used for query params such as the index of the last fetched item in a social status feed, so the status feed component, upon receiving a mutation signal from the server that is relevant to it, can get the latest items (from last index, which is passsed in as query param) We may generalize this pattern to UI components with arbitrary data structures. We do this because there is no way for the server to know what was the last state of the status feed on the client without the server becoming stateful and losing horizontal scalability or reliability.

For complex components like forms, a good pattern is for local component state to be lifted into an auto-generated higher order component (HOC) wrapper so that all client components will be functionally pure and local state, e.g. validation state, will be in the HOC.  

So while app state is not composed and/or derived on the client things are different when it comes to transient client state:

1. For transactions that involve a sequence of multiple routes/screens, we should keep transient client state in a route-centric store in the UI, where each route has its own store that can be passed into the next route upon route transition to seed initial state of that route, until the transaction has been committed via a GraphQL mutation. A good example is a multi-step food ordering UI, where you select your pizza crust then the toppings then the sides etc. The idea is that we should be able to go back and pick a burger instead if a pizza and not end up with an inconsistent state having a burger with peperoni for topping. 

2. Each route has a main container component associated with it and it's that component that should do the initial route hydration (and keeping in sync with server via GraphQL Subscriptions) and forward the data via props to sub-component of the route. However, each sub-component can launch its own queries and mutations and update itself and any children, with other sub-components in the route reacting to GraphQL subscription events when any of their data depenencies on the server change. This means that all components have to specify their data dependencies dynamically after initial route rendering and the sync-ing happens via GraphQL Subscriptions.

3. For client-only state (i.e. any state that is not part of 'app state', e.g animation and client side validation) we should keep that state in the local state of the component or in that of the HOC.   


## Horizontal & Vertical Scaling 

At this point, Feathers team has yet to document vertical scaling (multi-core support via Node cluster) and how that works with sockets.

Feathers can be scaled horizontally with Nginx handling the load balancing. Feathers can be Dockerized with one process per container and then scaled via Kubernetes cluster or in a more automated fashion with AWS Elastic Beanstalk and AWS Elastic Load Balancer.
