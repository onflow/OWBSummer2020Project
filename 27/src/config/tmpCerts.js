import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

const testImg = 'https://images-na.ssl-images-amazon.com/images/I/81W5nfYYxoL._AC_SY355_.jpg';

export const walletId1 = '179b6b1cb6755e31';
export const walletId2 = 'f3fcd2c1a78f5eee';

export default [
  {
    id: '1',
    title: 'Certificate of Achievement',
    description: 'For participating and completing on-flow course',
    img: 'https://images-na.ssl-images-amazon.com/images/I/81W5nfYYxoL._AC_SY355_.jpg',
    grantedAt: format(new Date(2014, 1, 11), 'MM/dd/yyyy'),
    grantedBy: walletId2,
    ownedBy: [{ id: walletId1, avatar: 'https://avatars.onflow.org/avatar/179b6b1cb6755e31.svg' }],
    events: [
      {
        id: uuid(),
        createdBy: walletId2,
        change: 'CREATED',
      },
      {
        id: uuid(),
        from: walletId2,
        to: walletId1,
        change: 'TRANSFERRED',
      },
    ],
  },
  {
    id: '2',
    title: 'Certificate of Achievement',
    description: 'For participating and completing on-flow course',
    img: 'https://images-na.ssl-images-amazon.com/images/I/81W5nfYYxoL._AC_SY355_.jpg',
    grantedAt: format(new Date(2014, 2, 11), 'MM/dd/yyyy'),
    grantedBy: walletId2,
    ownedBy: [{ id: walletId1, avatar: 'https://avatars.onflow.org/avatar/179b6b1cb6755e31.svg' }],
    events: [
      {
        id: uuid(),
        createdBy: walletId2,
        change: 'CREATED',
      },
      {
        id: uuid(),
        from: walletId2,
        to: walletId1,
        change: 'TRANSFERRED',
      },
    ],
  },
  {
    id: '3',
    title: 'Certificate of Achievement',
    description: 'For participating and completing on-flow course',
    img: 'https://images-na.ssl-images-amazon.com/images/I/81W5nfYYxoL._AC_SY355_.jpg',
    grantedAt: format(new Date(2014, 2, 11), 'MM/dd/yyyy'),
    grantedBy: walletId2,
    ownedBy: [{ id: walletId1, avatar: 'https://avatars.onflow.org/avatar/179b6b1cb6755e31.svg' }],
    events: [
      {
        id: uuid(),
        createdBy: walletId2,
        change: 'CREATED',
      },
      {
        id: uuid(),
        from: walletId2,
        to: walletId1,
        change: 'TRANSFERRED',
      },
    ],
  },
  {
    id: '4',
    title: 'Certificate of Achievement',
    description: 'For participating and completing on-flow course',
    img: 'https://images-na.ssl-images-amazon.com/images/I/81W5nfYYxoL._AC_SY355_.jpg',
    grantedAt: format(new Date(2014, 2, 11), 'MM/dd/yyyy'),
    grantedBy: walletId2,
    ownedBy: [{ id: walletId1, avatar: 'https://avatars.onflow.org/avatar/179b6b1cb6755e31.svg' }],
    events: [
      {
        id: uuid(),
        createdBy: walletId2,
        change: 'CREATED',
      },
      {
        id: uuid(),
        from: walletId2,
        to: walletId1,
        change: 'TRANSFERRED',
      },
    ],
  },
  {
    id: '5',
    title: 'Certificate of Achievement',
    description: 'For participating and completing on-flow course',
    img: 'https://images-na.ssl-images-amazon.com/images/I/81W5nfYYxoL._AC_SY355_.jpg',
    grantedAt: format(new Date(2014, 2, 11), 'MM/dd/yyyy'),
    grantedBy: walletId2,
    ownedBy: [{ id: walletId1, avatar: 'https://avatars.onflow.org/avatar/179b6b1cb6755e31.svg' }],
    events: [
      {
        id: uuid(),
        createdBy: walletId2,
        change: 'CREATED',
      },
      {
        id: uuid(),
        from: walletId2,
        to: walletId1,
        change: 'TRANSFERRED',
      },
    ],
  },
  {
    id: '6',
    title: 'Certificate of Achievement',
    description: 'For participating and completing on-flow course',
    img: 'https://images-na.ssl-images-amazon.com/images/I/81W5nfYYxoL._AC_SY355_.jpg',
    grantedAt: format(new Date(2014, 2, 11), 'MM/dd/yyyy'),
    grantedBy: walletId1,
    ownedBy: [{ id: walletId1, avatar: 'https://avatars.onflow.org/avatar/179b6b1cb6755e31.svg' }],
    events: [
      {
        id: uuid(),
        createdBy: walletId1,
        change: 'CREATED',
      },
      {
        id: uuid(),
        from: walletId1,
        to: walletId2,
        change: 'TRANSFERRED',
      },
    ],
  },
];