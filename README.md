# p4_back & front readme

Dashboard of procedures
Welcome to my procedures dashboard using Angular, nodejs, mmongoDB

This service will allow you to register, login & see procedures x/y chart by value & timestamp

See usage via postman at the buttom 👇

Installation:
  Open a shell, pull p4_front and p4_back from git repos
  run front with npm install then npm start
  run back w/ nodemon

  user_for_tests:
    email: "rubi@gmail.com"
    password: "rubi@gmail.com"

Usage:
  Dashboard client has 4 url endpoints:
    
    login & register buttons @ http://127.0.0.1:4200
    
    login procces @ http://127.0.0.1:4200/login
    
    register procces @ http://127.0.0.1:4200/register

    procedure chart @ http://127.0.0.1:4200/line-chart

  Dashboard api has 4 url endpoints:
    
    POST /api/data/add
    Post with body as follows:
    {'proccedure': str, 'timestamp': Number, 'value': Number}
    http://127.0.0.1:5000/api/data/add

    GET /api/data/get
    http://127.0.0.1:5000/api/data/get

    POST /login
    http://127.0.0.1:5000/login

    POST /register
    http://127.0.0.1:5000/register
    * password is hushed w/ md5


Get example @ post man:
http://127.0.0.1:5000/api/data/get
<img width="1013" alt="Screen Shot 2021-06-25 at 20 42 25" src="https://user-images.githubusercontent.com/44895102/123464728-e031dc80-d5f5-11eb-83fc-c871a52101ec.png">

* to resolve Forbidden response add the Authorization header with:
* "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiX2lkIjoiNjBkNWRmZDMxM2UyM2I2OTM1MDFjMzQ3IiwibmFtZSI6InJ1YmlAZ21haWwuY29tIiwiZW1haWwiOiJydWJpQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiNWI5ZDlkYzFjNTg4ZWYyNTNhMThlN2Y4Yzc2NmY0NTciLCJfX3YiOjB9LCJpYXQiOjE2MjQ2NDEwNjJ9.L61lRof6WMZvO9dz3mOvciJORZZUlXQ7ovl_XIRWuHI"
