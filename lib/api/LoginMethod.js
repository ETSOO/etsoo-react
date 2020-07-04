/**
 * Login method
 */
export var LoginMethod;
(function (LoginMethod) {
    /**
     * Web application
     */
    LoginMethod[LoginMethod["Web"] = 1] = "Web";
    /**
     * Desktop software
     */
    LoginMethod[LoginMethod["Desktop"] = 2] = "Desktop";
    /**
     * Mobile app
     */
    LoginMethod[LoginMethod["App"] = 4] = "App";
})(LoginMethod || (LoginMethod = {}));
