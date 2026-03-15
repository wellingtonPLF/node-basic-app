import fastify from 'fastify'
import * as https from 'https';
import * as net from 'net';
import * as dns from 'dns/promises'
import axios from 'axios'; 

const app = fastify();

app.get('/', async (req, rep) => {
	const host = 'nfse-backend.portovelho.ro.gov.br';
    const url = 'https://nfse-backend.portovelho.ro.gov.br/producao/NfseWSService?wsdl';

    const result: any = {};

    // 1️⃣ DNS TEST
    try {
      const dnsStart = Date.now();
      result.dns = await dns.lookup(host, { all: true });
      result.dnsTime = Date.now() - dnsStart;
    } catch (e: any) {
      result.dnsError = e.message;
    }

    // 2️⃣ TCP PORT TEST
    result.tcp = await new Promise((resolve) => {
      const socket = new net.Socket();
      const start = Date.now();

      socket.setTimeout(10000);

      socket.connect(443, host, () => {
        resolve({
          success: true,
          time: Date.now() - start
        });
        socket.destroy();
      });

      socket.on('timeout', () => {
        resolve({
          success: false,
          error: 'TCP timeout'
        });
      });

      socket.on('error', (err) => {
        resolve({
          success: false,
          error: err.message
        });
      });
    });

    // 3️⃣ HTTPS TEST
    try {
      const agent = new https.Agent({
        rejectUnauthorized: false,
        family: 4
      });

      const start = Date.now();

      const response = await axios.get(url, {
        httpsAgent: agent,
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      });

      result.https = {
        success: true,
        status: response.status,
        time: Date.now() - start
      };

    } catch (e: any) {
      result.https = {
        success: false,
        message: e.message,
        code: e.code
      };
    }

    return result;
});

app.get('/hello', async (req, rep) => {
	return 'HELLO WORLD'
});

app.listen({port:3333, host: '0.0.0.0'}).then(() => {
	console.log("SERVER RUNNING on http://localhost:3333")
});
