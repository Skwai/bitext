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
const notify_1 = __webpack_require__(1);
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
exports.default = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const notify = new Notify_1.default({
        db,
        twilio: config.twilio
    });
    const from = config.twilio.phonenumber;
    try {
        const price = yield notify.getPrice();
        const formattedPrice = notify.formatPrice(price);
        console.info(`Fetched price: ${formattedPrice}`);
        const message = `Hi. Bitcoin is now at ${formattedPrice} USD. This is a one-time alert`;
        try {
            const users = yield notify.getUsers(price);
            if (!users.length) {
                console.info('No users to notify');
            }
            else {
                console.info(`Messaging users: ${users.length}`);
                yield Promise.all(users.map((user) => notify.sendUserMessage({
                    from,
                    user,
                    message
                })));
                console.info('Messaging complete');
            }
        }
        catch (err) {
            console.error('Could not retrieve users');
        }
    }
    catch (err) {
        console.error(`Could not retrieve price: ${err.message}`);
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
const node_fetch_1 = __webpack_require__(5);
const Twilio = __webpack_require__(6);
const COINDESK_API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const LT = 'LT';
const GT = 'GT';
class Notify {
    constructor({ db, from, twilio }) {
        Object.assign(this, {
            db,
            from,
            twilio
        });
        this.twilio = this.createTwilioClient(twilio.accountsid, twilio.authtoken);
    }
    /**
     * Create a new Twilio instance
     * @param {String} sid
     * @param {String} token
     * @return {Twilio}
     */
    createTwilioClient(sid, token) {
        return new Twilio(sid, token);
    }
    /**
     * Get the current Bitcoin price
     * @return {Promise<Number>}
     */
    getPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield node_fetch_1.default(COINDESK_API_URL);
            const data = yield response.json();
            return data.bpi.USD.rate_float;
        });
    }
    /**
     * Get users who want to be notified of the price
     * @param {Number} price
     * @return {Promise<DocumentSnapshot[]>}
     */
    getUsers(price) {
        return __awaiter(this, void 0, void 0, function* () {
            const [high, low] = yield Promise.all([
                this.getHighUsers(price),
                this.getLowUsers(price)
            ]);
            return [].concat(high.docs || [], low.docs || []);
        });
    }
    /**
     * Get users who want to be notified of a high price
     * @param {Number} price
     * @return {Promise<QuerySnapshot>}
     */
    getHighUsers(price) {
        const collection = this.db.collection('users');
        return collection.where('notified', '==', null)
            .where('dir', '==', GT)
            .where('price', '<=', price)
            .get();
    }
    /**
     * Get users who want to be notified of a low price
     * @param {Number} price
     * @return {Promise<QuerySnapshot>}
     */
    getLowUsers(price) {
        const collection = this.db.collection('users');
        return collection.where('notified', '==', null)
            .where('dir', '==', LT)
            .where('price', '>=', price)
            .get();
    }
    /**
     * Get a user's phone number
     * @param {DocumentSnapshot} user
     * @return {String[]}
     */
    getUserPhoneNumber(userData) {
        const { phoneCountryCode, phoneNumber } = userData;
        return [phoneCountryCode, phoneNumber].join('');
    }
    /**
     *
     * @param {DocumentSnapshot} user
     * @param {String} message
     * @return {Promise}
     */
    sendUserMessage({ from, user, message }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = user.data();
            const to = this.getUserPhoneNumber(userData);
            try {
                yield this.sendMessage({ from, to, message });
            }
            catch (err) {
                console.error(err);
                if (err.status === 400) {
                    this.setUserNotified(user);
                }
            }
        });
    }
    /**
     * Send an SMS
     * @param {String} to Phone number to send message to
     * @param {String} body The message to send
     * @return {Promise}
     */
    sendMessage({ from, to, message }) {
        return this.twilio.messages.create({
            to,
            from,
            body: message
        });
    }
    /**
     * Format price
     * @param {Number} price To format
     * @return {String}
     */
    formatPrice(price) {
        return `$${price.toFixed(2).toLocaleString()}`;
    }
    /**
     * Set notified on the user
     * @param {DocumentSnapshot} user
     * @return {Promise}
     */
    setUserNotified(user) {
        return user.ref.update({
            notified: new Date()
        });
    }
}
exports.default = Notify;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("twilio");

/***/ })
/******/ ])));
