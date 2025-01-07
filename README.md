
# **React-Backend Dockerized Application**

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
├── docker-compose.yml        # Orchestrates the frontend and backend
├── build_and_run.sh          # Script to automate build and deployment
├── README.md                 # Project documentation
```

---

## **Usage**

### **Running Locally **

To run the application locally without pushing images to Docker Hub, use the `build_and_run.sh` script. 
the script use to automate build process verify and verify stages during build 
script will:

- Builds the `frontend` and `backend` containers.
- Logs errors in case of build failures.
- Starts the application automatically upon successful builds.

Ensure that ports **5000** (for the backend) and **3000** (for the frontend) are available on your system.

---

### **Container Overview**

The application consists of two containers:

1. **Frontend**:
   - Contains the React-based user interface.
     which displays some debug information and data fetched from the backend in a tabular format.

2. **Backend**:
   - Implements a Python Flask application.
     which  gather data  from internet about a TV show (The Ren & Stimpy Show)
     and populate the data with JSON to the client
     
---

## **Requirements**

Before running the application, ensure the following:
- **Docker**: Installed and configured on your system.
- **Internet**: Backend require internet access to gather data
  
---

## **Architecture**

- **Initial Design**:
  - during the initial design i was trying to place frontend in bridge network, 
    and backend to communicate with frontend over private network
    due to errors with react i switch to simple aproach however in real life backend will be in behind WAF and in different subnet
    

- **Current Setup**:
  - Both containers are deployed on a bridged network for simplicity and accessibility from external systems.
  - A private network interface is still included for internal communication.

---

## **Developer Notes**

1. **Build Script**:
   - Each container directory includes a `_compile.sh` script for building and pushing images to Docker Hub.
   - By default, these scripts are configured to push images to `dockerhub.com/judab` .

2. **Backend CORS Support**:
   - Ensure the backend is configured to support Cross-Origin Resource Sharing (CORS) for seamless communication with the frontend.

---

## **Troubleshooting**

### **Common Issues**

1. **Failed to Fetch Error**:
   - Check the backend URL configuration in `docker-compose.yml`. The backend URL is displayed on the frontend welcome page for verification.
   - Example configuration:
     ```yaml
     environment:
       - REACT_APP_BACKEND_URL=http://localhost:5000/ram
     ```

2. **Backend CORS Issues**:
   - Ensure the backend supports CORS. The Flask backend must include the necessary headers or use the `flask-cors` library.

3. **Backend Reachability**:
   - Verify that the backend is reachable from your local machine using:
     ```bash
     curl http://localhost:5000/ram
     ```

---

## **Good Luck**

Once the containers are built and running, you are ready to use the application. Enjoy, and good luck with your development!

