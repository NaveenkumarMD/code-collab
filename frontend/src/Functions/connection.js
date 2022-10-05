import ReconnectingWebSocket from "reconnecting-websocket"
import {Connection} from "sharedb/lib/client"

var socket = new ReconnectingWebSocket('ws://localhost:5001')
var connection = new Connection(socket)

export default connection