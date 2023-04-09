import { MongoClient } from 'mongodb';

const uri =
  'mongodb+srv://storeadmin:UnBVOgQBHy0bRRok@cluster0.bxrilfs.mongodb.net/phone';

export default async function handler(req, res) {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const collection = client.db().collection('products');
    const datas = await collection.find().toArray();

    res.status(200).json(datas);
  } catch (error) {
    console.error(error);
    process.exit();
  }
}
