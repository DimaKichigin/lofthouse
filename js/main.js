// Nav icon

const navBtn = document.querySelector('.nav-icon-btn')
const navIcon = document.querySelector('.nav-icon')
const headerTop = document.querySelector('.header__top-row')

navBtn.onclick = function() {
	navIcon.classList.toggle('nav-icon--active')
	headerTop.classList.toggle('header__top-row--mobile')
	document.body.classList.toggle('no-scroll')
}

// Phone Mask

mask('[data-tel-input]')

// Удаляем '+', если больше ничего не введено, чтобы показать placeholder

const phoneInputs = document.querySelectorAll('[data-tel-input')
phoneInputs.forEach((input) => {
	input.addEventListener('input', () => {
		if (input.value == '+') {
			input.value = ''
		}
	})
	input.addEventListener('blur', () => {
		if (input.value == '+') {
			input.value = ''
		}
	})
})

// Yandex Map

initMap();

async function initMap() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer} = ymaps3;

    // Иницилиазируем карту
    const map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.getElementById('map'),

        // Передаём параметры инициализации карты
        {
            location: {
                // Координаты центра карты
                center: [37.588144, 55.733842],

                // Уровень масштабирования
                zoom: 8
            }
        }
    );

    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer());
		
		var myPlacemark = new ymaps.Placemark(
			[37.588144, 55.733842],
			{
				balloonContent: `
				<div class="balloon">
				<div class="balloon__address">Наб. реки Фонтанки 10-15</div>
				<div class="balloon__contacts">
				<a href="tel:+78121234567">+8 (812) 123-45-67</a>
				</div>
				</div>
				`,
			},
			{
				iconLayout: 'default#image',
				iconImageHref: './img/map/location-pin.svg',
				iconImageSize: [40, 40],
		iconImageOffset: [-20, -40],
	}
	
);

map.controls.remove('geolocationControl'); // удаляем геолокацию
map.controls.remove('searchControl'); // удаляем поиск
map.controls.remove('trafficControl'); // удаляем контроль трафика
map.controls.remove('typeSelector'); // удаляем тип

// map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
// map.controls.remove('zoomControl'); // удаляем контрол зуммирования
map.controls.remove('rulerControl'); // удаляем контрол правил
map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

map.geoObjects.add(myPlacemark);
	myPlacemark.balloon.open();

}