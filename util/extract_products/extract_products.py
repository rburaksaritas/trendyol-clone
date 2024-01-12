import json
import random
import requests

# Search API of TY
# https://public.trendyol.com/discovery-web-searchgw-service/v2/api/filter/sr?q=anne&pi=1

def fetch_products_from_api(query, page_index=1):
    url = f"https://public.trendyol.com/discovery-web-searchgw-service/v2/api/filter/sr?q={query}&pi={page_index}"
    try:    
        response = requests.get(url)
        data = response.json()
        return data["result"]["products"] if "result" in data and "products" in data["result"] else None
    except (e):
        print(e)
        return None


def fetch_products_multiple_pages(query, num_pages):
    all_products = []
    for page_index in range(1, num_pages + 1):
        products = fetch_products_from_api(query, page_index)
        if products:
            all_products.extend(products)
        else:
            break  # Stop fetching if no products are returned
    return all_products
        

def extract_products_from_json(file_path):
    
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    # Parse the JSON content
    data = json.loads(content)
    # Check if the necessary keys are present
    if "result" in data and "products" in data["result"]:
        return data["result"]["products"]
    else:
        return None


def map_products_to_custom_format(products, event_key):
    mapped_products = []

    for product in products:
        reviews_count = product["ratingScore"]["totalCount"] if "ratingScore" in product and "totalCount" in product["ratingScore"] else 0
        # Create a new dictionary for the transformed product
        transformed_product = {
            "id": product["id"] if product["id"] else None,
            "imageUrl": "https://cdn.dsmcdn.com/" + product["images"][0] if product["images"] else None,
            "brand": product["brand"]["name"] if "brand" in product and "name" in product["brand"] else None,
            "name": product.get("name"),
            "category": product.get("categoryName"),
            "eventKey": event_key.lower(),
            "reviewsCount": reviews_count,
            "soldCount": reviews_count + random.randint(1, 1000),
            "rating": round(product["ratingScore"]["averageRating"], 1) if "ratingScore" in product and "averageRating" in product["ratingScore"] else None,
            "price": product["price"]["sellingPrice"] if "price" in product and "sellingPrice" in product["price"] else None
        }

        mapped_products.append(transformed_product)

    return mapped_products


eventKeys = {
    "anne & çocuk": "anne çocuk",
    "kadın": "kadın",    
    "erkek": "erkek",
    "ev & yaşam": "ev yaşam",
    "süpermarket": "süpermarket",
    "kozmetik": "kozmetik",
    "ayakkabı": "ayakkabı",
    "çanta": "çanta",
    "elektronik": "elektronik",
    "iş yerine özel": "iş yerine özel",
    "Çok Satanlar": "çok satanlar",
    "flaş ürünler": "flaş ürünler", 
    "bershka erkek": "bershka erkek",
    "bershka kadın": "bershka kadın",
    "zara erkek": "zara erkek",
    "zara kadın": "zara kadın",
    "manuka": "manuka",
    "nike": "nike",
    "adidas": "adidas",
    "elbise": "elbise",
    "iphone": "iphone",
    "samsung": "samsung",
    "spor giyim": "spor giyim",
    "akıllı saat": "akilli saat",
    "kitap": "kitap",
    "oyun konsolu": "oyun konsolu",
    "mutfak aletleri": "mutfak aletleri",
    "güzellik & bakım": "guzellik bakim",
    "saat & aksesuar": "saat aksesuar",
    "oyuncak": "oyuncak",
    "kulaklık": "kulaklık",
    "parfüm": "parfüm",
    "t-shirt tişört": "t-shirt tişört",
    "pantolon": "pantolon",
    "şort": "şort"
}


def extract_from_keys(eventKeys):
    for k,v in eventKeys.items():
        #products = extract_products_from_json(f"original/{v}_response.json")
        products = fetch_products_multiple_pages(k, 3)
        mapped_products = map_products_to_custom_format(products, k)
        with open(f'mapped/{v}_mapped_products.json', 'w', encoding='utf-8') as outfile:
            json.dump(mapped_products, outfile, ensure_ascii=False, indent=4)

def extract_from_manual_query(search_term, prefix):
    products = fetch_products_multiple_pages(search_term, 3)
    mapped_products = map_products_to_custom_format(products, prefix)
    with open(f'mapped/{prefix}_mapped_products.json', 'w', encoding='utf-8') as outfile:
        json.dump(mapped_products, outfile, ensure_ascii=False, indent=4)

extract_from_keys(eventKeys)
# extract_from_manual_query("çanta", "çanta")