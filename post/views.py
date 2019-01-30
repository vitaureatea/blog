from django.http import JsonResponse,HttpResponse,HttpRequest,HttpResponseBadRequest,HttpResponseNotFound
import simplejson
import math

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
def get(request,post_id):
    try:
        post = Post.objects.get(pk=post_id)
        #print(post,type(post))
        #print(Post.objects.filter(pk=id),type(Post.objects.filter(pk=id)))
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
        try:
            #需要分页   /post?page=1&size=20   这样的  这样的参数会以字典格式在request.get里
            page = request.GET.get('page') #就算没有page参数也不会抛异常
            page = int(page)  #如果page参数有问题，那就直接给你第一页
            page = page if page>0  else 1  #page需要大于0 不然就给你个1
        except Exception as e:
            page = 1

        try:
            size = request.GET.get('size') #每页显示多少
            size = int(size)
            size = size if size >0 and size < 101 else 20  #每页显示1-100条 不然就给你20条
        except Exception as e:
            size = 20

        start = page * size - size
        end =  page * size
        qs = Post.objects
        #posts = Post.objects.order_by('-id')[start:end]
        posts = qs.order_by('-id')[start:end]
        #倒叙排列 id字段，id越大说明文章越新，新的放在前面优先展示
        #count = Post.objects.count()
        count = qs.count()

        return JsonResponse({
            'posts': [{
                'post_id': post.id,
                'title': post.title
            } for post in  posts], #循环一个一个id的弄出来
            'pagination': { # 当前页page，总行数count，每页多少行size，总页数pages
                'page': page,
                'size': size,
                'count': count,
                'pages': math.ceil(count/size)   #防止小数，向上取整
            }
        })

    except Exception as e:
        return HttpResponseNotFound