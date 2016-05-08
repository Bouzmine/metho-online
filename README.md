<<<<<<< HEAD
This is the `www` folder where all the magic happens. Here's a list of the folders in it and their content :
- `css` : Folder containing .css files used in the styling of the app.
- `img` : Folder containing all the images used in the app.
- `js` : Folder containing the JavaScript files used for the app logic.
- `lib` : Folder containing all the libraries used in the app.
- `templates` : HTML files used in each of the views (step in the interface).
=======
# Metho
####This app is being worked on

This app (iOS only currently) permits to students of the *École d'Éducation internationale* of McMasterville, Quebec aka *ÉÉI* to make bibliographic references automagically. It currently doesn't work, as it's being developed. 

This app is intended to go live into the iOS' App Store and Android's Google Play Store when ready. You can try and install the app in it's current stage by downloading the source code and sideloading it. Mac OS X is needed to sideload apps to iOS.

**Note :** This app is only tested in iOS for the moment. Android will be tested later.

##Sideloading this app on iOS (Mac needed)

To sideload this app to an iOS device, you first need a Mac computer (OS X 10.6.6 or later).

**Note :** Sideloading this app requires advanced computer skills (command-line needed).

1. Download Xcode from the Mac App Store
2. Download the source code of this app by clicking the "Download ZIP" button
3. Install `npm` from [NodeJS' website](nodejs.org)
4. Open `Terminal.app` located in Utilities folder
5. Run `sudo npm install npm -g` command in the terminal
6. Then, run `npm install -g cordova` to install *Cordova* the tool used in the making of this app.
7. Run `npm install -g ionic` to install *Ionic* another tool
8. Extract the archive you downloaded from GitHub into a folder
9. Move into that directory using `cd` in Terminal and run `cordova platform add ios`
10. Next, add the plugins in use with `cordova plugin add cordova-plugin-splashscreen cordova-plugin-x-socialsharing` 
11. Open `platform/ios/Metho.xcodeproj` in Xcode
12. Open Xcode > Preferences and login with your Apple ID
13. Close the Preferences
14. Click on "Metho" on the left sidebar
15. In the main pane, choose your Apple ID as the team and click "Fix"
16. Plug in your iOS device
17. Go back to the `Terminal.app` and run `ionic run ios --device`
18. Go to Settings on your iOS device in General > Profiles, click on your email address and choose to trust

If you have any problem post that as an issue.



##Technologies

The technologies in use in this project are [Ionic](ionicframework.com) and [Cordova](cordova.apache.org). This means it is an hybrid app.

## Attributions and licences

Attributions and licences are inside the app in Settings->Attributions view.



Francis Clavette © 2016. All rights reserved.
>>>>>>> upstream/master
