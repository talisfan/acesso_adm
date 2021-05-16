#CREATE USER "talis"@"localhost" IDENTIFIED BY "root";
ALTER USER "talis"@"localhost" IDENTIFIED WITH mysql_native_password BY "root";
GRANT ALL PRIVILEGES ON * . * TO "talis"@"localhost";

#CREATE USER "talis"@"%" IDENTIFIED BY "root";
ALTER USER "talis"@"%" IDENTIFIED WITH mysql_native_password BY "root";
GRANT ALL PRIVILEGES ON * . * TO "talis"@"%";

FLUSH PRIVILEGES;
