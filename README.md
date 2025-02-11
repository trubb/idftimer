# Trubb's Indirect Fire Timer

This is a simple timer and log for indirect fire, primarily for use in ArmA 3, but obviously it will work for any other game as well.

I currently have zero interest in putting this onto some hosting platform for public use.

Instead you should run it locally using `npm start`.\
Then navigate to [http://localhost:3000](http://localhost:3000) in your browser, if not automatically directed there.

## Structure

```rust
.
├── README.md
├── client
│   ├── public
│   └── src
└── server
    ├── cmd
    └── pkg
```

## TODOs

- implement a way to track and select from multiple batteries
- implement an automated shell tracker for each battery
- play a sound when timer reaches (nears) 0
- subtract 5-10s from the input splash time to account for time required to switch focus
- Add "development" time tracking for smoke shells
- Fix the mission time not updating as real time progresses
- Implement backend to store data and perhaps make it easier to work with the time-related things?
- Dockerize (compose)  the whole thing to make it easier to run
- **Or just turn the whole thing into a TUI application as that is clearly a better choice than fighting React**
