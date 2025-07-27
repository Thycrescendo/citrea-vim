import express from 'express';
import axios from 'axios';

const app = express();
const port = 3001;

// Mock Redstone Oracle API (replace with real endpoint later)
const getBitcoinPrice = async () => {
  try {
    const response = await axios.get('https://api.redstone.finance/prices?symbol=BTC'); // Mock endpoint
    return response.data[0].value || 60000; // Default to 60000 if mock fails
  } catch (error) {
    console.error('Redstone API error:', error);
    return 60000;
  }
};

// Mock Stork for decentralized storage/indexing
const storeData = (data: string) => {
  console.log('Stork mock: Storing data:', data);
  return 'mock-storage-hash';
};

// Mock Blocksense for event monitoring
const monitorEvents = (contractAddress: string) => {
  console.log('Blocksense mock: Monitoring events for:', contractAddress);
  return { event: 'OptionCreated', data: 'mock-event-data' };
};

app.use(express.json());

// API to get Bitcoin price (Redstone)
app.get('/api/price/btc', async (req, res) => {
  const price = await getBitcoinPrice();
  res.json({ price });
});

// API to store data (Stork)
app.post('/api/store', (req, res) => {
  const data = req.body.data;
  const hash = storeData(data);
  res.json({ hash });
});

// API to monitor contract events (Blocksense)
app.post('/api/monitor', (req, res) => {
  const { contractAddress } = req.body;
  const eventData = monitorEvents(contractAddress);
  res.json(eventData);
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});