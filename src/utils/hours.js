"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHoursToDate = void 0;
const addHoursToDate = (date, hours) => {
    return new Date(new Date(date).setHours(date.getHours() + hours));
};
exports.addHoursToDate = addHoursToDate;
