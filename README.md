

1. **Clone the Repository**: Download the code to your computer by running the following command in your terminal:

    ```
    git remote add origin https://github.com/sufyanaslam404/swap-task.git
    ```

2. **Install Hardhat**: If you haven't already, install Hardhat globally on your machine by running:

    ```
    npm install -g hardhat
    ```

3. **Set up Hardhat**: Navigate to the project directory and run the following command to set up Hardhat:

    ```
    cd uniswap-eth-to-usdc
    npx hardhat
    ```

    Follow the prompts to create a `hardhat.config.js` file and choose the default options.

4. **Write Deployment Script**: Create a deployment script (e.g., `deploy.js`) in the `scripts` directory to deploy the smart contract. Write the script to deploy the contract to the desired Ethereum network (e.g., localhost, Rinkeby, Mainnet).

5. **Run Deployment**: Execute the deployment script using Hardhat by running:

    ```
    npx hardhat run scripts/deploy.js --network <network-name>
    ```

    Replace `<network-name>` with the name of the Ethereum network you want to deploy to (e.g., localhost, rinkeby, mainnet).

6. **Verify Deployment**: After deployment, verify the contract on Etherscan if deploying to a public Ethereum network. Use the Hardhat Etherscan plugin or manually verify the contract on Etherscan's website.

7. **Interact with the Contract**: Once deployed, you can interact with the contract using an Ethereum wallet like MetaMask. Use the provided functions (`swapETHforUSDC`, `swapUSDCForEth`) to swap ETH for USDC tokens or vice versa.




# React Vite App with MongoDB and Express Backend

This document explains how to run the React Vite app with a MongoDB database and an Express backend. The project consists of a React application built with Vite for the client-side, an Express server for the backend, and a MongoDB database for data storage.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js: Download and install Node.js from [nodejs.org](https://nodejs.org).
- MongoDB: Install MongoDB locally or use a cloud-based MongoDB service like MongoDB Atlas.

## Getting Started

Follow these steps to run the project:

1. **Clone the Repository**: Download the code to your computer by running the following command in your terminal:

    ```
    git clone https://github.com/your-username/your-repo.git
    ```

2. **Navigate to the Project Directory**: Change into the project directory:

    ```
    cd your-project-directory
    ```

3. **Install Dependencies**: Install the required dependencies for both the front end and back end:

    ```
    cd client
    npm install or yarn install 
    cd ../server
    npm install or yarn install 

    ```

4. **Run the Server**: Start the backend server by running the following command in the `server` directory:

    ```
    npm run dev  or yarn run dev 
    ```

    This will start the Express server, which will connect to the MongoDB database.

5. **Run the Client**: Open a new terminal window/tab and navigate to the `client` directory:

    ```
    cd ../client
    npm run dev  or yarn run dev 
   
    ```

    This will start the React development server with Vite, and the front end will be accessible in your web browser.

6. **Interact with the Application**: Once both the server and client are running, you can interact with the application in your web browser. Open your browser and navigate to `http://localhost:3000` to view the React application.

## Additional Notes

- **API Routes**: The server provides API routes for interacting with the MongoDB database. You can customize these routes in the server code based on your application's requirements.
- **Frontend Routes**: Define frontend routes in the React application to navigate between different pages/views. You can use React Router for this purpose.
- **Testing**: Write and run tests for both the server and client to ensure everything works as expected.

That's it! You've successfully set up and run the React Vite app with MongoDB and an Express backend. 