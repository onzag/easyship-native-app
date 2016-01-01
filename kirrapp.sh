adb shell ps | grep com.easyship | awk '{print $2}' | xargs adb shell kill
