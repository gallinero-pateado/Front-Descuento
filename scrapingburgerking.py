#scrapingbk.py
import requests
from bs4 import BeautifulSoup
import json
# URL de la página a scrapear
url = 'https://www.burgerking.cl/cupones/'

# Realizamos la solicitud HTTP para obtener el contenido de la página
response = requests.get(url)

# Verificamos si la solicitud fue exitosa
if response.status_code == 200:
    # Parseamos el contenido HTML con BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Buscamos los contenedores donde están los cupones (en este caso 'mr-3' parece ser el contenedor)
    cupones = soup.find_all('div', class_='mr-3')
    cupones = soup.find_all('button', class_='card-tab')
    
    cupon_data = []

    # Iteramos sobre los cupones y extraemos información
    for idx,cupon in enumerate(cupones,start=1):
        
        
        # Buscamos un título dentro del cupon (puede estar en un <h6> o similar)
        titulo_elemento = cupon.find('h6', class_='coupon-name mb-1')
        name = titulo_elemento.text.strip() if titulo_elemento else 'Sin título'
        #Buscamos la descripcion del producto
        descripcion_elemento =cupon.find("p",class_="coupon-description mb-0")
        descripcion = descripcion_elemento.text.strip() if descripcion_elemento else "Sin Descripcion"

        
        # Buscamos una imagen dentro del cupón
      
        imagen_elemento = cupon.find('img')
        image = imagen_elemento['src'] if imagen_elemento else 'Sin imagen'


        
# Almacenar la información en un diccionario
        cupon_data.append({
            'id': idx,
            'name': name,
            'liked': False,
            'category': 'Saludable', 
            'image': image,
            'description': descripcion,
            'price': "Sin Precio",  
            'conditions': 'Condiciones'
        })
    
    # Guardar los cupones en un archivo JSON
    with open('./src/components/cupones.json', 'w', encoding='utf-8') as f:
        json.dump(cupon_data, f, ensure_ascii=False, indent=4)

    print("Datos guardados en cupones.json")
    
        
        #Imprimimos la información del cupón
        # print(f'Id: {idx}')
        # print(f'Titulo: {name}')
        # print(f"Liked:","False")
        # print(f"Category:","Saludable")
        # print(f'Imagen: {imagen}')
        # print(f'Descripcion: {descripcion}')
        # print(f"Price:",5000)
        # print("Conditions:","Condiciones")
        # print('-' * 40)
        
else:
    print(f'Error al acceder a la página: {response.status_code}')
