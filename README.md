ThaliApp
==============

[![Linting and Testing](https://github.com/svthalia/thaliapp/workflows/Linting%20and%20Testing/badge.svg)](https://github.com/svthalia/thaliapp/actions)
[![Code Style](https://img.shields.io/badge/code%20style-airbnb-f30000.svg)](https://github.com/psf/black)

The new and improved ThaliApp. Because there's an App for Everything.

Getting started
---------------

0. Get at least the latest [Node](https://nodejs.org/en/) LTS version
1. Install the [Yarn](https://yarnpkg.com/) package manager
2. Set up the Android (and/or if you're running macOS: iOS) development environment using 
[this guide](https://facebook.github.io/react-native/docs/getting-started.html#android-development-environment)
3. Clone this repository
4. Run `yarn install` to get all the required dependencies
4a. For iOS development, install `cocoapods` and run `pod install` within the `ios` folder. Also note that you must 
configure app signing in Xcode settings.
4b. For Android Development you must download the Android SDK, you can do this with, for example, 
[Android Studio](https://developer.android.com/studio/). After downloading the Android SDK you must specify the SDK 
location within a `local.properties` file in the `android` folder. Specify it with `sdk.dir=[SDK location]`.
5. Also note that a `google-services.json` file is needed in the `android/app` folder and a `GoogleServices-Info.plist` 
file is needed in the `ios` folder in order to build both platforms respectively. These files can be acquired from 
[Firebase](https://firebase.google.com).
6. We also need to setup our Sentry integration using `npx @sentry/wizard -i reactNative -p ios android`.
Alternatively you can setup Sentry using the example files below. The wizard will do this install for you.
6. Start the development server using `yarn start`
7. Deploy the app on a running emulator or connected Android device by running `yarn start:android` or `yarn start:ios`.
Note that starting an Android device or iOS device requires you to configure them first. An alternative way to start
both the development server and the emulator is by configuring an environment in either Android Studio or Xcode.


Logging and debugging
---------------

Reading the basic logs is easy, you can run `yarn log:android` or `yarn log:ios` to oen the standard log output in 
your terminal.
Follow [this guide](https://facebook.github.io/react-native/docs/debugging.html) for more advanced debugging.


### Sentry setup

`sentry.properties`:
```
defaults.org=thalia
defaults.project=thaliapp
auth.token=<token>
```

You can find the auth token in your [Sentry account settings](https://sentry.io/settings/account/api/auth-tokens/).
If you do not have a token yet, the default scopes will do to create one.

`.env`:
```
SENTRY_DSN=https://123abc@o263149.ingest.sentry.io/1234abcd
```

You can find the Sentry DSN value in the [Sentry project settings](https://sentry.io/settings/thalia/projects/thaliapp/keys/).
