var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};


var addRemoveClock = function() {
    webdriverio
        .remote(options)
        .init()
        .url('http://timercity.com')
        .pause('2000')
        .click("//input[@id='title']")
        .pause('2000')
        .keys('test clock')
        .click("//button[@id='add']")
        .pause('3000')
        .click("//div[@id='timer1']/button[@class='close']")
        .pause('3000')
        .title(function(err, res) {
            console.log('Title was: ' + res.value);
        })
        .end();
}

var addRemoveAlarm = function() {
    webdriverio
        .remote(options)
        .init()
        .url('http://timercity.com')
        .pause('2000')
        .click("//div[@id='timer_types']/label[2]")
        .pause('2000')
        .click("//input[@id='title']")
        .pause('2000')
        .keys('test alarm')
        .pause('2000')
        .click("//input[@id='alarm_time']")
        .pause('1000')
        .keys('3:00\n')
        .pause('2000')
        .click("//button[@id='add']")
        .pause('3000')
        .click("//div[@id='timer1']/button[@class='close']")
        .pause('3000')
        .title(function(err, res) {
            console.log('Title was: ' + res.value);
        })
        .end();
}

var addRemoveCountdown = function() {
    webdriverio
        .remote(options)
        .init()
        .url('http://timercity.com')
        .pause('2000')
        .click("//div[@id='timer_types']/label[3]")
        .pause('2000')
        .click("//input[@id='title']")
        .pause('2000')
        .keys('test countdown')
        .pause('2000')
        .click("//input[@id='countdown_time']")
        .pause('1000')
        .keys('00:00:10\n')
        .pause('2000')
        .click("//button[@id='add']")
        .pause('3000')
        .click("//div[@id='timer1']/button[@class='close']")
        .pause('3000')
        .title(function(err, res) {
            console.log('Title was: ' + res.value);
        })
        .end();
}



addRemoveCountdown()



