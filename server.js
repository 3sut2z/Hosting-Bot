const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Cài đặt npm package
app.post("/install/npm", (req, res) => {
    const { command } = req.body;
    exec(command, (error, stdout, stderr) => {
        if (error) return res.send(`Lỗi: ${stderr}`);
        res.send(`Kết quả: ${stdout}`);
    });
});

// Cài đặt pip package
app.post("/install/pip", (req, res) => {
    const { requirements } = req.body;
    exec(`pip install ${requirements}`, (error, stdout, stderr) => {
        if (error) return res.send(`Lỗi: ${stderr}`);
        res.send(`Kết quả: ${stdout}`);
    });
});

// Chạy bot
app.post("/run/bot", (req, res) => {
    const { botCode } = req.body;
    exec(`echo "${botCode}" > bot.js && node bot.js`, (error, stdout, stderr) => {
        if (error) return res.send(`Lỗi: ${stderr}`);
        res.send(`Bot Output: ${stdout}`);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
