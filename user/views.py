from django.http import JsonResponse,HttpResponse,HttpRequest,HttpResponseBadRequest
import json

import logging
FORMATE = "%(asctime)s %(threadName)s %(thread)d %(message)s"
logging.basicConfig(format=FORMATE,level=logging.INFO)
from .models import User

def reg(request):
    try:
        payload = json.load(request.body.decode())
        email = payload['email']

        mgr = User.objects.filter(email=email)
        if mgr:
            return HttpResponseBadRequest(status=400)

        name = payload['name']
        password = payload['password']

        user = User()
        user.email = email
        user.name = name
        user.password = password

        try:
            user.save()
            return JsonResponse({'user_id': user.id })
        except Exception as e:
            return
    except Exception as e:
        logging.INFO(e)
        return HttpResponseBadRequest(status=401)
