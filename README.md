
## Pure UI with GraphQL and Entity-Mapped Microservices

### From Anti-Patterns To Effective Patterns

Prior to adopting GraphQL, we observed that UI developers, using current frameworks, will often isolate and model app state in the UI in denormalized or partially normalized form. 

Example: both objects A and B reference object C, so two copies exist of object C 

This means that every time we find out that C changed we need to update it in two (or many) places, which leads to messy state management and increased chance for communicating inconsistent/invalid state to the user and/or server

One solution is to use a library which normalizes/denomralizes data which can degrade UI performance by blocking the UI longer than the frame budget or by taking a long time in the background when the data structures are large (when fetching data from the API) and/or have deeply nested relations once normalized (when populating the UI with data) 

Moreover, if the API output results in many repeated entries (e.g. getting movie times for the day across many theaters) the JSON to be parsed will be larger than it needs to be than if the API output was de-duped (with type name and id's remaining in output, but not the content of each item)

Some developers have opted to partially denormalize at the server (e.g. de-duping) and in the client (for shallow relationships) but that doesn't really solve the problem as we'd still have a denormalized state model on the client that has to be kept in sync with the server.

The best solution we found to the above is to use GraphQL and start with a normalized data model in the GraphQL Schema with performant, entity-mapped CRUD microservices corresponding by name and structure to user-defined data types (with id's being used as relational constructs) then de-normalize (with de-duping using the graphql-deduplicator library) using performant, async resolvers on the server, on-demand, according to the shape of the UI component to be rendered, then cache static data (only) in the UI. 

Also, instead of fetching deeply nested structures all at once we can use GraphQL pagination to fetch in stages as the user epxlores the related entities in our data, which is to say we paginate the edges at each node. We can also avoid ending up with N+1 queries for nested 1-to-many relations by using libraries like graphql-resolve-batch to batch the edges at each node into one resolver invocation (using a special resolver function that works with arrays of values as source.) 

With GraphQL we can fetch data from the server (or from cache in case of static data), denormalize and shape it declaratively on-demand, to match the state tree of the part of the UI to be rendered.

Another anti-pattern UI developers often implement is fetching object A, object B and (conditionally) object C from the server then composing object D in the client, possibly with some new fields derived on the client side. This leads to three major problems, the first problem being the data aggregation logic is imperatively coded in the UI and as requirements change there is a lot of re-work, and the second and third problems being the leaking of business logic into the UI in the form of service orchestration and data/state derivation.

With GraphQL sitting on top of performant, entity-mapped CRUD microservices, we get to aggregate data declaratively by simply defining the higher-order types, including any derived primitive fields they may contain, and the relationships between them (and to themselves, in case of recursive type relations) then coding the query/mutation resolvers (where service orchestration can happen in case of mutations) and the type resolvers (where aggregation happens automatically in the process of resolving any type relations in the query/mutation output, and where new data may be derived.)    

This way business logic remains out of the UI and the UI state tree can be composed as a pure projection of app state on the server. 

### Demand Driven Architecture with GraphQL and Entity-Mapped Microservices

The normalized data model of our application is a graph. We have different types of data in it, which make up the nodes in the graph (the entities in our model,) and which are constructed as relations to single instances or lists of primitive types and/or other model entities (or relations to single instances or lists of themselves, aka recrusive type relations.) The relations make up the edges of the graph. Using GraphQL on top of performant, entity-mapped CRUD microservices, where each microservice's singular REST end point represents one node/entity in our graph/model, we can define in a GraphQL Schema the input and output data types and declare typed queries and mutations, which are resolved at runtime using the corresponding query/mutation resolvers (where service orchestration can happen in case of mutations) and output type resolvers (where aggregation happens automatically in the process of resolving any type relations in the query/mutation output, and where new data may be derived.). GraphQL then shapes the returned data to match the desired response structure and how it's to be provided (e.g. pagination, lazy loading, live reloading, etc) as specified in the runtime query or mutation operation.  

This means that we can change the structure of the response from our backend without touching any imperative code, and do so on demand from different types of client (desktop, mobile, xbox, etc.) Also, adding new features to our app would simply involve adding more types of data and new queries and mutations to the Schema and the corresponding resolvers, or reusing existing ones while specifying a different response structure at runtime. Having GraphQL in the mid-tier means that we can avoid spreading data aggregation/shaping and data derivation logic in our UI and server, and have declarative aggregation and dynamic shaping out of the box on the server.

![GraphQL](https://image.ibb.co/n5rx4b/Untitled_Diagram_42.png)

### Responsive Web: From Framework-Dependent Resuable Components To Browser-Native Resuable Custom Elements

#### Work In Progress 

There are two fundamental W3C-specified Web Components technologies built and polyfill'ed (with intent to build) into modern browsers: 

Shadow DOM (for DOM/CSS encapsulation) and 
Custom Elements (user-defined native browser components with state and lifecycle hooks)

SkateJS allows us to export components rendered by React, Angular 2, 4, Vue, and other modern composition-oriented frameworks as W3C Custom Elements and compose those Custom Elements into higher order Custom Elements with data flowing from parent to descendants and so on. 

With SkateJS we can have an Angular 4-rendered Form custom element composing Angular 2-rendered input and selection custom elements, or the other way around with Angular 2-rendered Form custom element composing Angular 5 --and Angular 4-- rendered input and selection custom elements.

SkateJS also provides a Router that is framework agnostic. Only the rendering part of any framework (Angular, React, Preact, Vue, et al) is ever used.  

This way we can build SkateJS-based reusable component libraries using any version of Angular (> 2), React, Vue et al and be able to use those components in our SkateJs-based site together, including via composition, and be able to upgrade our app (when a new version of React, Angular or Vue et al comes out) one component at a time, in piecemeal fashion as in iterative agile development, as opposed to having to do it all at once, as in waterfall development, which is almost always an unrealistic approach. This works because our components are essentially all custom elements regardless of rendering library we use (different versions of Angular, React, Preact, Vue, et al)

Lastly, to make components reusable they must be stateless but in case of necessary state/logic for things like animation or isomorphic validation logic (on both client and server) we would use UI-less parent component to where all state mutation and animation/validation logic is contained so that the components within them can be logic-less and thus reusable.

