import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
@Injectable()
export class RavelryApiService {
  async searchPattern(target: string) {
    try {
      const BASE_URI = 'https://api.ravelry.com';
      const headers = new fetch.Headers();
      const endpoint = `${BASE_URI}/patterns/search.json?query=${target}&page_size=5&page=1`;
      const ravelryKey = `${process.env.RAVELRY_DATA_CLIENT_ID}:${process.env.RAVELRY_DATA_CLIENT_SECRET}`;
      const authHeader = 'Basic ' + Buffer.from(ravelryKey).toString('base64');
      `${process.env.RAVELRY_DATA_CLIENT_ID}:${process.env.RAVELRY_DATA_CLIENT_SECRET}`;
      headers.append('Authorization', authHeader);
      const res = await fetch(endpoint, { method: 'GET', headers: headers });
      const result = await res.json();
      return result;
    } catch (error) {
      return error.response;
    }
  }
}
