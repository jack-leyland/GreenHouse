from django.http import JsonResponse


def ping(request):
    data = {"ping": "pong"}
    return JsonResponse(data)


def health(request):
    data = {"ok"}
    return JsonResponse(data)
