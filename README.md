This project is a bare, bootstrapping, version of the architecture and libraries that I have been very fond of over the past year or so. (2018-2019)
It's also a great demo application for talks about TypeScript or State-flow architecture.

## About the Architecture

The main goal of architecting a React application in this fashion is for long term maintainability. I've been biten too many times by trying to over-optimize, over-minify, and stuff too much code into a growing frontend app. The result can be a sprawling and tangled mess. 

By using the idea of seperation of concerns, we can make sure that everything building block has its place. At first that just _sounded_ like a good idea, but with 3 years of this architecture in production, it's become a reality. When a bug appears, it's usually pretty clear what area of the state flow that bug must have come from, and therefore it's easier to find and fix.

## The Libraries

The main technologies in this architecture stack are:
* TypeScript
* React
* Redux
* Redux-Oberservables (RxJS)
* Webpack

### Honorable Mentions
* React-Router
* Reselect
* Normalizr

## State Management
The most important piece of a modern web application is its state management. Proper state management can help to isolate concerns and keep components generic and reusable. Poor state management can cause components to become tightly coupled and therefore extremely difficult to reuse or refactor when the business concerns change. With this in mind, it's best to make a set of patterns and  best practices that we use in order to keep our codebase clean and maintainable. In the beginning, these patterns can feel overly verbose or obtuse, but as the codebase grows, these patterns can allow you to quickly build on top of your foundation in a prescribed manner. Additionally, having a strict set of best practices allows you to onboard and level up new teammates quickly.

### State Flow Pipeline

![Image of State Flow](https://github.com/mmissey/ts-base/raw/master/docs/stateflow.png)

By breaking our state flow into small, modular pieces that each have a specified job to do, we're able to add new features to our application without increasing tech debt. Whenever bugs are discovered, it is clear which piece we need to investigate. By strictly following this pattern we can keep our state predictable and manageable.

But before we get into the role of each piece of the pipeline, let’s talk about a few other major state patterns that we should be prescriptive about:
* Store data should be flat objects, not nested entities or arrays -- This allows for quick and easy lookup. If you need an array, use a selector.
* Metadata state, like loading or errors, should go in a separate reducer.
* State that has to do with location should be in the URL and route props. The browser is better at tracking location on the web. That's what a URL is for.

#### Route State

*Trust the URL!* 
A browser’s job is to navigate the internet, and as such, it is very good at keeping track of its own location. Rather than have generic page routes and lots of component state. We should aim to keep as much state as possible in the URL.

For instance: if a user clicks a trash can button that opens a delete modal, rather than keep the state of whether that modal is open in component state or even Redux, we keep it in the url. 

ie: `http://www.mywebsite.com/items/<itemID>/delete`

Not only does this pattern prevent the strange user experience that happens when state is out of sync, but it also has the added benefit of maintaining back-button functionality and proper url sharing.

#### Containers
`store → container → component`
Containers are a common pattern with Redux. In fact, ~they are~ before React Hooks, they used to be the most common way to get application state into a component. Containers are higher order components (HoCs) that allow us to use functions called `MapStateToProps` and `MapDispatchToProps` to inject a component with the state and actions that it may need to call directly on its props.

Within many of the containers, we use yet another HoC to immediately call one of the actions that we just injected onto the props. We call these Fetchers. They work by calling a fetch action as soon as the component is mounted.

#### Epics
`component → action → epic`
Epics are what Redux-observables uses to handle asynchronous actions. It converts Redux’s dispatch into a stream, denoted as action$, and allows us to subscribe to this stream. We can wait for specific actions by using the `action$.ofType()` operator, and then use RxJS operators to manipulate the payload and fire additional actions. The most important concept of an epic is:

Actions In : Actions Out

That is, we listen to a stream of actions coming in and often make an API call based on the payload. When the API responds we finish the epic by returning the actions that we wish to fire as a result.

For example, we might have an epic that is listening for the `images.fetch.request` action. When that action is called, the epic makes an API request and if the calls succeeds returns an `images.fetch.success` action or `images.fetch.failure` if it failed. 

Because Epics and observables use RxJS operators to functionally manipulate data, they can be extremely powerful. The above example is very simple, but imagine if we wanted to make 100 API calls but only allow 4 to be in flight at a time. Without RxJS that logic would have to live in a container or component somewhere, whereas with RxJS we can create a custom operator that can be modularized, tested, and cleanly added to state flow in one line.

#### Services
`epic → service`

The service layer is a basic abstraction of the browser’s fetch API. Each service is specific to a piece of application state. The main benefit of this layer is in our fetcher abstraction. Together, the service and fetcher use specific endpoints, headers, and api tokens to create the appropriate XHR request or, in the case of local development, request our mocked server responses.

#### Mocks
`service → api/mock → response`

In order to accelerate development velocity it's a great idea to create a system for using mocked responses in the application. The mocks are very simple json with metadata and a response. This allows you to build a fully functioning user interface and state flow for features and APIs that might not be finished yet. There might be concerns that this is wasted effort or you may end up straying too far from the eventual API, but as you’ll see in a moment our adapter patterns prevents the majority of these problems.

#### API Request State
There are many times in which you might need to show a loading indicator while waiting for your API requests to respond with requested data. Many engineers are tempted to simply add loading flags to their Redux state for every application entity.

This architecture has a philosophy around the Redux state that prevents this. We’ve decided that each entity’s state should be a hashmap of items, keyed by some unique ID.  We’ll get more into this in the normalizer section, but the main takeaway is that we want to keep our store as flat as possible. Opting to never have objects nested or next to a group of meta flags like ‘isLoading’, or ‘hasLoaded’.

Instead it follows a pattern that automatically keeps track of loading and error states. In this pattern, we create 2 additional reducers. One for loading and one for errors. Every AJAX action type’s name ends in `.request` for instance: `images.fetch.request`. When the request returns we fire either a `.success` or `.failure` action.  

In the loading reducer, we set the `store.loading[actiontype]` to true when the request action is matched, and to false when the success or failure is matched. In the case of a failure, the error reducer stores the payload from the error so that we can handle it in the UI. Both of these reducers are easily subscribed to in any component’s container HoC.

#### Adapters
`response → adapter`

The adapter pattern is  one of the biggest keys to success. It solves the problem of an incomplete, changing, or just generally not perfect API response. In a web application, the main concern should be about the state that we need in order to show the user the data that they need. The API, however, may not give us this data in the most usable fashion. 

With the adapter pattern, we take the API’s data shape and mutate it into only what we need in the web application. This might mean converting 0’s and 1’s to true booleans, or decorating the object with more useful information calculated from the response, rather than calculate those values on every render. 

If the API changes in the future, rather than search through our code looking for API specific variable names to change, we can simply change it in one spot and be confident that the adapter was the only place in our application that referenced that key.

#### Normalizers
`adapter → normalizer`

As previously mentioned, each entity in our store should be a normalized hashmap of items. That is, if I look at our store I should see:

```entity: {
    id: { object }
    id: { object }
    …
},
entity2: {
    …
}
```

All of the posts are on the first level of store.posts, all of the images are on store.images, and so on. 

Keeping the store simple and flat reduces a lot of the cognitive overhead as well as just reducing the possibility of errors. We use Normalizr to create schemas and automatically normalize our adapter’s responses before the data is sent to the reducer. 

#### Reducers
`epic → action → reducer`

The adapter and normalizer portions of the state flow actually take place within the service layer, and the service layer takes place within the epic layer. So the epic calls the service, which fetches the data, gets a response, and pipes it through the adapter and normalizer before returning the normalized response to the epic. 

The epic has no concept of the adapter or normalizer. It just calls the service and receives a response that either looks just like the shape of our store, or an error. Following that `actions in : actions out` pattern, the epic fires the success action and that is what the reducer is listening for.

When the reducer sees the success action, the payload on that action is the exact shape of one or many of the items in the store, and the reducer can update the store’s data appropriately. This is the normal Redux pattern and from here the container can pick up the new store.

#### Selectors
`reducer  → container → selector → component`

The final step of our not-so-simply state flow before we get our data to the component is the selector. The selector pattern allows us to pick data off of our store without mutating any data. Selectors are used within a container’s `MapStateToProps` in order to memoize injected props and prevent unnecessary rerenders. While the pattern does not demand that this data is memoized, it is one of the major benefits that we get from selectors. Using Reselect, we’re able to create selectors that can combine data from multiple stores, run mutations or calculations, and hold onto that data without recalculating until the original data is mutated by an action being fired. 


### In Conclusion

Mindfully planning the state flow of your application is one of the most important pieces in frontend architecture, but what has worked for me and my team may not work for you and your's. This is by no means the end-all-be-all state design. In fact, it could probably stand to be updated for the latest versions of React, maybe a different package manager, etc. Overall this has been great for us and has laid a great foundation from which to expand, but it's not perfect! 
