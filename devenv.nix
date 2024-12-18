{ pkgs, lib, config, ... }:

{
  android = {
    enable = true;
    android-studio.enable = false;
    reactNative.enable = true;
    ndk.version = [ "24.0.8215888" ];
  };
  languages.typescript.enable = true;
  languages.java.enable = true;
  languages.java.gradle.enable = true;
  processes.react-native.exec = "react-native run-android";
}