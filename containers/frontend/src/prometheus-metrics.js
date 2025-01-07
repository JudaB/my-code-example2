const express = require("express");
const promClient = require("prom-client");
const path = require("path");

// Initialize Express app
const app = express();
const port = 3000;

// Serve React app
app.use(express.static(path.join(__dirname, "build")));

// Initialize Prometheus metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
const Counter = promClient.Counter;

// Collect default metrics
collectDefaultMetrics();

// Custom metric: API request counter
const apiRequestCounter = new Counter({
  name: "frontend_api_requests_total",
  help: "Total number of API requests made by the frontend",
});

// Endpoint to increment API request counter (example usage)
app.get("/track-api-call", (req, res) => {
  apiRequestCounter.inc();
  res.send("API call tracked.");
});

// Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// Serve React app for other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Frontend running on http://localhost:${port}`);
  console.log(`Prometheus metrics available on http://localhost:9091/metrics`);
});
