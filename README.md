# Tic-Tac-Toe

## Project start
```
docker run -d --rm -p 3000:80 \
    --mount type=bind,source="$(pwd)",target=/var/www/html \
    --name tic-tac-toe php:7.2-apache
```

## Use
```
open http://localhost:3000/ in your browser
```

## P.S.
* for this kind of task I don`t think that is proper way to use any PHP frameworks because it is too simple
* I've implemented logic on both side (UI & PHP backend) you can choose which one more preferable
