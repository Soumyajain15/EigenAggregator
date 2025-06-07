# **App Name**: EigenAggregator

## Core Features:

- Fetch User Restaking Info: Fetches a list of users who restaked their stETH, including user address, amount restaked (in stETH), and target AVS validator/operator address.
- Get Validator Metadata: Retrieves validator metadata, including operator address/ID, total delegated stake, slash history, and validator status.
- Provide Reward Insights: Calculates and returns reward insights for a given wallet address, including total restaking rewards received and breakdown per validator.
- REST API Endpoints: Provides REST API endpoints: /restakers, /validators, /rewards/:address, where `address` is the wallet address

## Style Guidelines:

- Primary color: Saturated blue (#4285F4) to convey trust and stability, crucial for financial data.
- Background color: Light gray (#F5F5F5) for a clean and neutral backdrop, enhancing readability.
- Accent color: A slightly different hue of blue (#4CAF50) to maintain cohesion while drawing attention to important elements. (e.g. validator addresses or reward info)
- Body and headline font: 'Inter' (sans-serif) for a modern, objective, and readable interface, suitable for displaying restaking data. 
- Use clear, simple icons to represent different data points and validator statuses.
- A clean, well-structured layout to display the data clearly, prioritizing key information.