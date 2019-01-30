from django.http import JsonResponse,HttpResponse,HttpRequest,HttpResponseBadRequest
import simplejson
import bcrypt
import jwt
import datetime
from django.conf import settings

import logging
FORMATE = "%(asctime)s %(threadName)s %(thread)d %(message)s"
logging.basicConfig(format=FORMATE,level=logging.INFO)
from .models import User

#生成token
def gen_token(user_id):
    # exp 设定过期的时间
    return jwt.encode({
        'user_id': user_id,
        'exp': int(datetime.datetime.now().timestamp()) + 60*15
    },settings.SECRET_KEY
    ).decode()

#接口 token认证
def authenticate(fc):
    def wrapper(request):
        token = request.META.get('HTTP_JWT')
        try:
            payload = jwt.decode(token,settings.SECRET_KEY)
            user_id = payload['user_id']
            #filter和get返回类型不一样
            user = User.objects.get(pk=user_id)
            request.user = user
            #注意 这里在request里加了一个user对象，用这个装饰器的注意了
        except Exception as e:
            return HttpResponse(status=401)
        return fc(request)
    return wrapper

#注册
def reg(request):
    try:
        payload = simplejson.loads(request.body)
        email = payload['email']
        mgr = User.objects.filter(email=email)
        if mgr:
            return HttpResponseBadRequest()
        name = payload['name']
        password = payload['password']
        user = User()
        user.email = email
        user.name = name
        user.password = bcrypt.hashpw(password.encode(),bcrypt.gensalt())
        try:
            user.save()
            return JsonResponse({'user_id': user.id })
        except Exception as e:
            return
    except Exception as e:
        logging.INFO(e)
        return HttpResponseBadRequest()

#登录
def login(request):
    try:
        payload = simplejson.loads(request.body)
        email = payload['email']
        password = payload['password']
        qs = User.objects.filter(email=email).first()
        if not qs:
            return HttpResponseBadRequest()
        if not bcrypt.checkpw(password.encode(),qs.password.encode()):
            return HttpResponseBadRequest()

        return JsonResponse({
            'user': {
                'user_id': qs.id,
                'user_name': qs.name,
                'user_email': qs.email,
            },
            'token':gen_token(qs.id)
        })
    except Exception as e:
        return HttpResponseBadRequest()