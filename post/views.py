from django.http import JsonResponse,HttpResponse,HttpRequest,HttpResponseBadRequest,HttpResponseNotFound
import simplejson

from user.views import authenticate
from .models import Post, Content

#提交博文
@authenticate
def pub(request):
    try:
        payload = simplejson.loads(request.body)
        post = Post()
        post.title = payload['title']
        # 装饰器里加的 user对象，忘了去看
        post.author = request.user  #外键
        #post.pubdate = datetime.datetime.now()
        try:
            post.save()
            # save 成功后post拥有对应的id字段 可以用来给 content外键
            content = Content()
            content.post = post  #外键
            content.content = payload['content']
            content.save()
            return JsonResponse({
                'post_id': post.id
            })
        except Exception as e:
            return HttpResponseBadRequest()

    except Exception as e:
        return HttpResponseBadRequest()

#可不登录查看博文
def get(request,id):
    try:
        post = Post.objects.get(pk=id)
        print(post,type(post))
        print(Post.objects.filter(pk=id),type(Post.objects.filter(pk=id)))
        return JsonResponse({
            'post': {
                'post_id': post.id,
                'title': post.title,
                'pubdate': post.pubdate,
                'author': post.author.name,
                'author_id': post.author.id,
                'content': post.content.content
            }
        })
    except Exception as e:
        return HttpResponseNotFound

def getall(request):
    try:
        paylaod = simplejson.loads(request.body)
        post = Post.objects.get()

    except Exception as e:
        return HttpResponseNotFound