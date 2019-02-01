# skill-search

## features

* Fetch team member data from the Slack API
* Query team members by skills, listed in their profile


## configuration

* `cp .env.example .env`
* Create a new [Slack Application](https://api.slack.com/apps) with the following scopes
  - `users:read`
  - `users.profile:read`
* Copy the Workspace OAuth Access Token to your `.env` file

Install dependencies:

```
$ yarn
```

Create the database:

```
$ yarn db:create
```


## etl data

```
$ yarn data:refresh
```


## query data

Query skills from the command line

```
$ yarn query javascript
```

Query skills via api

```
$ yarn start
$ curl http://localhost:3001/users?skill=ruby
```


## docker

```
$ docker build -t skill-search .
$ docker run \
    -p 3001:3001 \
    -v $(pwd)/data:/app/data:ro \
    skill-search
```

Visit `http://localhost:3001/users?skill=ruby`


## docker-compose

```
$ docker-compose up --build
```

Visit `http://localhost:3001/users?skill=ruby`


## todo

* [x] rename this repo
* [ ] handle bad requests from the Slack class
* [x] insert user data into database
* [x] insert skills from profile into database
* [ ] handle database query errors
* [x] create `yarn run` commands for retrieving data
* [x] create table of skills
* [x] create join table users_skills
* [x] query skills from command line
* [x] write tests
* [x] dockerize it
* [x] create web api for querying
* [ ] instead of updating all users, conditionally update
* [ ] do something with logs
* [x] case insensitive searching
* [x] perform etl tasks on a reoccurring basis (weekly/daily/hourly)
* [x] database location specified by environment
* [x] run `yarn run users:refresh` and `yarn run users:refresh` with cron in container
* [x] create database when launching container
