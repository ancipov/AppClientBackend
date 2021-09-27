docker pull mcr.microsoft.com/mssql/server
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=test123456" -p 1434:1433 -d mcr.microsoft.com/mssql/server:2017-latest
