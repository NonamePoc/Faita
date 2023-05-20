import * as signalR from '@microsoft/signalr'

let connection = new signalR.HubConnectionBuilder()
  .withUrl(`${process.env.REACT_APP_DB_API}chatHub`)
  .withAutomaticReconnect()
  .build()

export default connection
