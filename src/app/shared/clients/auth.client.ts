import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GatewayClient } from './gateway.client';

@Injectable({
  providedIn: 'root',
})
export class AuthClient extends GatewayClient {
  api = environment.gateway.todoAuth.url;
  // apiKey =  environment.gateway.account.key;
}
