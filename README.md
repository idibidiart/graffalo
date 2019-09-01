
## Pure UI with GraphQL and Entity-Mapped Microservices

### From Anti-Patterns To Effective Patterns

Prior to adopting GraphQL, we observed how web developers will often isolate and model app state in the UI in denormalized or partially normalized form. 

Example: both objects A and B reference object C, so two copies exist of object C 

This means that every time we find out that C changed we need to update it in two (or many) places, which leads to messy state management and increased chance for communicating inconsistent/invalid state to the user and/or server

Moreover, if an API call results in many repeated entries (e.g. getting movie times for the day across many theaters) the JSON to be parsed will be larger than it needs to be than if the API output was made more efficient (with type name and id's remaining in output, but not the content of each item, which can be linked similar to how a B+ tree includes only keys in each)

Some developers choose to partially denormalize at the server and in the client (for shallow relationships) but that doesn't really solve the problem as we'd still have a denormalized state model on the client that has to be kept in sync with the server.

The best solution we found for read-heavy apps is to use GraphQL and start with a normalized data model in the GraphQL Schema with performant, entity-mapped CRUD methods corresponding by name and structure to user-defined data types (with id's being used as relational constructs) then de-normalize (with de-duping using the graphql-deduplicator library) using performant, async resolvers on the server, on-demand, according to the shape of the UI component to be rendered, then cache static data (only) in the UI. 

With GraphQL we can fetch data from the server (or from cache in case of static data), denormalize and shape it declaratively and on-demand to match the state tree of the part of the UI to be rendered.

Another anti-pattern UI developers often implement is fetching object A, object B and (conditionally) object C from the server then composing object D on the client, possibly with some new state derived on the client side. This leads to the problem of having feature-specific data flow code (filtering, composing, mapping, reducing, and piping and their imperative equivalent) as well as stateful logic (together referred to as 'business logic') hardcoded in the UI, and as requirements change there is a lot of re-work.

With GraphQL sitting on top of performant, entity-mapped CRUD methods on the backend, we get declarative data flow that leverages our normalized schema with the benefit being isolating business logic in type resolvers in the mid-tier.  

This way we can keep all the data flow and business logic out of the UI and the UI state tree can be composed as a projection of app state on the server. 

### Demand Driven Architecture with GraphQL and Entity-Mapped Microservices

The normalized data model of our application is a graph. We have different types of data in it, which make up the nodes in the graph (the entities in our model,) and which are constructed as relations to single instances or lists of primitive types and/or other model entities (or relations to single instances or lists of themselves, aka recrusive type relations.) The relations make up the edges of the graph. Using GraphQL on top of performant, entity-mapped CRUD microservices, where each microservice's singular REST end point represents one node/entity in our graph/model, we can define in a GraphQL Schema the input and output data types and declare typed queries and mutations, which are resolved at runtime using the corresponding query/mutation resolvers (where service orchestration can happen in case of mutations) and output type resolvers (where composition happens automatically in the process of resolving any type relations in the query/mutation output, and where new data may be derived). GraphQL then filters the returned data to match the desired response structure and how it's provided (e.g. using pagination, lazy loading, live reloading, etc) per the query or mutation operation.  

This means that we can change the response from our backend, and do so on-demand from different types of clients (desktop, mobile, xbox, etc.) Also, adding new features to our app would simply involve adding more types of data and new queries and mutations to the Schema and the corresponding resolvers, or reusing existing ones while specifying a different response structure at runtime. 

## Optimizing GraphQL for Nested Relations

One optimization that GraphQL provides out of the box is that instead of fetching deeply nested structures all at once we can use GraphQL to fetch only as much data as we need to display as the user epxlores the related entities in our data. 

We can also avoid ending up with N+1 queries for nested relations (where N in this case is the total number the type resolver function is called for a given field of the query) by using libraries like graphql-resolve-batch to batch the edges at each node into one resolver invocation (using a special type resolver function that works with arrays of values of a given type from query/mutation result, which are then used in resolving the nested field types, such that we return a Promise for each value (for the given field) and bucket the values by synchronously under the given field, and asynchronously execute the database query with all the values for the given field during the next tick (on NodeJS) --assuming the REST API supports querying the db for multiple values at once-- then resolve all promises synchronously at once in the callback. 

To understand the importance of this added optmization, consider the following, which is very significant in the scenario where GraphQL is wrapping REST API(s) that are accessed over a network as opposed to accessing the entities in our data directly via in-memory CRUD microservices running as part of the same process. When it comes to wrapping REST APIs that are accessed over the network the N+1 query proliferation would be a serious performance issue. 

GraphQL is a powerful data querying language for both frontend and backend developers. However, because of how GraphQL queries are executed, it can be difficult to define an efficient GraphQL schema. Take for example the following query:

```graphql
{
  users(limit: 5) {
    name
    friends(limit: 5) {
      name
    }
  }
}
```

This demonstrates the power of GraphQL to select arbitrarily nested data. Yet it is a difficult pattern to optimize from the schema developer’s perspective. If we naïvely translate this GraphQL query into say, SQL, we get the following six queries:

```
Select the first 5 users.
Select the first 5 friends for the first user.
Select the first 5 friends for the second user.
Select the first 5 friends for the third user.
Select the first 5 friends for the fourth user.
Select the first 5 friends for the fifth user.
```

We have an N+1 problem! For every user we are making a trip to the server and executing a database query. This is noticably inefficient given the network latency. What happens when we have:

```graphql
{
  users(limit: 5) {
    name
    friends(limit: 5) {
      name
      friends(limit: 5) {
        name
        friends(limit: 5) {
          name
        }
      }
    }
  }
}
```

This turns into 156 queries!

Using the batching technique mentioned above, this is what we get:

```graphql
{
  users(limit: 5) {
    name
    friends(limit: 5) { # Batches 5 executions.
      name
      friends(limit: 5) { # Batches 25 executions.
        name
        friends(limit: 5) { # Batches 125 executions.
          name
        }
      }
    }
  }
}
```

That is to say, each `friends(limit: 5)` field will run exactly one time. So we end up with 4 trips to the server, total, instead of 156 (1 + 5 + 25 + 125.)

Note that if the backend is horizontally scalable, there should be an optimal maxBatch value (how many queries we batch per each trip to the server) to allow query execution to run in parallel, but it's a fine balance that we may have to find through experimenting and benchmarking.  

### Concurrency, Distributed Transactions, and Consistency

Microservices, and particularly granular, entity-mapped microservices, imply the use of distributed transactions that access database entities asynchronously, across separate databases of different types (relational, hierarchical, unconstrained graph, etc) where each given client may perform set of inter-dependent operations, including over shared data. 

If special care is not taken, such distributed transactions can lead to inconsistent and broken behavior. For example, multiple clients may place orders at the same time for the last unit of a given product, based on a concurrent read of the inventory system. Similarly, a distributed transaction might check the user's bank account, finds the balance to be $500 and charges $100 in purchases, while at the same time another distributed transaction might check the same bank account, finds it to be $500, and charges $450. Since most banks prefer availability over consistency guarantees this could easily happen, and the user would get hit with an overdraft fee as the account goes to -$50, which is eventually consistent, but terrible for UX. In other words, eventual consistency is no help where there are distributed transactions and concurrency.   

One approach to is to eliminate distributed transactions altogether by lumping services into domain model aggregates (all related entities would be accessed via one API, such that orchestration and aggregation happen synchronously within one database transaction) which allows us to break out of the pure entity-mapped API model and be able to use the database' 'strict serializable' transaction isolation level and durability guarantee to ensure atomicity and durability of the transaction and thus consistency of our data at all times. However, this removes the granular access that is needed to easily define and change our GraphQL schema and application data model on demand (without changing the underlying REST APIs) 

For a different way to approach this problem, please see:

[The Great API Masher](https://github.com/idibidiart/the-great-api-masher)

The other approach to handle data consistency (in the presence of concurrent access to shared resources, without use of domain aggregates) that does NOT tackle durability of transactions (for crash recovery, a critical requirement in case of distributed transactions) and that does not provide two-phase commit behavior (no commit consensus), is to use Offline Optimistic Locking via [Conditional HTTP Requests](https://tools.ietf.org/html/rfc7232) and using [eTag version](https://sookocheff.com/post/api/optimistic-locking-in-a-rest-api/)

### Basic Architecture

![GraphQL](https://image.ibb.co/n5rx4b/Untitled_Diagram_42.png)

### Responsive Web: From Framework-Dependent Resuable Components To Browser-Native Resuable Custom Elements

#### Work In Progress 

There are two fundamental W3C-specified Web Components technologies built and polyfill'ed (with intent to build) into modern browsers: 

Shadow DOM (for DOM/CSS encapsulation) and 
Custom Elements (user-defined native browser components with state and lifecycle hooks)
ct, Preact, Vue, et al)

To make components reusable they must be stateless but in case of necessary state/logic for things like animation or isomorphic validation logic (on both client and server) we would use UI-less parent component to where all state mutation and animation/validation logic is contained so that the components within them can be logic-less and thus more reusable, or easier to change.

