
# **React-Backend Dockerized Application with Grafana and Prometheus**

## **Installation**

To install the application, clone the repository from:

```bash
git clone https://github.com/JudaB/my-code-example2
```

The directory structure of the repository is as follows:

```
/containers
├── backend/
│   ├── Dockerfile            # Backend Dockerfile
│   ├── server.py             # Python Flask backend code
│   ├── requirements.txt      # Backend dependencies
├── frontend/
│   ├── Dockerfile            # Frontend multi-stage Dockerfile
│   ├── src/
│   │   ├── App.js            # React app entry point
│   │   ├── index.js          # React DOM renderer
│   ├── package.json          # Frontend dependencies
│   ├── package-lock.json     # Lock file for dependencies
├── grafana/
│   ├── provisioning/         # Grafana provisioning configuration
│   │   ├── dashboards/       # Dashboards directory
│   │   │   └── dashboard.yaml # Provisioning configuration for dashboards
│   ├── dashboards/           # Directory containing Grafana dashboard JSON files
├── prometheus/
│   ├── prometheus.yml        # Prometheus configuration file
├── docker-compose.yml        # Orchestrates the frontend, backend, Grafana, and Prometheus
├── build_and_run.sh          # Script to automate build and deployment
├── README.md                 # Project documentation
```

---

## **Usage**

### **Running Locally**

To run the application locally, use the `build_and_run.sh` script.
The script takes care of:

- Building the frontend and backend containers.
- Logging errors in case of build failures.
- Starting the application automatically upon successful builds.

Once the app is running, visit [http://localhost:3000](http://localhost:3000). You should see the React welcome page containing "Hello World" along with data fetched from the backend JSON.

### **Accessing Grafana**

1. Visit Grafana at [http://localhost:3001](http://localhost:3001).
   
   - Default credentials: **user**: `admin`, **password**: `admin` (you will be prompted to change the password upon first login).

2. Create dashboards manually:
   
   - Go to [http://localhost:3001/dashboards](http://localhost:3001/dashboards).
   - Create a new dashboard.
   - Add a visualization.
   - Select Prometheus as the data source.
   - Choose the desired metric (e.g., `ram_api_requests_total`, `frontend_api_requests_total`, `nodejs_active_requests`, `process_cpu_total`, `process_start_time_seconds`).
   - Save the dashboard.

3. Verify that counters increase. `ram_api_requests_total` is a counter for the number of backend requests. Verify it increments.

---

## **Container Overview**

### **Frontend**

- Contains the React-based user interface.
- Displays debug information and data fetched from the backend in a tabular format with pictures.

### **Backend**

- Implements a Python Flask application.
- Gathers data from the internet about a TV show (**The Ren & Stimpy Show**) and exposes data of name and picture as JSON to the client.

### **Grafana**

- Provides visualization for metrics collected by Prometheus.
- Includes a preconfigured dashboard for monitoring application metrics.

### **Prometheus**

- Collects and stores metrics from the backend and frontend.
- Monitors metrics such as API requests, Node.js statistics, and application status.

---

## **Requirements**

Before running the application, ensure the following:

- **Docker**: Installed and configured on your system.
- **Internet Access**: Required by the backend to gather data from external APIs.
- Ensure that the following ports are available on your system:
  
  - **5000**: Backend
  - **3000**: Frontend
  - **3001**: Grafana
  - **9090**: Prometheus

---

## **Architecture**

### **Current Setup**

- Both containers are deployed on a bridged network for simplicity and external accessibility.
- A private network interface is included for internal communication between services.
- Grafana and Prometheus are integrated for monitoring and visualization.
- In production, the backend will be placed behind a WAF.

---

## **Developer Notes**

### **Bugs**

- There is a bug: the dashboard is not autoprovisioning. :(

### **Build Script**

- Each container directory includes a `_compile.sh` script for building and pushing images to Docker Hub.
- By default, these scripts are configured to push images to `dockerhub.com/judab`.

### **Backend CORS Support**

- Ensure the backend is configured to support Cross-Origin Resource Sharing (CORS) for seamless communication with the frontend.

### **Metrics Monitoring**

- Prometheus collects metrics exposed by the backend and frontend.
- Grafana visualizes these metrics through preconfigured dashboards.

---

## **Troubleshooting**

### **Common Issues**

1. **Failed to Fetch Error**

   - Check the backend URL configuration in `docker-compose.yml`.
   - The backend URL is displayed on the frontend welcome page for verification.

   Example configuration:

   ```yaml
   environment:
     - REACT_APP_BACKEND_URL=http://localhost:5000/ram
   ```

2. **Backend CORS Issues**

   - Ensure the backend supports CORS.
   - The Flask backend must include the necessary headers or use the `flask-cors` library.

3. **Backend Reachability**

   - Verify that the backend is reachable from your local machine:
     ```bash
     curl http://localhost:5000/ram
     ```

4. **Grafana Dashboard Not Loading**

   - Check the provisioning directory structure and logs for errors.
   - Ensure that the dashboard JSON file includes a valid `title` and follows Grafana's schema.

5. **Prometheus Verification**

   - Verify that Prometheus is accessible at [http://localhost:9090](http://localhost:9090).
   - Check that targets are up at [http://localhost:9090/targets](http://localhost:9090/targets).

---

## **Good Luck**

Once the containers are built and running, you are ready to use the application. Enjoy, and good luck with your development!
