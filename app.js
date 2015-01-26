// http://lostechies.com/seanbiefeld/2014/12/28/using-the-strategy-pattern-to-reduce-complexity-in-your-javascript/

var UserRoleScheme = function (user) {

    function _getUrl(subUrl) {

        if (user.permissions.indexOf('write') > -1) {
            return 'http://app/' + subUrl + '/admin';
        } else {
            return 'http://app/' + subUrl + '/index';
        }

    }

    function _logUserRole() {
        console.info('The current user is: ' + user.role);
    }

    this.tester = function () {
        _logUserRole();
        return _getUrl('testers');
    };

    this.developer = function () {
        _logUserRole();
        return _getUrl('developers');
    };

    this.manager = function () {
        _logUserRole();
        return _getUrl('managers');
    };

    this.default = function () {
        console.warn('Error: The current user does not have a role');
        return 'http://app/errors?c=403';
    };

};

var user = {
    role: 'manager',
    permissions: ['execute', 'write']
};

var currentRoleHandler = new UserRoleScheme(user);
var role = user.role || 'default';

console.log(currentRoleHandler);
console.log(currentRoleHandler[role]());