from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Pedido
from .serializers import PedidoSerializer
from .utils import generar_url_google_maps



class CreatePedido(APIView):
      serializer_class = PedidoSerializer 

      def post(self, request, *args, **kwargs):
            try: 
                  data = {
                        "latitude": round(float(request.data.get("latitude")),6),
                        "longitude": round(float(request.data.get("longitude")),6),
                        "disponible": request.data.get("disponible"),
                        "alimentos": request.data.get("alimentos")
                  }
                  
                  serializer = self.serializer_class(data=data)
                  if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data)
                  print(serializer.errors)
                  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            except Exception as e:
                  print(e)
                  return Response({'error': f'Error inesperado: {e}'}, status=status.HTTP_400_BAD_REQUEST)

class GetRoute(APIView):
      def get(self, request):
            pedidos = Pedido.objects.all()
            coordenadas = []
            # Iterate through each instance and extract longitude and latitude
            for instance in pedidos:
                  coordenadas.append((instance.latitude, instance.longitude))
            
            url = generar_url_google_maps(coordenadas)
            return Response({
                  'URL': f'{url}',
                  'N_PEDIDOS': len(coordenadas),
                  'N_CLUSTERS': 4
            })

            
          