from django.shortcuts import render, redirect
import requests
from .models import City
from .forms import CityForm

def index(request):
    appid = '32dcd330b3cc00566765949794eb16bc'
    url = "https://api.openweathermap.org/data/2.5/weather?q={}&units=metric&appid=" + appid

    all_cities_info = []  # Список для хранения информации о всех городах

    if request.method == 'POST':
        form = CityForm(request.POST)
        if form.is_valid():
            city_name = form.cleaned_data['name']
            # Проверяем, существует ли город в базе данных
            if not City.objects.filter(name=city_name).exists():
                form.save()
            else:
                form.add_error('name', 'Город уже существует в базе данных.')
    else:
        form = CityForm()

    # Получаем информацию о погоде для всех городов из базы данных
    cities = City.objects.all()
    for city in cities:
        res = requests.get(url.format(city.name)).json()
        if res.get("cod") == 200:  # Проверка успешного ответа от API
            city_info = {
                'city': res["name"],
                'temp': res["main"]["temp"],
                'icon': res["weather"][0]["icon"]
            }
            all_cities_info.append(city_info)
        else:
            all_cities_info.append({
                'city': city.name,
                'temp': 'Не найден',
                'icon': ''
            })

    context = {"all_info": all_cities_info, 'form': form}
    return render(request, 'weather/index.html', context)
