FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Back-End-Service/Back-End-Service.csproj", "Back-End-Service/"]
RUN dotnet restore "Back-End-Service/Back-End-Service.csproj"
COPY . .
WORKDIR "/src/Back-End-Service"
RUN dotnet build "Back-End-Service.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Back-End-Service.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Back-End-Service.dll"]
