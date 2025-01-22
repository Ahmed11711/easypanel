import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: true } }) // Enable CORS
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  notifyLoginApproval(transactionId: string) {
    try {
      console.log(`Notifying login approval for userId: ${transactionId}`);
      this.server.emit(`loginApproved_${transactionId}`, {
        message: 'scanned success',
      });
    } catch (error) {
      console.error('Error emitting login approval:', error);
    }
  }
}
