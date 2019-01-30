from django.db import models

from user.models import User

class Post(models.Model):
    class Meta:
        db_table = 'post'
    title = models.CharField(max_length=200,null=False)
    pubdate = models.DateTimeField(auto_now_add=True)
    #一对多
    author = models.ForeignKey(User)

    def __str__(self):
        return '< %s : %s >' % (self.id,self.title)


class Content(models.Model):
    class Meta:
        db_table = 'content'
    post = models.OneToOneField(Post,to_field='id')
    content = models.TextField(null=False)

    def __str__(self):
        return '< %s : %s >' % (self.post.id,self.content[:20])