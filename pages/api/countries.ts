// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getData from "./getData";

async function countries() {
  const countries = await getData("/yandex?action=countries");
  return countries;
}

// async function checkTours(countries) {
//   let filtered = {};
//   if (countries) {
//     filtered = countries.filter((country) => {
//       if (country.tours === "Да") {
//         return country;
//       }
//     });
//   }
//   return filtered;
// }

// export default async function handler(req, res) {
//   const countryList = await countries();
//   const countryAvailible = await checkTours(countryList);
//   const russianList = countryAvailible.map((c) => c?.title_ru);

//   res.status(200).json(russianList);
// }

// http://export.bgoperator.ru/yandex?action=files&flt=100410000049&flt2=100510000863&xml=11
//flt=1004 - country where
// flt2= 1005 - city from;
/* 
Обобщение:

Для выгрузки и синхронизации справочников и ценовых данных необходимо сделать следующие запросы:

Справочник стран
http://export.bgoperator.ru/yandex?action=countries

Справочник городов
http://export.bgoperator.ru/auto/jsonResorts.json

Справочник отелей. Если в запрос добавить параметр id, то информация вернётся только по отелю с указанным id
http://export.bgoperator.ru/yandex?action=hotels

Справочник вариантов размещения в номере
http://export.bgoperator.ru/yandex?action=vr

Выгрузка курсов валют
http://export.bgoperator.ru/auto/auto-kurs.xml

Выгрузка списка прайс-листов, доступных для загрузки в формате JSON
http://export.bgoperator.ru/yandex?action=files&flt=100410000049&flt2=100510000863&xml=11

Формат ответов:

Справочники (страны, города, отели, варианты размещения): список объектов с атрибутами
Курсы валют: тэги с кодами валют и значениями курсов
Список прайс-листов: список объектов с датой, маршрутом, длительностью, ссылкой, id прайс-листа, минимальной ценой, отношением мин. цены к наименьшей, валютой и признаком приоритета
Фильтрация выгрузки осуществляется параметрами:

flt - идентификатор страны
flt2 - идентификатор города
id - идентификатор отеля

Синхронизация справочников и ценовых данных осуществляется загрузкой полученных выгрузок в систему.

****
Обобщенно, для выгрузки данных прайс-листов и их соответствия курортов (городов) необходимо выполнить следующие действия:

Кэшировать соответствие курортов и прайс-листов для каждого города вылета и даты вылета. Получать данные по ссылке:
http://export.bgoperator.ru/yandex?action=jsonpriceresorts&data=10.10.2014&flt2=100510000863

Для получения прайс-листов, соответствующих отелю, использовать справочник городов и определять по нему город отеля. Затем по городу отеля ищутся прайс-листы в кэше или запрашиваются, если соответствие для данного города еще не получено.

Кэш очищать каждый день.

Формат получаемых данных по соответствию курортов и прайс-листов - JSON. Пример ответа:
{"id_price":[
{"id":"121174225779", "imp":"Нет", "res": ["100574180976"]},
{"id":"121174217697", "imp":"Нет", "res": ["100574180976"]},
]}

id — идентификатор прайс-листа
imp — флаг (Да/Нет); зачением Да помечены приоритетные прайс-листы Библио-Глобус
res — массив идентификаторов курортов, которые есть в данном прайс-листе

Для выгрузки списка городов вылета и стран туров использовать ссылку:
http://export.bgoperator.ru/auto/homepage-124331253701.js.
В файле переменная BG_FLTX инициализируется объектом, содержащим информацию о городах вылета (поле flt2) и странах туров (поле flt).


** 

Обобщенно, для выгрузки данных по стоп-сейлам на перелеты и проживание необходимо выполнить следующие действия:

Для выгрузки информации по стоп-сейлам на перелеты выполнить запрос:
http://export.bgoperator.ru/yandex?action=flights_stops
Формат ответа:
<stopsales>
<item flight="103119663447" date="2013-10-05" class="E" nights="9"/>
<item flight="103119663447" date="2013-10-05" class="E" nights="6"/>
<item flight="103119663447" date="2013-10-05" class="E" nights="5"/>
...
</stopsales>

flight — идентификатор авиаперелёта
date — дата вылета
class — класс авиаперелёта
nights — количество ночей (если не указано, значит установлен стоп-сейл на вылет; если указано, то на возврат)

Для выгрузки информации по стоп-сейлам на проживание выполнить запрос:
http://export.bgoperator.ru/yandex?action=hotels_stops
Формат ответа:
<stopsales>
<item hotel="102640059661" datebeg="2013-10-06" dateend="2013-10-25" ns="104630536730"/>
<item hotel="102640059661" datebeg="2013-10-06" dateend="2013-10-25" ns="104640059686"/>
<item hotel="102630316562" datebeg="2013-12-29" dateend="2014-01-02"/>
...
</stopsales>

hotel — идентификатор отеля
datebeg — дата начала периода стопа
dateend — дата окончания периода стопа
ns - идентификатор типа номера (название номера, тип питания, вид из окна)

Стоп-сейл означает остановку продажи тех туров, у которых период пересекается с указанным интервалом дат.
Если указан ns, то стоп-сейл действует только на типы номеров с данным идентификатором.


*** 

Обобщение по выгрузке прайс-листа в формате JSON:

Для выгрузки прайс-листа в формате JSON необходимо обратиться по ссылке, полученной из параметра url выгрузки списка прайс-листов.

Если в данной ссылке параметр &xml=11 заменить на &xml=21, то вместе с прайс-листом будут выданы параметры фильтров и дополнительная информация.
Если будет добавлен параметр &entr=-1, то в результатах будет только содержимое фильтров.

Формат ответа:
{
"href0": "http://export.bgoperator.ru/tozaya?prx=104499999900000025&idt=&cntr=100410000049&repl=0&ins=0-30000-EUR",
"cur": "EUR",
"prx": "104499999900000025",
"entries": [
{
// строки прайс-листа с описанием туров
}
]
}

Параметры:
cur - валюта туров
prx - параметр, необходимый для создания заявок через API..
entries - массив, содержащий строки прайс-листа с описанием туров.

Каждая строка прайс-листа содержит сведения о туре: даты, авиакомпанию, город, отель, номер, питание, цены на варианты размещения и ссылки для бронирования.

Могут быть указаны идентификаторы отеля, номера и цены, необходимые для создания заявки через API системы.

Для получения доступных цен по наземному обслуживанию необходимо отправить запрос с параметром id_price=-1.
Формат ответа будет аналогичен стандартному прайс-листу.
*/
