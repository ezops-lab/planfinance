const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const { Transaction } = require('../models/Transaction');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/bank-statement', upload.single('file'), async (req, res) => {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const transactions = data.map(row => ({
        user_id: req.body.user_id,
        category: row.Category,
        amount: row.Amount,
        type: row.Type,
        date: new Date(row.Date)
    }));

    await Transaction.bulkCreate(transactions);
    res.json({ message: 'Transactions imported successfully' });
});

module.exports = router;
