#!/bin/sh
password=$(openssl rand -base64 14)
date=$(date +"%Y-%m-%d %H:%M:%S.%3N %:z")
passwordhash=$(echo -n ${password} | sha256sum | head -c 64)
echo "ADMIN PASSWORD : ${password}"
sqlite3 data.sqlite "CREATE TABLE IF NOT EXISTS 'people' 
                    ('id' INTEGER PRIMARY KEY AUTOINCREMENT, 'username' VARCHAR(255), 
                    'password' VARCHAR(255), 'usertype' TEXT, 'createdAt' DATETIME NOT NULL, 
                    'updatedAt' DATETIME NOT NULL);
INSERT INTO people
(id, username, password, usertype, createdAt, updatedAt)
VALUES(2, 'admin', '${passwordhash}', 'ADMIN', '${date}', '${date}');"


# SELECT strftime('%Y-%m-%d','now');

# SELECT strftime('%Y-%m-%d %H:%M:%S:%f','now', 'utc');

# 2022-02-21 07:07:38.896 +00:00


# SELECT datetime(1092941466, 'unixepoch', 'localtime', 'utc');
