Ext.define('Admin.view.authentication.AuthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth',

    statics: {

        ajaxPost(url, json, successFn, failureFn) {

            handleFailure = function (f, r) {
                if (f)
                    f(r);
                else
                    Ext.Msg.alert('Error', r.message);
            };

            Ext.Ajax.request({
                url: url,
                method: 'POST',
                jsonData: json,
            }).then(function (response) {
                var rsp = JSON.parse(response.responseText);

                if (rsp.success) {
                    if (successFn) {
                        successFn(rsp);
                    }
                }
                else {
                    handleFailure(failureFn, rsp)
                }

            }).always(function () {
                // clean-up logic, regardless the outcome
            }).otherwise(function (reason) {

                if (reason.responseText) {
                    var rsp = JSON.parse(reason.responseText);
                    if (rsp && !rsp.success) {
                        handleFailure(failureFn, rsp)
                    }
                    else {
                        Ext.Msg.alert('Error', 'Error: ' + reason.responseText);
                    }
                }
                else {
                    if (reason.message)
                        Ext.Msg.alert('Error', reason.message);
                    else
                        Ext.Msg.alert('Error', 'Unknow Error');
                }

            });
        }

    },

    tryLogin() {

        let me = this;
        let vm = this.getViewModel();

        let login = {
            email: vm.get('email'),
            password: vm.get('password'),
        };

        Admin.view.authentication.AuthController.ajaxPost('api/user/login',
            login,
            (result) => {
                let vm = this.getViewModel();
                vm.set('token', result.data.token);
                this.redirectTo('workspacespage');
                if (vm.get('rememberMe')) {
                    // Persist passwords
                    localStorage.setItem('login_data', JSON.stringify(login));
                }
            },
            () => Ext.Msg.alert('Login Error', 'Wrong email or password')
        );
    },

    registerUser() {

        let vm = this.getViewModel();

        this.ajaxPost('api/user',
            {
                email: vm.get('email'),
                password: vm.get('password'),
                fullName: vm.get('fullname')
            },
            (result) => {
                Ext.Msg.alert('Registration', 'User successfully created', () => me.redirectTo('login'));
            }
        );

    },

    goToRegister() {
        this.redirectTo('register');
    },

    loginInitialize() {

        //let loginStr = localStorage.getItem('login_data');
        //if (loginStr) {

        //    var login = JSON.parse(loginStr);
        //    //this.loginNow(login, true);      

        //}

    }
});
