/**
 * Data type enum
 */
export var DataType;
(function (DataType) {
    DataType[DataType["Unkwown"] = 0] = "Unkwown";
    DataType[DataType["Default"] = 1] = "Default";
    DataType[DataType["Number"] = 2] = "Number";
    DataType[DataType["Money"] = 3] = "Money";
    DataType[DataType["Bool"] = 4] = "Bool";
    DataType[DataType["Date"] = 5] = "Date";
    DataType[DataType["URL"] = 8] = "URL";
    DataType[DataType["Logo"] = 9] = "Logo";
})(DataType || (DataType = {}));
