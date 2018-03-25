"""Cron job to query bitcoin price checker"""

import webapp2
import json
import logging
import urllib2


URL = 'https://us-central1-innate-agency-110711.cloudfunctions.net/notify'


class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.status = 204


class CronEventHandler(webapp2.RequestHandler):
    def get(self):
        url = 'http://www.google.com/humans.txt'
        try:
            result = urllib2.urlopen(url)
            self.response.write(result.read())
        except urllib2.URLError:
            logging.exception('Caught exception fetching url')


app = webapp2.WSGIApplication([('/', MainHandler),
                               ('/cron', CronEventHandler), ],
                              debug=True)
