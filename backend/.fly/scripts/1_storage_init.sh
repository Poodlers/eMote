FOLDER=/data
if [ ! -d "$FOLDER" ]; then
    echo "$FOLDER is not a directory, copying storage_ content to storage"
    cp -r /usr/src/app/src/db.sqlite /data/db.sqlite
fi