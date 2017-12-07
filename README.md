
## Making 'Change' a First-Class Citizen in Platform Architecture

### From Anti-Patterns To Effective Patterns

Prior to adopting GraphQL, we observed that UI developers, using modern frameworks like React and Angular 4, will often isolate and model app state in the UI in denormalized form 

Example: both objects A and B references object C, so two copies exist of object C 

This means that every time we find out that C changed we need to update it in two (or many) places, which leads to messy state management and increased chance for communicating inconsistent/invalid state to the user and/or server

One solution advertised by Redux author is his Normalizr library which normalizes/denomralizes data in one synchronous call which can degrade UI performance by blocking longer than the frame budget when the data structures are large (when fetching data from the API) and/or have deeply nested relations once normalized (when populating the UI with data)  

Moreover, if the API output results in many repeated entries (e.g. getting movie times for the day across many theaters) the JSON to be parsed will be larger than it needs to be if the API output was de-duped (with type name and id's remaining in output, but not the content of each item) Also, instead of fetching deeply nested structures all at once we can split the query to fetch in stages as the user epxlores that nested data, cache previously fetched, and paginate at every level. 

The best solution we found to the above is to use GraphQL and start with a normalized data model in the GraphQL Schema with performant, naturally composable CRUD microservices corresponding to the user-defined data types then de-normalize (with de-duping using the graphql-deduplicator library) using async resolvers on the server, on-demand, according to the shape of the UI component to be rendered, then cache static data (only) in the UI and, use the Apollo GraphQL Client, to denormalize fully from the cache (or from server for dynamic data, e.g. shopping cart) and render UI.  

Another anti-pattern UI developers often implement is fetching object A, object B and (conditionally) object C from the server then composing object D in the client, possibly with some new fields derived on the client side. This leads to three major problems, the first problem being the data aggregation logic is imperatively coded in the UI and as requirements change there is a lot of rework, and the second and third problems being the leaking of business logic into the UI in the form of service orchestration and data derivation logic.

With GraphQL sitting on top of performant, naturally composable CRUD microservices, we get to aggregate data declaratively by simply defining the data types, including derived fields, and the relations between the types in GraphQL schema then coding the query/mutation resolvers (orchestration) and the data type resolvers (aggregation, derivation)    

This way business logic remains out of the UI and the UI state tree can be composed as a pure projection of app state on the server. 

### Demand Driven Architecture with GraphQL and CRUD Microservices

The data in an application is a graph. We have different types of data that make up the nodes in the graph and which are made of primitive types as well as references to other higher order types. The references make up the edges of the graph. Using GraphQL on top of performant, naturally composable CRUD microservices, where each microservice REST end point encapsulates one node in our graph, we can define in a GraphQL Schema the input and output data types and declare typed queries and mutations, which are resolved at runtime using the corresponding query/mutation resolvers (orchestration) and type resolvers (aggregation, derivation). GraphQL then shapes the returned data to match the desired response structure and how it's to be provided (e.g. pagination, lazy loading, live reloading, etc) as specified in the runtime query or mutation operation.  

This means that we can change the structure of the response and how we get it from the backend without touching the code, and do so on demand from different types of client (desktop, mobile, xbox, etc.) Also, adding new features to our app will simply involve adding more typed queries and mutations to the Schema and the corresponding query/mutation resolvers, or reusing existing ones while specifying a different response structure at runtime. Having GraphQL in the mid-tier means that we can avoid spreading data aggregation/shaping and data derivation logic in our UI and server, and have declarative aggregation and dynamic shaping out of the box on the server.

![GraphQL](https://image.ibb.co/bDeCAG/Untitled_Diagram_38.png)

### The Future: From Framework-Dependent Resuable Components To Browser-Native Resuable Custom Elements

#### Work In Progress

There are two fundamental W3C-specified Web Components technologies built and polyfill'ed (with intent to build) into modern browsers: 

Shadow DOM (for DOM/CSS encapsulation) and 
Custom Elements (user-defined native browser components with state and lifecycle hooks)

SkateJS allows us to export components rendered by React, Angular 2, 4, Vue, and other modern composition-oriented frameworks as W3C Custom Elements and compose those Custom Elements into higher order Custom Elements with data flowing from parent to descendants and so on. 

With SkateJS we can have an Angular 4-rendered Form custom element composing Angular 2-rendered input and selection custom elements, or the other way around with Angular 2-rendered Form custom element composing Angular 5 --and Angular 4-- rendered input and selection custom elements.

SkateJS also provides a Router that is framework agnostic. Only the rendering part of any framework (Angular, React, Preact, Vue, et al) is ever used.  

This way we can build SkateJS-based reusable component libraries using any version of Angular (> 2), React, Vue et al and be able to use those components in our SkateJs-based site together, including via composition, and be able to upgrade our app (when a new version of React, Angular or Vue et al comes out) one component at a time, in piecemeal fashion as in iterative agile development, as opposed to having to do it all at once, as in waterfall development, which is almost always an unrealistic approach. This works because our components are essentially all custom elements regardless of rendering library we use (different versions of Angular, React, Preact, Vue, et al)

Lastly, to make components reusable they must be stateless but in case of necessary state/logic for things like animation or isomorphic validation logic (on both client and server) we would use UI-less parent component to where all state mutation and animation/validation logic is contained so that the components within them can be logic-less and thus reusable.

