from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(request):
    return Response({
        "status": "online",
        "message": "Backend RPG-WEB funcionando"
    })


urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/health/", health_check),

    path("api/auth/", include("accounts.urls")),
    path("api/characters/", include("characters.urls")),
    path("api/external/", include("external_api.urls")),
]
