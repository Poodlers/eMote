FROM mcr.microsoft.com/dotnet/sdk:7.0.306-alpine3.18

WORKDIR /usr/src/app

VOLUME /data

RUN dotnet --info

# Copy csproj and restore as distinct layers
COPY src/backend.csproj .

RUN dotnet restore

COPY src .

RUN dotnet dev-certs https --trust

WORKDIR /usr/src/app/src

CMD [ "dotnet", "watch" ]
