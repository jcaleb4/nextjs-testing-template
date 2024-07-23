import mongoClient from '@/services/db/client';

export const getCollection = async (colName: string) => {
  const client = await mongoClient;
  const db = client.db();
  const col = db.collection(colName);
  return col;
};
