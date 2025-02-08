const express = require('express');
const app = express();

app.use(express.json());
const PORT = 2007 || process.env.port

// تحقق من Webhook عند الإعداد
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = "islamdzl_ghost-chat";
    
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log("Webhook Verified!");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// استلام إشعارات من واتساب
app.post('/webhook', (req, res) => {
    console.log("Received WhatsApp Message:", req.body);
    res.sendStatus(200);  // استجابة ناجحة
});

// تشغيل الخادم على المنفذ 3000
app.listen(PORT, () => {
    console.log("Webhook server is running on port 3000");
});
