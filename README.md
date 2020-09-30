ThaliApp
==============

[![Linting and Testing](https://github.com/svthalia/thaliapp/workflows/Linting%20and%20Testing/badge.svg)](https://github.com/svthalia/thaliapp/actions)
[![Code Style](https://img.shields.io/badge/code%20style-airbnb-f30000.svg)](https://github.com/psf/black)

The new and improved ThaliApp. Because there's an App for Everything.

Getting started
---------------

0. Get at least the latest [Node](https://nodejs.org/en/) LTS version
1. Install the [Yarn](https://yarnpkg.com/) package manager
2. Set up the Android (and/or if you're running macOS: iOS) development environment using [this guide](https://facebook.github.io/react-native/docs/getting-started.html#android-development-environment)
3. Clone this repository
4. Run `yarn install` to get all the required dependencies
4a. For iOS development, install `cocoapods` and run `pod install` within the `ios` folder. Also note that you must configure app signing in Xcode settings.
4b. For Android Development you must download the Android SDK, you can do this with, for example, [Android Studio](https://developer.android.com/studio/). After downloading the Android SDK you must specify the SDK location within a `local.properties` file in the `android` folder. Specify it with `sdk.dir=[SDK location]`.
5. Start the development server using `yarn start`
6. Deploy the app on a running emulator or connected Android device by running `yarn start:android`


Logging and debugging
---------------

Reading the basic logs is easy, you can run `yarn log:android` or `yarn log:ios` to oen the standard log output in your terminal.
Follow [this guide](https://facebook.github.io/react-native/docs/debugging.html) for more advanced debugging.
