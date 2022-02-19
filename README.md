Executed the command: 
```sh 
npx express-generator
```

Output:

```npx: installed 10 in 3.102s

  warning: the default view engine will not be jade in future releases
  warning: use `--view=jade' or `--help' for additional options       


   create : public\
   create : public\javascripts\
   create : public\images\
   create : public\stylesheets\
   create : public\stylesheets\style.css
   create : routes\
   create : routes\index.js
   create : routes\users.js
   create : views\
   create : views\error.jade
   create : views\index.jade
   create : views\layout.jade
   create : app.js
   create : package.json
   create : bin\
   create : bin\www

   install dependencies:
     > npm install

   run the app:
     > SET DEBUG=auth:* & npm start
```


Project Explaination:

Tasks:
1. Create user:
   - Username, Email, PasswordHash, [roles:[Public, Admin, Employee]]
     - Redis: SET abir (Email, PasswordHash)
2. User Auth:
  - Username, passwordhash &rarr; 
  - 2 token: (authorization token, refresher token), (AT, RT)
What is AT and RT?
- AT and RT will be cahed by Servicing Application. with role.
- RT and AT will also be in session storage.
- AT will be data rtetrieve.
- RT will be set to auth application to retrieve another RT and AT pair.


Database:
redis: TOKEN caching.
Mysql

