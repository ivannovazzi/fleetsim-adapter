# FleetSim Adapter

Vehicle location simulator for fleet management systems. Simulates multiple vehicles moving along real road networks using OpenStreetMap data.

## Requirements

- Node.js >= 18
- Docker (optional)

## Installation

```bash
git clone https://github.com/yourusername/fleetsim-adapter.git
cd fleetsim-adapter
npm install
```

## Environment Setup
Copy the example environment file:

```bash
cp .env.example .env
```

Required variables:

```bash
API_URL=https://your-api-url/graphql
TOKEN=your-auth-token
PORT=3000
```

## Docker Usage
Build and run with default settings:

```bash
docker build -t fleetsim-adapter .
docker run -d fleetsim-adapter
```

Override configuration:

```bash
docker run -d 
docker run -e TOKEN fleetsim-adapter
```

Using docker-compose:

```bash
docker-compose up
```

## Development

Start in development mode:

```bash
npm run dev
```





