from django.contrib import admin

from .models import Post, Content

admin.site.register(Post)
admin.site.register(Content)