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
            coordenadas = [(-12.048395600763323, -77.1139782323095)]
            # Iterate through each instance and extract longitude and latitude
            for instance in pedidos:
                  coordenadas.append((instance.latitude, instance.longitude))
            coordenadas.append((-12.048395600763323, -77.1139782323095))
            ruta_optimizada = list(range(1, len(coordenadas)))
            url = generar_url_google_maps(coordenadas, ruta_optimizada)
            return Response({'URL': f'{url}'})

            
          