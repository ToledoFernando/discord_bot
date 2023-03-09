//================= CLEAR =================//
const { spawn } = require("child_process");

module.exports = spawn("cmd", ["/c", "cls"], { stdio: "inherit" });
//================= ===== =================//
