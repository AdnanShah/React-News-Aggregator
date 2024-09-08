### React News Aggregator

## Installation

Prerequisites: Node >= 20

1. Clone the repository

   ```
   git clone https://github.com/AdnanShah/React-News-Aggregator.git
   ```

2. Install dependencies:

   ```
   cd project-name
   yarn
   ```

3. Environment Variables:

   Create a .env file in the root of the project and add your API keys:

   ```
   VITE_NEWS_API_KEY=your_newsapi_key
   VITE_GUARDIAN_API_KEY=your_guardian_key
   VITE_NYT_API_KEY=your_nyt_key
   ```

4. Start the development server:

   ```
   yarn dev
   ```

## Dockerization

## Using Docker Compose

You can build and run the container with:
`docker-compose up --build`

## Using Docker Image:

Open a terminal in the root directory of your project and run to build the Docker image:

`docker build -t react-news-aggregator .`

To start a container from your image run:

`docker run -p 3000:3000 react-news-aggregator`

### Use the application

- Navigate to [http://localhost:3000](http://localhost:3000) to access the news aggregator.
- Use the search bar at the top to easily find news articles.
- Customize your experience by clicking the settings icon, where you can save your preferred authors, sources, and categories.
