(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    var service = 'KEYCHAINPLUGIN_DEMO';
    var key = 'DEMO_KEY';
    var value = 'HELLO';

    DemoViewModel = kendo.data.ObservableObject.extend({

        setValue: function () {
            if (this.isIOSDevice()) {
                new Keychain().setForKey(this.onSuccess, this.onError, key, service, value);
            }
        },

        getValue: function () {
            if (this.isIOSDevice()) {
                new Keychain().getForKey(this.onSuccess, this.onError, key, service);
            }
        },
        
        removeValue: function () {
            if (this.isIOSDevice()) {
                new Keychain().removeForKey(this.onSuccess, this.onError, key, service);
            }
        },
        
        isIOSDevice: function() {
            if (device.platform.toLowerCase() != 'ios') {
                alert('This plugin is iOS-only');
                return false;
            }
            return !this.checkSimulator();
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.Keychain === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        },

        // callbacks
        onSuccess: function(msg) {
            navigator.notification.alert(JSON.stringify(msg), null, 'Success callback', 'Close');
        },

        onError: function(msg) {
            navigator.notification.alert(JSON.stringify(msg), null, 'Error callback', 'Close');
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);
