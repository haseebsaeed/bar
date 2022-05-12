# Book a Room

## Description
Internal application to handle meeting room reservation.

## Usage
To start the application, following steps need to be performed.
1. Clone the repository.
2. Create a copy of ```.env.default``` file and name it ```.env```.
2. Run the containers using the following command.
    ```bash
    docker-compose up --build -d
    ```
    
Application would start running on Port ```4000``` and Mysql database would be exposed at Port ```3306```.

##### Seed data:
```src/init/seed.js``` this file contains script to Seed data. It will create dummy Rooms and Users. These can be used to fetch the list of avaiable rooms and make reservations.

##### Sample API Requests: 
* To fetch the list of available rooms on a particular day, hit  ```{base_url}/api/vacant?date={requested_date}``` endpoint with Get request.

* To make a reservation, hit  ```{base_url}/api/room/reserve``` endpoint with Post request. Following is the sample request body.
    ```javascript
    {
        "reservation_date":"2022-05-13",
        "room_id":1,
        "user_id":1
    }
    ```

## Test

Test uses .env.test as environment variable file 

```bash
npm test
```