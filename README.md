
## Making Modifiability a First-Class Citizen in App Architecture

A maintainable application architecture requires that the UI only contains the rendering logic and the queries and mutations against the underlying data model on the server. A maintainable architecture requires that the UI does not compose and/or derive app state or hardwire a projection of it in the client since that would unnecessarily embed business and data shaping logic into the client. 

App state should be persisted in backend store(s) and projected in the required shape to the client via a dynamic, demand-driven data layer that lets the client pull any data (without the limitation of a fixed backend API) and allows the projected app state to updated dynamically in th UI as relevant mutations occur on the server, which gives us a highly interactive, realtime UX/UI that's free of the combined weight of business logic and imperative data shaping logic. It makes it stratight forward to adapt --or even radically change-- the UI to keep up with changing business needs.

The architecture discussed here makes change a first-class citizen. 

The dynamic, demand-driven data layer is provided in this architecture by GraphQL which allows us to define a statically typed schema on the server that captures the various data types and relationships between them in our domain model, and wire the schema to data sources via resolver functions that connect to data-oriented microservices API and resolve client-specified "queries" and "mutations" against the schema. This way UI developers may code against the schema and eliminate all miscommunication with --and dependency on-- backend developers, which is what delays so many projects and makes adding new features a major chore rather then a simple and joyful process. 

Making microservices 'data oriented' means that each service is a join-free ORM or ODM model that represents exactly just one table or one collection in the database and exposing a CRUD interface plus a Find method that leverages database-specific adapter with a Standard Query DSL.) The services could also wrap an existing API and exposes it through the same exact interface. This makes backend development trivial by elininating complex relational queries from the codebase and moving app-state mutation, composition,  derivation and shaping of data for UI out of the services themselves and into I/O-bound, schema-based, input/output data type resolvers that resolve queries and mutations from the client.

With this approach, the UI developer's job becomes a much more pleasant and simpler task of building the GraphQL schema, building the UI components and specifying the queries and mutations (at the schema level) per each I/O event. This way the UI becomes a thin realtime I/O layer, without any business logic. 

In summary, we use GraphQL dynamically compose and/or derive app state and produce a UI-specific projection/shape of it, via composable, data-oriented microservices, and then have that projection updated in real time (with help of GraphQL Subscriptions) whenever the data behind the rendered portion of app state changes on the server. 

Currently popular architectures that compose and/or derive "app state" in the client (usin Redux, MobX, et al) and shape it for the UI necessarily embed business logic and app-state shaping logic into the client thus making 'change' a second class citizen. While those architectures also enable things like 'optimistic UI updates' and 'offline first' capability they exponentially complicate the work involved in changing the UI to keep up with changing business needs. 

This architecture uses React and Apollo Client as the UI stack. Apollo Client gives us great flexbility to implement this architecture (see: https://dev-blog.apollodata.com/apollo-link-creating-your-custom-graphql-client-c865be0ce059)

## Architecture | Benefits

![GraphQL](https://s26.postimg.org/5jl1t7ivt/Untitled_Diagram_16.png)

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

## Service Level Joins

Let’s consider two entities, which each one of them is dealing with a different table in the database. The Deal Table is connected to Customer Table by Foreign Key (FK), so whenever we need information about the deals of a single customer, a simple SQL join will do the job.

![database](https://s29.postimg.org/55at5q6w7/image2.jpg)

In order to transform the whole relationship into a decoupled services approach we get rid of the FK. By doing this the service Deal will have to provide all the safeguards of an FK handling. In this particular case, every time a new request comes, we need to check if a deal does exist for the given customer and return only those deals.

Essentially, the services will be like this:

![services](https://s29.postimg.org/m4jrkzi3r/image3.jpg)

This radical approach brings up the following question:

With the old approach, a simple SQL join will bring us both the customer and deal information. Now, we need to perform two primary key lookups in order to get the same result (see Distributed Transactions and Concurrency Control.) Is the new approach slower because we need to make two calls to gather same information? The answer: it depends. We don't need SQL joins in this approach. Data is joined at the services layer and is normalized based on relations expressed in the GraphQL schema, which are implemented by resolvers which call into services, where each service encapsulates only one table/collection. There is no longer a relational join overhead. We're doing a simple lookup or update against a single table/collection. But the answer is that it depends on our schema design and the complexity of our query. 

However, the benefits in turning those entities into services are:
  
  1. The Deal and Customer tables can be in different databases without overwhelming a single database when we need to scale. Same for the Deal and Customer services.
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

## Distributed Transactions

A distributed transaction includes one or more statements that, individually or as a group, update data on two or more distinct nodes of a distributed database. 

Databases that can be distributed may offer serializability or lineralizability or both. In a distributed database setting, the minimum required standard for transactional integrity is serializability.  

## Criteria for Distributing Services 

In the case of this architecture, we don't need any services directly exposed to client. GraphQL is our single point of contact for the client. We can also have many instances of Node each running GraphQL+FeathersJS Microservices begind a load alancer. So there is no need to distribute the services themselves as the HTTP/Socket connection would add more overhead and complexity to the architecture than distributing would gain us in scalability. In addition, these services are I/O bound. CPU-bound services need to be written in the most performant, multi-threaded language.

The thing to distribute would be the database, but if we do that then we need to handle concurrent mutations in shared resources in a distributed way, and for that we have to understand the options we have in the context of the CAP theorem.  

## Transaction Management

Note: Transaction Management could be handled separately by the API layer or it could be handled at the GraphQL resolver level (in case of heterogenous systems.) This section assumes the latter.

A transaction is a way of representing a state change. Formal transactions must be:

- Atomic (a state change either happens in whole or not happen at all; you can never see a partial change)
- Consistent (any attempt to commit an invalid change will fail, leaving the system in its previous valid state)
- Isolated (no-one else sees any part of the transaction until it's committed)
- Durable (transactions that have committed must be persisted first)

What happens in this kind of microservices architecture when we need to make multiple mutations that are part of a single transaction (end state) across one or more services? Nothing if you have only one user and you're not interleaving writes. But what if you have two or more users concurrently using your application, with reads/writes against the same set of data?  The way this architecture is setup is we have joins happening in the GraphQL query and mutation resolvers. So for a transaction implementing dependent mutations asynchronously, the mutation resolver would orchestrate that transaction using conditional writes to guarantee consistency of our app state. If we're using a distributed database, for web scale transaction management, we would use one, like Google's Cloud Spanner, that can implement non-blocking concurrency control to guarantee consistency.

Some options:

  1. [Distributed] Transactional Features of DynamoDB: https://quabase.sei.cmu.edu/mediawiki/index.php/Amazon_DynamoDB_Consistency_Features (also see DynamoDB Java transaction library)

  2. [Distributed] Transactional Features of Google's Cloud Spanner: https://cloud.google.com/spanner/docs/transactions

  3. [Single Instance] Optimistic Locking and Two-Phase Commit (2PC) in SQL  

### Optimistic Locking (for a single db instance)

Optimistic Locking is not a database feature, not for MySQL nor for others: optimistic locking is a practice that is applied using the DB with standard instructions.

Let's have a very simple example and say that you want to do this in a code that multiple users/clients can run concurrently.

This assumes use of Feathers-Knex rather than Sequelize and assumes one DB instance, not distributed.


SELECT data from a row having one ID field (iD) and two data fields (val1, val2)
optionally do your calculations with data
UPDATE data of that row

#### The NO LOCKING way to is:

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

#### The OPTIMISTIC LOCKING way is:

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

### Two-Phase Commit (2PC) 

What happens if we're in the middle of a transaction that mutates (through promise-chained service invocations) many tables in our database and the application server crashes? The fact that we use data oriented microservices, where each service represents a table or collection in the database and that we may have dependent sub-mutations that are carried out via separate services, means that we have to account for possibility of server crashing in the middle of a transaction. To solve this, many databases support a two-phase commit (2PC) process where we can rollback a transaction upon server failure or any logical failure. 

In a distributed DB scenario, Google Cloud Spanner also supports 2PC: https://cloud.google.com/spanner/docs/transactions and Amazon's DynamoDB supports this via a Java transaction library.

## Client State

The Apollo GraphQL client, which we've chosen to use in this architecture, persists query results in a local cache (for the purpose of composing and/or deriving app state in the client for Optimistic and Offline-First UI implementations) To get around this complexity, we use forceFetch to bypass cache and use GraphQL Subscriptions to update curremtly rendered dynamic data.

After loading the data, instead of having to fetch app state from the server continuously to keep transient client state in sync, which does not scale, Feathers realtime events save the day by telling us only when there has been a change to the data. This means that each route on the client has to listen to those events that relate to it so it can update its data, and when the route comes up again we would fetch again from the server. 

We leave it to the client to decide exactly what part of that area of app state it wants to refresh. So if you have e.g. a grid of 100K rows and UI is displaying rows 20-60, we won't care if rows 500-2500 have changed, so we don't need to push that data to the client. Since GraphQL Subscriptions are dynamically specified by the client this isn't an issue. 

For complex components like forms, a good pattern is for local component state to be lifted into an auto-generated higher order component (HOC) so that all client components will be functionally pure and local state, e.g. form validation state, will be in the HOC. 

The local state of the HOC can be used for query params such as the index of the last fetched item in a social status feed, so the status feed component, upon receiving a mutation signal from the server that is relevant to it, can get the latest items (from last index, which is passsed in as query param) We may generalize this pattern to UI components with arbitrary data structures. We do this because there is no way for the server to know what was the last state of the status feed on the client without the server becoming stateful and losing horizontal scalability and reliability.

To summarize, when it comes to transient client state and client-only state:

1. For transactions that involve a sequence of multiple screens, we should keep transient client state in a screen-centric store in the UI, where each screen has its own store that can be passed into the next NodeJS served route upon transition to seed initial transient client state for the route, until the transaction has been committed (via a GraphQL mutation) at which point we get rid of the transient state. A good example is a multi-step food ordering UI, where you select your pizza crust then the toppings then the sides etc. The idea is that we should be able to go back and pick a burger instead if a pizza and not end up with an inconsistent state having a burger with peperoni for topping. 

2. Each route has a main container component associated with it and it's that component that performs initial route hydration and forwarding the data via props to its component sub-tree. This means that the route component must specify the data dependencies for the route statically and/or dynamically (based on query params) and must manage the GraphQL subscriptions for the route. Each sub-component would then alter query params (the hash fragment) when its state change results in the need to fetch data per user interaction or automatically resync with server. The route component would then get the data (directly or via subscription) and pass it down to its component sub-tree. This model works well for React Fiber (the async, priority-based renderer for React) as React gets to optiumize the rendering of the whole coponent tree for the route as opposed to launching competing async rendering processes from each sub-tree. 

3. For client-only state (i.e. any state that is not part of 'app state', e.g animation and client side validation) we should keep that state in the local state of the component or in that of the HOC. 

## Horizontal & Vertical Scaling 

At this point, Feathers team has yet to document vertical scaling (multi-core support via Node cluster) and how that works with sockets.

Feathers can be scaled horizontally with Nginx handling the load balancing. Feathers can be Dockerized with one process per container and then scaled via Kubernetes cluster or in a more automated fashion with AWS Elastic Beanstalk and AWS Elastic Load Balancer.
