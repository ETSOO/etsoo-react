/**
 * Login id type
 */
export var LoginIdType;
(function (LoginIdType) {
    // Unknown, determined by logic
    LoginIdType[LoginIdType["Unknown"] = 0] = "Unknown";
    // Number id
    LoginIdType[LoginIdType["Id"] = 1] = "Id";
    // Mobile phone number
    LoginIdType[LoginIdType["Mobile"] = 2] = "Mobile";
    // Email address
    LoginIdType[LoginIdType["Email"] = 4] = "Email";
    // Cid
    LoginIdType[LoginIdType["Cid"] = 8] = "Cid";
})(LoginIdType || (LoginIdType = {}));
