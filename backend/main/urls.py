from django.urls import path
from .views import CreatePedido, GetRoute

urlpatterns = [
      path('crear-pedido/', CreatePedido.as_view(), name='crear-pedido'),
      path('ruta/', GetRoute.as_view(), name='ruta'),
]