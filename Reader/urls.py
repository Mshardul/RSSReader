from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    # '''display'''
    url(r'getFeed/$', views.GetFeed, name="GetFeed"),
    # '''homepage'''
    url(r'$', views.Home, name="Home"),
    
]