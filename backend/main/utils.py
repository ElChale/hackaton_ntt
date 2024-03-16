import random

def distancia_euclidiana(punto1, punto2):
    return ((punto1[0] - punto2[0]) ** 2 + (punto1[1] - punto2[1]) ** 2) ** 0.5

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

# Ejemplo de uso
coordenadas = [
    (-12.00413192, -77.01160745),
    (-12.00278866, -77.00680093),
    (-11.9999342, -77.00491266),
    (-12.0017812, -76.99924783),
    (-11.99120273, -77.004741),
    (-11.99472893, -77.01092081),
    (-11.98599729, -77.01040582),
    (-11.96534248, -76.99461297),
    (-11.96248762, -76.98946313),
    (-11.95039614, -76.97710351),
    (-11.94972438, -76.98637323),
    (-11.93477718, -76.97727518),
    (-11.97273137, -77.00268106),
    (-11.96937281, -76.97281198),
]



def generar_url_google_maps(coordenadas, ruta_optimizada):
    # Construir la URL de Google Maps con la ruta optimizada
    base_url = "https://www.google.com/maps/dir/"
    for indice in ruta_optimizada:
        base_url += f"{coordenadas[indice][0]},{coordenadas[indice][1]}/"
    base_url += f"{coordenadas[ruta_optimizada[0]][0]},{coordenadas[ruta_optimizada[0]][1]}/"

    return base_url

