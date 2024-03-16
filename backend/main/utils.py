import random

def distancia_euclidiana(punto1, punto2):
    return ((float(punto1[0]) - float(punto2[0])) ** 2 + (float(punto1[1]) - float(punto2[1])) ** 2) ** 0.5

def punto_concentrico(coordenadas, k, iteraciones=100):
    # Inicialización de los centroides de forma aleatoria
    centroides = random.sample(coordenadas, k)
    
    for _ in range(iteraciones):
        # Asignación de puntos a los clusters más cercanos
        clusters = [[] for _ in range(k)]
        for punto in coordenadas:
            distancia_minima = float('inf')
            cluster_asignado = None
            for i, centroide in enumerate(centroides):
                distancia = distancia_euclidiana(punto, centroide)
                if distancia < distancia_minima:
                    distancia_minima = distancia
                    cluster_asignado = i
            
            clusters[cluster_asignado].append(punto)
        
        # Actualización de los centroides
        nuevos_centroides = []
        for cluster in clusters:
            sum_x = sum(p[0] for p in cluster)
            sum_y = sum(p[1] for p in cluster)

            nuevo_centroide = (sum_x / len(cluster), sum_y / len(cluster))
            nuevos_centroides.append(nuevo_centroide)
        
        # Verificar si los centroides han convergido
        if nuevos_centroides == centroides:
            break
        
        centroides = nuevos_centroides
    
    return centroides


def generar_url_google_maps(coordenadas):
    clusters = punto_concentrico(coordenadas, 4)
    clusters = [(-12.048395600763323, -77.1139782323095)] + clusters + [(-12.048395600763323, -77.1139782323095)]
    ruta_optimizada = list(range(1, len(clusters)))

    # Construir la URL de Google Maps con la ruta optimizada
    base_url = "https://www.google.com/maps/dir/"
    for indice in ruta_optimizada:
        base_url += f"{clusters[indice][0]},{clusters[indice][1]}/"
    base_url += f"{clusters[ruta_optimizada[0]][0]},{clusters[ruta_optimizada[0]][1]}/"

    return base_url

