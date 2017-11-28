# Apache

```apacheconf
Listen 80
Listen 8080
```

```apacheconf
<VirtualHost *:80>
    ServerAdmin samuel_-_rojas@hotmail.com
    DocumentRoot "C:/xampp/htdocs"
    ServerName localhost
    <Directory "C:/xampp/htdocs">
        Options FollowSymLinks
        AllowOverride All
        Require all granted
        DirectoryIndex index.php index.html
    </Directory>
</VirtualHost>
<VirtualHost *:8080>
    ServerAdmin samuel_-_rojas@hotmail.com
    DocumentRoot "C:/xampp/htdocs"
    ServerName localhost
    <Directory "C:/xampp/htdocs">
        Options FollowSymLinks
        AllowOverride All
        Require all granted
        DirectoryIndex index.php index.html
    </Directory>
</VirtualHost>
```
