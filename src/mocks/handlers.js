import { http, HttpResponse } from 'msw';
import data from './dummy.json';

export const handlers = [
  http.get('/orders', () => {
    return HttpResponse.json(data);
  }),
  http.post('/orders', () => {
    const returnData = {
      name: 'Keefe',
      phoneNumber: '811-1172-1680',
      fromDate: '2023-01-01T00:00:00.000Z',
      toDate: '2023-02-16T00:00:00.000Z',
      item: '냉장품',
      itemDetail: '',
      supply: '',
      supplyDetail: null,
      address: '15 Comanche Alley',
      loadPlace: [
        {
          name: 'mockName',
          address: 'mockAddress',
          date: '2023-02-28T00:00:00.000Z',
        },
      ],
      seqNo: 1,
    };
    return HttpResponse.json(returnData);
  }),
  http.delete('/orders/:id', ({ params }) => {
    console.log(`delete ${params}`);
  }),
];
