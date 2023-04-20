import * as signalR from '@microsoft/signalr'

let connection = new signalR.HubConnectionBuilder()
  .withUrl('https://localhost:7206/chatHub')
  .withAutomaticReconnect()
  .build()

export default connection
