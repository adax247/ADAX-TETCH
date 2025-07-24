const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware (optional)
app.use(express.json());

// Route ya mwanzo
app.get('/', (req, res) => {
  res.send('Server iko live! 🚀');
});

// Anzisha server
app.listen(port, () => {
  console.log(`Server inasikiliza kwenye port ${port}`);
});
