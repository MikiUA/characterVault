let count = 0;

async function logger(req, res, next) {
  count++;
  const starttime = Date.now();

  console.log(`${count}) ${req.method} ${req.path} `);
  res.on("finish", function () {
    console.log(`${count}) ${req.method} ${req.path} (${req.accessType || '-'}: ${req.user || 'no user'}): ${res.statusCode} ${res.statusMessage} ${Date.now() - starttime} ms`);
  });
  next();
}

function initiateLog() {
  const PORT = process.env.PORT;
  if (!process.env.DEVMODE) console.log(`app running on port: ${PORT}; `);
  else {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.address.includes('192')) console.log(`app running on http://${net.address}:${PORT}`);
      }
    }
  }
}

module.exports = { logger, initiateLog }