# Setup

## Create a virtual environment

### macOS/Linux

You may need to run sudo apt-get install python3-venv first

```sh
python3 -m venv .venv
```

### Windows

```sh
python -m venv .venv
```

## Install Dependencies

```sh
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

## Activate virtual environment

#### Windows

```sh
. .venv/Scripts/activate
```

### macOS (probably Linux too)

```sh
 source .venv/bin/activate
```

## Create a local .env file and place in the api folder

```sh
SECRET_KEY=<secret>
DATABASE_URL=<server address from Heroku>
DEBUG=TRUE
```

# Run the server

```sh
python manage.py runserver
```

Navigate to /admin and login to use admin panel

## Database

To view the Heroku Postgres database you can use [PgWeb]{https://github.com/sosedoff/pgweb}
Download and run, then go the browser window running and login using the Heroku DB Credentials
