package com.odysse;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.reactlibrary.RNReactNativeHapticFeedbackPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.horcrux.svg.SvgPackage;
import com.reactlibrary.RNSimpleCompassPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSoundPackage(),
            new ReactVideoPackage(),
            new RNReactNativeHapticFeedbackPackage(),
            new BlurViewPackage(),
            new LottiePackage(),
            new SvgPackage(),
            new RNSimpleCompassPackage()
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
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
