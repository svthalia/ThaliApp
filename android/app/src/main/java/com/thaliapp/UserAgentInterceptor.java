package com.thaliapp;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

/**
 * An interceptor that sets the User-Agent header to `ThaliApp/{version} Android`
 */
public class UserAgentInterceptor implements Interceptor {
    @Override
    public Response intercept(Chain chain) throws IOException {
        Request originalRequest = chain.request();
        Request requestWithUserAgent = originalRequest.newBuilder()
                .header("User-Agent", "ThaliApp/" + BuildConfig.VERSION_NAME + " Android")
                .build();

        return chain.proceed(requestWithUserAgent);
    }
}
