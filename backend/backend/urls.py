
from xml.etree.ElementInclude import include
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    #path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),
    
]


urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT) #Render images inside django admin