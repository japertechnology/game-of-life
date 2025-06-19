
const handleCallback = (value, resolve) => {
    // Always resolve the promise with the returned value to avoid
    // unhandled rejections when the user cancels the dialog.
    resolve(value);
};

class BootBoxUtils {

    static setDefaults() {

        bootbox.setDefaults({
            backdrop: null,
            closeButton: false,
            swapButtonOrder: true,
            animate: false,
            size: "small",
            centerVertical: true,
        });

    }

    static promptNumber(title, min = 1, max = 20, value=2) {

        BootBoxUtils.setDefaults();

        return new Promise((resolve) => {
            bootbox.prompt({
                title: title,
                inputType: "number",
                required: true,
                min: min,
                max: max,
                value: value,
                buttons: {
                    cancel: {
                        label: "Cancel",
                        className: "btn-light"
                    }
                },
                callback: (result) => handleCallback(result, resolve)
            });
            $(".bootbox-input").next(".form-text").remove();
            $(".bootbox-input").after(`<div class="form-text mt-2">Min: ${min} and Max: ${max}</div>`);
        });
    }

    static alert(message, title) {

        BootBoxUtils.setDefaults();

        return new Promise((resolve) => {
            bootbox.alert({
                message: message,
                title: title,
                callback: (result) => handleCallback(result, resolve)
            });
        });
    }

    static confirm(message, title="Please Confirm") {

        BootBoxUtils.setDefaults();

        return new Promise((resolve) => {
            bootbox.confirm({
                title: title,
                message: message,
                buttons: {
                    confirm: {
                        label: "Yes",
                        className: "btn-primary"
                    },
                    cancel: {
                        label: "No",
                        className: "btn-light"
                    }
                },
                callback: (result) => handleCallback(result, resolve)
            });
        });
    }
}
