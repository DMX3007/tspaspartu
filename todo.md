TODO: FILL DATABASE WITH PICTURES

TODO: Routes layout:

- fix slider []
-

FIXME [] - bad connection with server(check cookie parse? may be change to react.cookie?)

Connect a database service with frontend services in a Next.js:
[x] - Set up the database service: Start by setting up your database service separately. This could involve installing and configuring a database server like PostgreSQL, MySQL, or MongoDB. Make sure the database service is running and accessible.
[x] - Install database client library: pg
Configure the database connection:
[x] - In your Next.js application, create a configuration file;
[x] - Create a database connection module: - Develop a module or utility function that establishes a connection to the database using the provided connection details. Expose functions/methods for performing CRUD operations (querying, inserting, updating, deleting).

## run database

sudo docker exec -it 0c951c2cecd3 psql -U admin -d enrichedHotels

## fill database with urls

    for (let i = 0; i < 1; i++) {
      const response = await fetch(`http:localhost:3000/api/images/?hotelName=${dat[i]?.name} ${dat[i]?.cityName} ${dat[i]?.countryName}`);
      const imageUrl = await response.text();
      console.log(imageUrl);
      await update(`UPDATE hotels
        SET imageurl = '${imageUrl}'
        WHERE key = '${dat[i]?.key}';`);
    }

## fill database with initial info

// for (let i = 0; i < data.length; i++) {
// console.log('in forr loop')
// let res = await insertHotel(data[i]!);
// console.log(res)
// }
// const res = await insertHotel(hotelData)
// console.log(res)
// return res;

## create table

CREATE TABLE hotels(key VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, stars VARCHAR(10), countrykey VARCHAR(255), citykey VARCHAR(255), cityname VARCHAR(255), countryname VARCHAR(255));

## add imageurl filed

ALTER TABLE hotels
ADD COLUMN imageurl text[];

## update urls

for (let i = 0; i < dat.length; i++) {
const response = await fetch(`http://localhost:3000/api/images/?hotelName=${dat[i]?.name} ${dat[i]?.cityName} ${dat[i]?.countryName}`);
const imageUrl = await response.json() as HotelData[];
const arrayValue = `ARRAY[${imageUrl.map(img => `'${img.url}'`).join(', ')}]`;
    console.log(i)
    await update(`
      UPDATE hotels 
      SET imageurl = ${arrayValue}
      WHERE key = '${dat[i]?.key}'
;`);

вопрос такой:

- для авторизации на сервере направляю post с логином и паролем, после чего мне через next api приходят куки которые я должен буду прокидывать в другие в подзапросы,

1. как это реализовать чтобы куки сохранялись мужду подзапросами?(cookie http-only).
   В доке указано что если возвращается 401 статус то нужно рефрешить куки, но проблема в том и если посмотреть на те куки которые в постмане они не меняются, а у меня меняются на обновленные. каждый новый запрос. Не могу понять как эту логику расписать чтобы они сохранялись на клиенте что ли? с моего сервера после рефреша я все равно получаю 401 статус, при этом через браузер постман запросы проходят, в чем может быть косяк?

2) быть может проблема в парсинге cookie, пришло писать свой парсер, на другие эндпоинты того же api запросы проходят через него...
