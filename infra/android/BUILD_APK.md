# 📱 Build the Zero Hub Android APK

## Requirements
- Android Studio (free): https://developer.android.com/studio
- JDK 11+ (bundled with Android Studio)

---

## Steps to build the APK (5 minutes)

### 1. Open the project
- Launch Android Studio
- Click **Open** and select the `android/` folder inside this ZIP

### 2. Let Gradle sync
- Android Studio will download dependencies automatically (~2 min first time)
- Wait for "Gradle sync finished" in the bottom status bar

### 3. Build the debug APK (for testing)
- Menu: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
- Wait ~1-2 minutes
- Click **"locate"** in the popup, or find it at:
  `android/app/build/outputs/apk/debug/app-debug.apk`

### 4. Install on your Android phone
Option A — USB:
```
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

Option B — Direct:
- Copy the APK to your phone
- Open it and tap Install
- (Allow "Install from unknown sources" in Settings → Security if prompted)

---

## Build a signed release APK (for distribution)

### Generate a keystore (one time):
```bash
keytool -genkey -v -keystore zero-hub-release.keystore \
  -alias zero-hub -keyalg RSA -keysize 2048 -validity 10000
```

### Uncomment signing config in `android/app/build.gradle`:
```gradle
signingConfigs {
    release {
        storeFile file("zero-hub-release.keystore")
        storePassword "YOUR_STORE_PASSWORD"
        keyAlias "zero-hub"
        keyPassword "YOUR_KEY_PASSWORD"
    }
}
```

Then: **Build → Generate Signed Bundle / APK → APK → Release**

---

## What the app does
- Opens zerofoundationusa.org in a full-screen WebView
- Supports GPS location ("Near Me Now" search)
- Back button navigates within the app
- External links open in the browser
- Works on Android 5.0+ (API 21+)

## App Details
- Package: `org.zerofoundationusa.hub`
- Version: 1.0.0
- Min SDK: 21 (Android 5.0 Lollipop)
- Target SDK: 34 (Android 14)
