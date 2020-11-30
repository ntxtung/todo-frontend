import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GatewayClient } from './gateway.client';

@Injectable({
  providedIn: 'root',
})
export class BoardClient extends GatewayClient {
  api = environment.gateway.todoBoard.url;
  // apiKey =  environment.gateway.account.key;
}
