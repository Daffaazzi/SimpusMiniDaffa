FROM php:8.2-apache

RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql \
    && rm -rf /var/lib/apt/lists/*

COPY . /var/www/html/

CMD rm -f /etc/apache2/mods-enabled/mpm_*.load /etc/apache2/mods-enabled/mpm_*.conf \
    && ln -s /etc/apache2/mods-available/mpm_prefork.load /etc/apache2/mods-enabled/mpm_prefork.load \
    && ln -s /etc/apache2/mods-available/mpm_prefork.conf /etc/apache2/mods-enabled/mpm_prefork.conf \
    && sed -i "s/Listen 80/Listen ${PORT:-8080}/" /etc/apache2/ports.conf \
    && sed -i "s/:80>/:${PORT:-8080}>/" /etc/apache2/sites-available/000-default.conf \
    && apache2-foreground