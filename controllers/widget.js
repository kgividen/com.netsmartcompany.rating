var OS_NAME = "android";
if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
    OS_NAME = "ios";
}

var APP_ID = '',
    APP_NAME = '',
    APP_TXT = '',
    APP_RUN_EVERY = '',
    APP_DEBUG = false;

$.init = function (appId, appName, appText, runEvery, appDebug){
    APP_ID = appId;
    APP_NAME = appName;
    APP_TXT = appText;
    APP_RUN_EVERY = runEvery;
    APP_DEBUG = appDebug;
};
$.run = function(){
    var timesRun = Ti.App.Properties.getInt('com.netsmartcompany.timesRun' + APP_ID);
    var hasRated = Titanium.App.Properties.getBool('com.netsmartcompany.hasRated.' + APP_ID);
    $.rateLbl.text = "Rate " + APP_NAME;
    //Set it to default of 0 if it's never been set before
    if(!typeof timesRun){
        Ti.App.Properties.setInt('com.netsmartcompany.timesRun' + APP_ID, 0);
    }

    //Ti.API.info("timesRun: " + timesRun + " hasRated: " + hasRated + " debug: " + APP_DEBUG);
    if(!hasRated || APP_DEBUG) {
        $.appTitle.text = APP_NAME;
        $.appBody.text = APP_TXT;
        //Ti.API.info("timesRun: " + timesRun + " timesRunMod:" + timesRun % APP_RUN_EVERY + " debug: " + APP_DEBUG);
        if ((timesRun % APP_RUN_EVERY) == APP_RUN_EVERY -1 || APP_DEBUG) {
            Ti.API.info("open ratings!!");
            $.ratingWin.open();
        }
        Ti.App.Properties.setInt('com.netsmartcompany.timesRun' + APP_ID, timesRun + 1);
    }
};

$.clear = function(){
    Ti.App.Properties.setInt('com.netsmartcompany.timesRun' + APP_ID, 0);
    Titanium.App.Properties.setBool('com.netsmartcompany.hasRated.' + APP_ID, false);
};

function closeWin(){
    $.ratingWin.close();
}

$.ratingView.addEventListener('click', function(e) {
    var action = e.source.action;
    if (action === "rate") {
        if (OS_NAME == 'ios') {
            Ti.Platform.openURL('itms-apps://itunes.apple.com/app/id' + APP_ID);
        } else {
            Ti.Platform.openURL('market://details?id=' + APP_ID);
        }
        Titanium.App.Properties.setBool('com.netsmartcompany.hasRated.' + APP_ID, true);
    } else if (action === "bummer") {
        Titanium.App.Properties.setBool('com.netsmartcompany.hasRated.' + APP_ID, true);
    }
    closeWin();
});