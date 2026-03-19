const express = require('express');
const iwrRoutes = require('./routes/iwr');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// IWR routes
app.use('/api/iwr', iwrRoutes);

app.listen(PORT, () => {
    console.log(`IWR middleware running on port ${PORT}`);
});
