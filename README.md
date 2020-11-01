ThaliApp
==============

[![Linting and Testing](https://github.com/svthalia/thaliapp/workflows/Linting%20and%20Testing/badge.svg)](https://github.com/svthalia/thaliapp/actions)
[![Code Style](https://img.shields.io/badge/code%20style-airbnb-f30000.svg)](https://github.com/psf/black)

The new and improved ThaliApp. Because there's an App for Everything.

Getting started
---------------

1. Install _[nvm](https://github.com/nvm-sh/nvm)_ as your Node version manager
2. Use _nvm_ to install the latest release of the Node v12 release and set it as you default Node installation using `nvm install lts/erbium && nvm alias default lts/erbium`
3. Install the [Yarn](https://yarnpkg.com/) package manager using `npm install -g yarn`
4. Clone this repository
5. Set up the native build environments
    - Android
        1. Make sure you have [Android Studio](https://developer.android.com/studio/) up-and-running
        2. With Android Studio comes the Android SDK, make sure you add the following lines to your 
        `$HOME/.bash_profile` or `$HOME/.bashrc` (if you are using zsh then `~/.zprofile` or `~/.zshrc`)
        config file:
           ```
           export ANDROID_HOME=$HOME/Android/sdk
           export PATH=$PATH:$ANDROID_HOME/emulator
           export PATH=$PATH:$ANDROID_HOME/tools
           export PATH=$PATH:$ANDROID_HOME/tools/bin
           export PATH=$PATH:$ANDROID_HOME/platform-tools
           ```
           _Please make sure you use the correct Android SDK path. You can find the actual location 
           of the SDK in the Android Studio "Preferences" dialog, under 
           `Appearance & Behavior → System Settings → Android SDK`._
        3. Test that your setup is correct by running `adb devices`
        4. Create a file called `local.properties` inside the `android` folder of the project 
        in which you must specify the SDK location using `sdk.dir=$HOME/Android/sdk`.
    - iOS
        1. Install Xcode from the Mac App Store
        2. Install the Xcode command line tools using `xcode-select --install`
        3. Run `yarn fastlane:install` in the root of the project directory
        4. Run `yarn fastlane:ios match development` to obtain the development certificates
            - To be able to execute this command you need the encryption password for the
            ThaliApp-passwords repository as well as access to this repository
4. Run `yarn install` to get all the Node dependencies
5. Setup the Firebase configuration by decrypting and moving two files to the correct location from the ThaliApp-password repository:
    - `google-services.json` to `android/google-services.json`
    - `GoogleService-Info.plist` to `ios/GoogleService-Info.plist`
6. Setup the Sentry integration using `npx @sentry/wizard -i reactNative -p ios android`
    - To be able to do this you need access to our Sentry organisation, we use SSO with our Github organisation for this
    - Alternatively you can setup Sentry using the example files below. The wizard will do these steps for you.
7. Start the development server using `yarn start`
8. Deploy the app on a running emulator or connected device by running `yarn start:android` or `yarn start:ios`


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

### Fastlane

Our repository contains a [Fastlane configuration](https://fastlane.tools) that you can use to build and deploy the app for Android and iOS.
To use Fastlane follow these steps:
 1. To be able to start you need [an installation of Ruby](https://www.ruby-lang.org/en/documentation/installation/)
 2. The first time run `yarn fastlane:install`
 3. Then use fastlane by running `yarn fastlane:<platform> <command>`
 
In the case of iOS we use [Fastlane Match](https://docs.fastlane.tools/actions/match/) to setup the certificates required to build apps.
It can help to setup a `.env` file in the `ios/fastlane` folder for your convenience.

| Command           | Description                     | Platforms    |
| :---------------- | :------------------------------ | :----------- |
| test              | Runs native platform tests      | Android      |
| build             | Build the native platform code  | Android, iOS |
| deploy_adhoc      | Create a release or AdHoc build | Android, iOS |
| deploy_internal   | Create a release and deploy to the internal Play Store track or Testflight | Android, iOS |
| deploy_beta       | Create a release and deploy to Play Store beta or Testflight with external testers | Android, iOS |
| deploy_production | Create a release and deploy to Play Store or App Store | Android, iOS |
| match             | Get the certificates to sign iOS apps | iOS |

