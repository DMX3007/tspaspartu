Connect a database service with frontend services in a Next.js:
[x] - Set up the database service: Start by setting up your database service separately. This could involve installing and configuring a database server like PostgreSQL, MySQL, or MongoDB. Make sure the database service is running and accessible.
[x] - Install database client library: pg
Configure the database connection:
[x] - In your Next.js application, create a configuration file;
[x] - Create a database connection module: - Develop a module or utility function that establishes a connection to the database using the provided connection details. Expose functions/methods for performing CRUD operations (querying, inserting, updating, deleting).

## run database

sudo docker exec -it 0c951c2cecd3 psql -U admin -d enrichedHotels
