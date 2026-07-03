# APIAuthPumakawa

## About:
This is a simple API to authenticate a user before accessing a database, using JWT as the authentication midware.

## Installation guide: 
### Needed resources:
You **must** have the following installed for the API to work:
- **Node** *(paired with npm)*
- **Express** 
- **Bcrypt**
- **Dotenv**
- **JSONWebToken**
- **Supabase** *(you can modify the API to not need this)*


#### Installing modules (with npm):
Simply run the following into cmd, at the directory of the API:
```cmd
npm install express bcrypt dotenv jsonwebtoken @supabase/supabase-js
```

### Start-up (with npm or node):
Run either command on the console (it is encouraged to use cmd instead of bash or powershell):
```cmd
npm start
```
or
```cmd
node server.js
```

### Configuration:
You **must** create an .env file and set it up for the API to work. Connect it with your database and then set up the JWT_SECRET. To do so, add a *console.log(keyGen());* line to *utilities/keyGen.js*, start the program in the console and then copy the provided key and add it as the value to the following line in your .env:
```env
SUPABASE_URL=[complete]
SUPABASE_ANON_KEY=[complete]
SUPABASE_PASSWORD=[complete]
PORT=3000
JWT_SECRET=[generated_key]
```

Afterwards, erase the keyGen log line.
