package com.thaliapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.reactnativecommunity.statusbar.RNCStatusBarPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import cl.json.ShareApplication;
import cl.json.RNSharePackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;
import io.sentry.RNSentryPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.asList(
            new MainReactPackage(),
            new RNFSPackage(),
            new RNCStatusBarPackage(),
            new AsyncStoragePackage(),
            new RNDeviceInfo(),
            new RNScreensPackage(),
            new RNGestureHandlerPackage(),
            new PickerPackage(),
            new RNSharePackage(),
            new RNSentryPackage(),
            new SnackbarPackage(),
            new RNFirebasePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNFirebaseInstanceIdPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public String getFileProviderAuthority() {
    return "com.thaliapp.provider";
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
