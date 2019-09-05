from __future__ import unicode_literals

from django.shortcuts import render, render_to_response
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.http import HttpResponse

import json
# import feedparser

def Home(request):
    return render_to_response('index.html')

@csrf_exempt
def GetFeed(request):
    url = json.loads(request.POST.get('url'))
    feed = ReadURL(url)
    return HttpResponse(json.dumps(feed))

@csrf_exempt
def ReadURL(url):
    import sys
    sys.path.insert(1, '/Library/Python/2.7/site-packages')
    import feedparser
    feeds = feedparser.parse(url)
    #headers, href, entries - important keys in 'feed'
    #feed, status, version, encoding, bozo, namespace - do not seem to be necessary.
    out = {}
    out['image'] = feeds['feed']['image']['href']
    out['title'] = feeds['feed']['title']
    out['date'] = feeds['headers']['date']
    out['url'] = feeds['href']
    out['feeds'] = []
    for feed in feeds['entries']:
        temp = {}
        temp['link'] = feed['link']
        temp['date'] = feed['published']
        temp['title'] = feed['title']
        temp['summary'] = feed['summary']
        temp['value'] = feed['summary_detail']['value']
        out['feeds'].append(temp)
    return out