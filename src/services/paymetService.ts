import { api } from '@config/axiosConfig';

import successHandler from '@request/successHandler';

export const submitPayment = async (token: string) => {
  const response = await api.request({
    method: 'POST',
    url: 'payments',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { 
      sourceId: token,
    },
  });

  const { status, data } = response;

  successHandler(
    { data, status },
    {
      notifyOnSuccess: false,
      notifyOnFailed: true,
    }
  );

  return data;
};