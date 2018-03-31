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
        // Get the current bitcoin price
        let price;
        try {
            price = yield notify.getPrice();
        }
        catch (err) {
            throw Error(`Could not retrieve price: ${err.message}`);
        }
        const formattedPrice = Notify_1.default.formatPrice(price);
        console.info(`Fetched price: ${formattedPrice}`);
        // Get the users to notify
        let users;
        try {
            users = yield notify.getUsers(price);
        }
        catch (err) {
            throw Error('Could not retrieve users from Firestore');
        }
        if (!users.length) {
            console.info('No users to notify');
            return;
        }
        // Message users
        const message = `Hi. Bitcoin is now at ${formattedPrice} USD. This is a one-time alert`;
        console.info(`Messaging users: ${users.length}`);
        try {
            yield notify.sendUsersNotification({ from, users, message });
        }
        catch (err) {
            throw Error('Failed to notify users');
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
    getUsers(price) {
        return __awaiter(this, void 0, void 0, function* () {
            const [high, low] = yield Promise.all([this.getHighUsers(price), this.getLowUsers(price)]);
            return [...high.docs, ...low.docs];
        });
    }
    /** Get users who want to be notified of a high price */
    getHighUsers(price) {
        const collection = this.db.collection('users');
        return collection
            .where('notified', '==', null)
            .where('dir', '==', GT)
            .where('price', '<=', price)
            .get();
    }
    /** Get users who want to be notified of a low price */
    getLowUsers(price) {
        const collection = this.db.collection('users');
        return collection
            .where('notified', '==', null)
            .where('dir', '==', LT)
            .where('price', '>=', price)
            .get();
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
    /** Send an SMS */
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