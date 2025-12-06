const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const FILE_PATH = path.join(__dirname, "activity.txt");

// Fungsi untuk menjalan command git
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing: ${command}`, error);
        reject(error);
        return;
      }
      if (stderr) {
        console.log(`Stderr: ${stderr}`);
      }
      console.log(`Stdout: ${stdout}`);
      resolve(stdout);
    });
  });
};

const makeCommit = async () => {
  const timestamp = new Date().toISOString();
  const logEntry = `Activity at ${timestamp}\n`;

  try {
    // 1. Update file
    fs.appendFileSync(FILE_PATH, logEntry);
    console.log(`Updated activity.txt at ${timestamp}`);

    // 2. Git operations
    await runCommand("git add activity.txt");
    await runCommand(`git commit -m "Auto commit at ${timestamp}"`);
    await runCommand("git push"); // Pastikan upstream sudah diset

    console.log("Successfully pushed to GitHub!");
  } catch (error) {
    console.error("Failed to make commit:", error);
  }
};

// Jalankan sekali saat script start
makeCommit();

// Uncomment di bawah ini jika ingin berjalan terus menerus setiap X milidetik
// setInterval(makeCommit, 1000 * 60 * 60); // Tiap 1 jam
