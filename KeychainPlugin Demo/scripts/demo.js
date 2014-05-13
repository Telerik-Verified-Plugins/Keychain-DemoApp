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
            if (window.Keychain === undefined) {
                alert('Plugin not available. Are you running in the simulator?');
                return false;
            }
            return true;
        },

        // callbacks
        onSuccess: function(msg) {
            navigator.notification.alert(JSON.stringify(msg), {}, 'Success callback', 'Close');
        },

        onError: function(msg) {
            navigator.notification.alert(JSON.stringify(msg), {}, 'Error callback', 'Close');
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);