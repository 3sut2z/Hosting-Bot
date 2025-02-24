const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
app.use(express.json());

let botProcess = null;

// API khởi động bot
app.post("/start-bot", (req, res) => {
    const botCode = req.body.code;
    fs.writeFileSync("bot.js", botCode);

    if (botProcess) botProcess.kill();

    botProcess = exec("node bot.js", (error, stdout, stderr) => {
        if (error) return console.error(`Lỗi: ${error.message}`);
        if (stderr) return console.error(`Cảnh báo: ${stderr}`);
        console.log(`Output: ${stdout}`);
    });

    res.json({ status: "Bot đang chạy", message: "[INFO] Bot đã khởi động." });
});

// API dừng bot
app.post("/stop-bot", (req, res) => {
    if (botProcess) {
        botProcess.kill();
        botProcess = null;
        res.json({ status: "Bot đã dừng", message: "[INFO] Bot đã dừng." });
    } else {
        res.json({ status: "Bot không chạy", message: "[ERROR] Không có bot nào đang chạy." });
    }
});

app.listen(3000, () => console.log("Server chạy trên cổng 3000"));
