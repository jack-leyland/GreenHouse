# pull official base image
FROM python:3.10-buster as base

FROM base as builder

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBUG 1

# set google credentials
COPY add-google-credentials.sh /add-google-credentials.sh
# ENTRYPOINT ["sh", "/app/add-google-credentials.sh"]

# install dependencies
COPY ./requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# copy project
COPY . .

# collect static files
RUN python manage.py collectstatic --noinput