

### Setup Server

```bash
mongod # Start Mongo Server
```

```bash
# Set ENV Variables
export JWT_SECRET='some_secret'
export MAILER_EMAIL='slickchatapp@gmail.com'
export MAILER_PASSWORD='ask_david_for_secret_password'
```


```bash
# Watch Client Files and Build Bundle
npm run webpack
```

```bash
# Start Server
npm run serve
```
