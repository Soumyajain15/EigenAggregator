# EigenAggregator

EigenAggregator is a Next.js application designed to provide a user interface for exploring EigenLayer restaking data. It allows users to view information about restakers, validator metadata, and reward insights for specific wallet addresses.

This application serves as a frontend and assumes a backend service (GraphQL or REST API) is available to provide the actual data from on-chain sources or subgraphs. The UI is built with mock data for demonstration purposes.

## Core Features

-   **User Restaking Info**: Displays a list of users who have restaked their stETH, including user address, amount restaked, and target AVS validator/operator address.
-   **Validator Metadata**: Shows validator details such as operator address, total delegated stake, slash history, and current status.
-   **Reward Insights**: Allows users to input a wallet address and retrieve total restaking rewards received, along with a breakdown per validator.

## Tech Stack

-   **Next.js**: React framework for server-side rendering and static site generation.
-   **React**: JavaScript library for building user interfaces.
-   **TypeScript**: Superset of JavaScript for type safety.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **Shadcn/ui**: Re-usable components built with Radix UI and Tailwind CSS.
-   **Lucide React**: Icon library.

## Getting Started

### Prerequisites

-   Node.js (version 18.x or later recommended)
-   npm or yarn

### Setup

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository-url>
    cd EigenAggregator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    The application will typically be available at `http://localhost:9002`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To run the production build:

```bash
npm run start
```

## Data Sources & Assumptions (Placeholder)

This section should be filled in based on the actual backend implementation.

### Data Sources

-   **User Restaking Info**: (e.g., EigenLayer Subgraph, on-chain stETH contract events, AVS registration contracts)
-   **Validator Metadata**: (e.g., EigenLayer Subgraph, AVS-specific APIs, on-chain slashing contracts)
-   **Reward Insights**: (e.g., Aggregation of AVS reward distribution events, EigenLayer Subgraph for delegation details)

### Assumptions

-   A backend API is available at specified endpoints (e.g., `/api/restakers`, `/api/validators`, `/api/rewards/:address`) that this Next.js application can query.
-   The structure of the data returned by the API matches the types defined in `src/types/index.ts`.
-   For the mock data version, the data is static and representative of potential real-world scenarios.

## Project Structure

-   `src/app/`: Contains the pages and layouts (App Router).
    -   `layout.tsx`: Root layout for the application.
    -   `page.tsx`: Homepage.
    -   `restakers/page.tsx`: Page for user restaking info.
    -   `validators/page.tsx`: Page for validator metadata.
    -   `rewards/page.tsx`: Page for reward insights.
    -   `globals.css`: Global styles and Tailwind CSS theme customization.
-   `src/components/`: Reusable UI components.
    -   `layout/`: Layout components like Navbar, Footer, MainLayout.
    -   `ui/`: Shadcn/ui components.
-   `src/lib/`: Utility functions and mock data.
    -   `mockData.ts`: Contains mock data for the UI.
    -   `utils.ts`: General utility functions.
-   `src/types/`: TypeScript type definitions.
-   `public/`: Static assets.

## Customization

-   **Styling**: Colors, fonts, and other theme variables can be customized in `src/app/globals.css` and `tailwind.config.ts`.
-   **Data Fetching**: Modify the `get<DataName>Data` functions in each page component (e.g., `src/app/restakers/page.tsx`) to fetch data from your actual backend API instead of using mock data. For the rewards page (`src/app/rewards/page.tsx`), update the `fetchMockRewardInsights` call within `handleFetchRewards`.
-   **API Endpoints**: If your backend API endpoints differ, update the fetch requests accordingly.
