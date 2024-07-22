## TestCra

App based on Nx, Ngrx (signalStore)
No UI framework used, just plain css.

dep:

- @ngrx/signals - for state management lightweight alternative to ngrx/store
- date-fns


### App build - Run - test

- npm install
- npm start (nx serve)
- jest 


### Using App

The app work with a false backend, so no data is persisted.

You must be connected with one of ,the two profiles:
 - agent (username: john or sandy or paul, password: includes('!'))
 - manager username: pablo, password: includes('!'))

Agent can create a cra by filling all weeks one by one, manager can approve it.

rules:
- one rest week per month
- a mission for each active week is mandatory


Improvement
- manage UI on little screens