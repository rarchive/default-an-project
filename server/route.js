import express from 'express';
import path from 'path';

const router = express.Router();

// 디폴트 라우팅
router.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});

export default router;