ThaliApp
==============

[![pipeline status](https://gitlab.science.ru.nl/thalia/ThaliApp/badges/master/pipeline.svg)](https://gitlab.science.ru.nl/thalia/ThaliApp/commits/master) [![coverage report](https://gitlab.science.ru.nl/thalia/ThaliApp/badges/master/coverage.svg)](https://gitlab.science.ru.nl/thalia/ThaliApp/commits/master)
Android: [![BuddyBuild](https://dashboard.buddybuild.com/api/statusImage?appID=59b91aadba233f000121b9d3&branch=master&build=latest)](https://dashboard.buddybuild.com/apps/59b91aadba233f000121b9d3/build/latest?branch=master)
iOS: [![BuddyBuild](https://dashboard.buddybuild.com/api/statusImage?appID=59b56f51ff3d3c000160a8fa&branch=master&build=latest)](https://dashboard.buddybuild.com/apps/59b56f51ff3d3c000160a8fa/build/latest?branch=master)

The new and improved ThaliApp. Because there's an App for Everything.




Getting started
---------------

0. Get at least the latest [Node](https://nodejs.org/en/) LTS version
1. Install the [Yarn](https://yarnpkg.com/) package manager
2. Set up the Android (and/or if you're running macOS: iOS) development environment using [this guide](https://facebook.github.io/react-native/docs/getting-started.html#android-development-environment)
3. Clone this repository
4. Run `yarn install` to get all the required dependencies
5. Start the development server using `yarn start`
6. Deploy the app on a running emulator or connected Android device by running `yarn start:android`


Logging and debugging
---------------

Reading the basic logs is easy, you can run `yarn log:android` or `yarn log:ios` to oen the standard log output in your terminal.
Follow [this guide](https://facebook.github.io/react-native/docs/debugging.html) for more advanced debugging.
