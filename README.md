com.netsmartcompany.rating
==========================

Titanium Alloy Widget to prompt users to rate an app

## Overview
This is a widget for the [Appcelerator](http://www.appcelerator.com) [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) MVC framework to prompt a user if they want to rate an app.

## Features

* Free to use and open source
* Drop the widget into your view XML file
* Works on Android, iOS
* Once they've rated the app it will no longer ask them to rate again unless you clear it out.

## Usage

* Add the widget to a view
```xml
<Widget id="rating" src="com.netsmartcompany.rating"/>
```

* Initialize it in your controller
```js
var appId = "APPID",   //App ID for itunes or GooglePlay
    appName = "CoolApp", //Name of you APP for the Title
    appMsg = "If you enjoy using CoolApp, would you mind taking a moment to rate it?  Thanks!",//Message you want to display to the user to get them to rate it.
    runEvery = 3, //How many times can they run the app before being prompted to rate it.
    appDebug = false; //If set to true it will run it every time.

$.rating.init(appId, appName, appMsg, runEvery, appDebug);
'''

* Run it in your controller 
```js
$.rating.run();

* Clear it out so it prompts them again
```js
$.rating.clear();