# Initial Setup

## Python

Download and install Python [3.10.1]{https://www.python.org/downloads/release/python-3101/}

Make sure you add to path on installation.

Confirm it is by running

```
$ python -V
```

## Docker

Download and install [Docker]{https://www.docker.com/get-started}

To test, build the new image and spin up a new container:

```
$ docker build -t web:latest .
$ docker run -d --name django-heroku -e "PORT=8765" -e "DEBUG=1" -p 8007:8765 web:latest
```

Stop then remove the running container again:

```
$ docker stop django-heroku
$ docker rm django-heroku
```

# Create a local .env file with Django Secret Keys

```sh
SECRET_KEY = <key>
```
