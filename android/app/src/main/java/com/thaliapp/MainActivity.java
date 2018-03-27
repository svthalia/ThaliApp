package com.thaliapp;

import android.os.Bundle;
import android.support.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.modules.network.OkHttpClientProvider;

import okhttp3.OkHttpClient;

public class MainActivity extends ReactActivity {

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        attachInterceptor();
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ThaliApp";
    }

    /**
     * Attach extra OkHttp Interceptors
     */
    private void attachInterceptor() {
        OkHttpClient client = OkHttpClientProvider.getOkHttpClient();
        OkHttpClientProvider.replaceOkHttpClient(client
                .newBuilder()
                .addNetworkInterceptor(new UserAgentInterceptor()).build());
    }

}
