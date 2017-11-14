
## Making Agility and Maintainability First-Class Citizens in Platform Architecture

A maintainable application architecture requires that the UI only contains the rendering logic and the queries and mutations against the underlying data model on the server. A maintainable architecture requires that the UI does not compose app state or hardwire a projection of it in the client since that would unnecessarily embed business logic and hardcode data shaping in the client. 

App state should be persisted in backend store(s) and projected in the required shape to the client via a dynamic, demand-driven data layer that lets the client pull any data (without the limitation of a fixed backend API) and (conditionally) allows the projected app state to updated dynamically in th UI as relevant mutations occur on the server, which gives us a highly interactive, realtime UX/UI that's free of the combined weight of business logic and imperative data shaping logic. It makes it stratight forward to adapt --or even radically change-- the UI to keep up with changing business needs.

## Architecture | Benefits

![GraphQL](https://s7.postimg.org/euxkwoqt7/Untitled_Diagram_31.png)

