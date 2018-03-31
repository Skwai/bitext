(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var notify_1 = __webpack_require__(1);
exports.notify = notify_1.default;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(2);
const admin = __webpack_require__(3);
const Notify_1 = __webpack_require__(4);
// Init Firebase
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const config = functions.config();
const from = config.twilio.phonenumber;
exports.default = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const notify = new Notify_1.default({
        db,
        twilio: config.twilio
    });
    try {
        const prevPrice = yield notify.getPreviousPrice();
        // Get the current bitcoin price
        let currPrice;
        try {
            currPrice = yield notify.getPrice();
            yield notify.saveCurrentPrice(currPrice);
        }
        catch (err) {
            throw Error(`Could not retrieve price: ${err.message}`);
        }
        // If we don't have a previous price then end here
        if (prevPrice === null) {
            throw Error(`There was no previous price in the database`);
        }
        const formattedPrice = Notify_1.default.formatPrice(currPrice);
        console.info(`Fetched price: ${formattedPrice}`);
        // Get the users to notify
        let users;
        try {
            users = yield notify.getUsersToNotify(currPrice, prevPrice);
        }
        catch (err) {
            throw Error(`Could not retrieve users from Firestore: ${err.message}`);
        }
        // Check if we have any users to notify
        if (!users.length) {
            console.info('No users to notify');
            return;
        }
        // Send SMS to all of the users
        const message = `Hi. Bitcoin is now at ${formattedPrice} USD. This is a one-time alert`;
        console.info(`Messaging users: ${users.length}`);
        try {
            yield notify.sendUsersNotification({ from, users, message });
        }
        catch (err) {
            throw Error(`Failed to notify users: ${err.message}`);
        }
        console.info('Messaging complete');
    }
    catch (err) {
        console.error(err);
    }
    finally {
        res.sendStatus(204).end();
    }
}));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://cloud.google.com/nodejs/docs/reference/firestore/0.8.x/QuerySnapshot
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(5);
const Twilio = __webpack_require__(6);
const COINDESK_API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const LT = 'LT';
const GT = 'GT';
class Notify {
    /** Format price */
    static formatPrice(price) {
        return `$${price.toFixed(2).toLocaleString()}`;
    }
    constructor({ db, twilio }) {
        Object.assign(this, { db, twilio });
        this.createTwilioInstance(twilio.accountsid, twilio.authtoken);
    }
    /** Get the current Bitcoin price */
    getPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(COINDESK_API_URL);
            const data = yield response.json();
            return data.bpi.USD.rate_float;
        });
    }
    /** Get users who want to be notified of the price */
    getUsersToNotify(currPrice, prevPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            const colRef = this.db.collection('users');
            const query = colRef.where('notified', '==', null);
            // price has gone down
            if (currPrice < prevPrice) {
                const { docs } = yield query
                    .where('price', '<=', prevPrice)
                    .where('price', '>=', currPrice)
                    .get();
                return docs;
            }
            // price has gone up
            if (currPrice > prevPrice) {
                const { docs } = yield query
                    .where('price', '>=', prevPrice)
                    .where('price', '<=', currPrice)
                    .get();
                return docs;
            }
            return [];
        });
    }
    /** Get a user's phone number */
    getUserPhoneNumber(userData) {
        const { phoneCountryCode, phoneNumber } = userData;
        return [phoneCountryCode, phoneNumber].join('');
    }
    /** Send a message to a user */
    sendUserNotification({ from, user, message }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = user.data();
            const to = this.getUserPhoneNumber(userData);
            try {
                yield this.sendTwilioMessage({ from, to, message });
                this.setUserNotified(user);
            }
            catch (err) {
                console.error(err);
                if (err.status === 400) {
                    this.setUserNotified(user);
                }
            }
        });
    }
    /** Send a single SMS message via Twilio */
    sendTwilioMessage({ from, to, message }) {
        return __awaiter(this, void 0, void 0, function* () {
            // return's a `Q` promise. Sanitize to native promise by awaiting result
            const result = yield this.twilio.messages.create({
                to,
                from,
                body: message
            });
            return result;
        });
    }
    /** Set notified on the user */
    setUserNotified(user) {
        return user.ref.update({
            notified: new Date()
        });
    }
    /** Message an array of users */
    sendUsersNotification({ from, users, message }) {
        return Promise.all(users.map((user) => this.sendUserNotification({
            from,
            user,
            message
        })));
    }
    /** Save the current price to the database */
    saveCurrentPrice(price) {
        return this.getPriceDocRef().set({
            usd: price
        });
    }
    /** Get the previous price from the database */
    getPreviousPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.getPriceDocRef().get();
            if (!doc.exists) {
                return null;
            }
            return Number(doc.data().usd);
        });
    }
    /** Get the price document reference */
    getPriceDocRef() {
        return this.db.collection('price').doc('current');
    }
    /** Create a new Twilio instance */
    createTwilioInstance(twilioAccountSid, twilioAuthToken) {
        this.twilio = new Twilio.RestClient(twilioAccountSid, twilioAuthToken);
    }
}
exports.default = Notify;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("twilio");

/***/ })
/******/ ])));