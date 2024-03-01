# tic-tac-ohno
just a fun poc

### Init PG Docker
```
docker run -d \
	--name tic_tac_pg \
    -p 5432:5432 \
	-e POSTGRES_DB=tic_tac_pg \
	-e POSTGRES_PASSWORD=tic_tac_pg \
	-e PGDATA=/var/lib/postgresql/data/tic_tac_pg \
	-v /custom/mount:/var/lib/postgresql/data \
	postgres
```

### Run Existing PG Docker
```
docker start tic_tac_pg
```

### Stop PG Docker
```
docker stop tic_tac_pg
```