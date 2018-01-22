var assert;

Ext.define('Aux.Assert', {}, () => {
    assert = function(condition, msg) {
        if (!condition) {
            var stack = new Error().stack
            alert(msg || 'Assertion!\nStack trace:\n' +stack);
        }
            
    }
});

/*
var __ignoreErrors = [];



__assert = function(condition, arg, errorId, file, line) {

    try {
        var error = null;
        if (Object.prototype.toString.call(condition) == '[object Error]') {
            error += condition.name || 'No name\n';
            error += '\n';
            error += condition.message || 'No message\n';
            error += '\n';
            error += condition.stack || 'No stack trace\n';
            error += '\n';
            condition = false;
        }

        if (!condition) {

            var msg = 'Assertion Failed';
            if (arg) {
                msg += ' for the expression "' + arg + '"';
            }

            if (file && line)
                msg += ' at line ' + line + ' in the file "' + file + '"';


            if (error) {
                msg += '\n=============================\n\nException info:\n' + error + '\n=============================\n';
            }


            if (__ignoreErrors.indexOf(errorId) < 0) {

                if (errorId) {
                    msg += '\nDo you want to receive this error again?';
                    if (confirm(msg) !== true) {
                        __ignoreErrors.push(errorId);
                    }
                }
                else {
                    alert(msg);
                }
            }
            else {
                throw new Error(msg);
            }
        }
    } catch (e) {
        alert('Exception thrown in __dbg_assert');
        throw e;
    }
}
*/