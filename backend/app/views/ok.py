from django.http import HttpResponse
from django.views import View
import logging

logger = logging.getLogger(__name__)



class OkView(View):
    def get(self, request, *args, **kwargs):
        return HttpResponse(status=200)
