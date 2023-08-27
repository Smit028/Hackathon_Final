const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function insertData(data) {
  const db = client.db('your-database-name'); // Replace with your database name
  const collection = db.collection('your-collection-name'); // Replace with your collection name

  try {
    const result = await collection.insertOne(data);
    console.log('Data inserted:', result.insertedId);
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

async function closeConnection() {
  await client.close();
  console.log('Connection closed');
}

async function main() {
  connectToDB();

  const jsonData = {
    key1: 'value1',
    key2: 'value2',
  };

  await insertData(jsonData);

  closeConnection();
}

main();
