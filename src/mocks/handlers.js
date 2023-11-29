import { http, HttpResponse } from 'msw';
import data from './dummy.json';

export const handlers = [
  http.get('/orders', () => {
    return HttpResponse.json(data);
  }),
  http.post('/orders', () => {
    console.log('post');
  }),
  http.delete('/orders/:id', ({ params }) => {
    console.log(`delete ${params}`);
  }),
];
