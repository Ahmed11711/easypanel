import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class InvestmentGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  notifyAvailableUnits(clientId: string, availableUnits: number) {
    this.server.to(clientId).emit('availableUnits', { availableUnits });
  }

  notifyInvestmentSuccess(clientId: string, message: string) {
    this.server.to(clientId).emit('investmentSuccess', { message });
  }
}
