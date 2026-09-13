# ERPNext Integration Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D14-brightgreen)](https://nodejs.org/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
  - [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [License](#license)
- [Support](#support)
- [Acknowledgments](#acknowledgments)

---

## Overview

This repository contains a Node.js-based project designed for ERPNext integration and development. It provides a flexible foundation for building custom integrations, extensions, and workflows with the ERPNext enterprise resource planning system.

### What is ERPNext?

ERPNext is a comprehensive open-source ERP solution built on the Frappe framework. It covers various business functions including:
- Accounting & Finance
- Human Resources
- Inventory Management
- Manufacturing
- Sales & Purchasing
- Customer Relationship Management (CRM)
- Project Management
- And more...

### Project Goals

- Provide a streamlined integration layer between Node.js applications and ERPNext
- Enable custom workflow automation
- Support real-time data synchronization
- Offer extensible architecture for custom modules

---

## Features

- 🔌 **REST API Integration** - Seamless connection to ERPNext REST APIs
- 🔄 **Webhook Support** - Real-time event handling from ERPNext
- 🔐 **Authentication** - Secure token-based authentication
- 📦 **Modular Architecture** - Easy to extend and customize
- 🧪 **Testing Ready** - Built-in testing framework support
- 📝 **TypeScript Support** - Optional TypeScript definitions
- 🚀 **Performance Optimized** - Efficient request handling and caching
- 📊 **Logging & Monitoring** - Comprehensive logging capabilities

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (v6 or higher) or **yarn** (v1.22 or higher)
- **Git** - [Download](https://git-scm.com/)

### Recommended
- **ERPNext Instance** (v13 or higher) - Either cloud-hosted or self-hosted
- **Environment Variable Manager** - Such as `direnv` or editor plugins

### Optional
- **TypeScript** (v4+) - For type-safe development
- **Docker** - For containerized development
- **Postman** - For API testing

Verify your installation:
```bash
node --version    # Should output v14.x.x or higher
npm --version     # Should output 6.x.x or higher
git --version     # Should output 2.x.x or higher
```

---

## Installation

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies:**
   
   Using npm:
   ```bash
   npm install
   ```
   
   Or using yarn:
   ```bash
   yarn install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your specific configuration (see [Configuration](#configuration)).

4. **Verify installation:**
   ```bash
   npm run doctor
   ```

### Alternative Installation Methods

#### Using Docker (if available)
```bash
docker-compose up -d
```

#### Development Installation
```bash
npm install --also=dev
```

---

## Project Structure

```
.
├── .gitignore              # Git ignore rules
├── .env.example            # Environment variables template
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Dependency lock file
├── README.md               # This documentation file
├── src/                    # Source code directory
│   ├── index.js           # Main entry point
│   ├── config/            # Configuration files
│   ├── services/          # Business logic and external services
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Express middleware
│   ├── models/            # Data models
│   ├── utils/             # Utility functions
│   └── routes/            # API route definitions
├── tests/                  # Test files
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── fixtures/          # Test data
├── docs/                   # Additional documentation
├── scripts/                # Build and utility scripts
└── logs/                   # Application logs (gitignored)
```

### Key Directories Explained

| Directory | Purpose |
|-----------|---------|
| `src/config/` | Environment-specific configurations |
| `src/services/` | External API integrations (ERPNext, etc.) |
| `src/controllers/` | HTTP request/response handlers |
| `src/middleware/` | Authentication, logging, error handling |
| `src/models/` | Data schemas and validations |
| `tests/` | All test suites |

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```bash
# ERPNext Configuration
ERPNEXT_URL=https://your-erpnext-instance.com
ERPNEXT_API_KEY=your_api_key
ERPNEXT_API_SECRET=your_api_secret

# Application Configuration
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug

# Database (if applicable)
DATABASE_URL=mongodb://localhost:27017/erpnext-integration

# Redis (for caching)
REDIS_URL=redis://localhost:6379

# JWT Secret (for authentication)
JWT_SECRET=your_super_secret_jwt_key_change_this

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Configuration Options

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `ERPNEXT_URL` | Your ERPNext instance URL | - | ✅ |
| `ERPNEXT_API_KEY` | API Key from ERPNext | - | ✅ |
| `ERPNEXT_API_SECRET` | API Secret from ERPNext | - | ✅ |
| `NODE_ENV` | Environment mode | `development` | ❌ |
| `PORT` | Server port | `3000` | ❌ |
| `LOG_LEVEL` | Logging verbosity | `info` | ❌ |

### Getting ERPNext API Credentials

1. Log in to your ERPNext instance
2. Go to **User Settings** → **API Access**
3. Generate new API Key and Secret
4. Store them securely in your `.env` file

---

## Usage

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

### Production Mode

Build and start for production:

```bash
npm run build
npm start
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `npm start` | Start production server |
| `dev` | `npm run dev` | Start development server with watch mode |
| `build` | `npm run build` | Compile TypeScript (if applicable) |
| `test` | `npm test` | Run all tests |
| `test:watch` | `npm run test:watch` | Run tests in watch mode |
| `test:coverage` | `npm run test:coverage` | Run tests with coverage report |
| `lint` | `npm run lint` | Check code style |
| `lint:fix` | `npm run lint:fix` | Fix code style issues |
| `doctor` | `npm run doctor` | Check system health and configuration |
| `clean` | `npm run clean` | Remove build artifacts |

---

## API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Endpoints

#### Health Check
```http
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

#### ERPNext Sync
```http
POST /sync/:doctype
Content-Type: application/json
Authorization: Bearer <token>

{
  "filters": {},
  "fields": ["*"],
  "limit": 100
}
```

#### Webhooks
```http
POST /webhooks/:event
Content-Type: application/json
X-ERPNext-Signature: <signature>
```

### Authentication

All API endpoints (except health check) require authentication via Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/v1/endpoint
```

### Rate Limiting

Default rate limits:
- 100 requests per 15 minutes per IP
- Exceeding limits returns `429 Too Many Requests`

---

## Testing

### Running Tests

Run all tests:
```bash
npm test
```

Run with coverage:
```bash
npm run test:coverage
```

Run specific test file:
```bash
npm test -- tests/unit/specific.test.js
```

### Test Structure

- **Unit Tests**: Test individual functions and modules
- **Integration Tests**: Test API endpoints and database interactions
- **E2E Tests**: Test complete user workflows

### Writing Tests

Example unit test:
```javascript
const { syncData } = require('../src/services/erpnext');

describe('ERPNext Service', () => {
  describe('syncData', () => {
    it('should fetch data from ERPNext', async () => {
      const result = await syncData('Customer');
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });
});
```

---

## Deployment

### Environment Setup

1. Set `NODE_ENV=production`
2. Configure production database
3. Set up SSL/TLS certificates
4. Configure reverse proxy (nginx/Apache)

### Deploying to Popular Platforms

#### Heroku
```bash
heroku create your-app-name
heroku config:set ERPNEXT_URL=your-url
heroku config:set ERPNEXT_API_KEY=your-key
heroku config:set ERPNEXT_API_SECRET=your-secret
git push heroku main
```

#### Docker
```bash
docker build -t erpnext-integration .
docker run -p 3000:3000 --env-file .env erpnext-integration
```

#### AWS EC2
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone <repository-url>
cd <repository-name>
npm install --production
pm2 start npm --name "erpnext-integration" -- start
```

### CI/CD Pipeline

Example GitHub Actions workflow (`.github/workflows/deploy.yml`):
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run build
      # Add deployment steps
```

---

## Contributing

We welcome contributions! Please follow these steps:

### How to Contribute

1. **Fork the repository**
   ```bash
   git fork <repository-url>
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Write tests for new features
   - Update documentation as needed

4. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
   
   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation changes
   - `style:` Code style changes
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Link related issues
   - Ensure all tests pass

### Code Style

We use ESLint and Prettier for code quality:
```bash
npm run lint
npm run lint:fix
```

### Pull Request Guidelines

- Keep PRs focused and small when possible
- Include tests for new functionality
- Update documentation
- Ensure CI passes
- Request review from maintainers

---

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

---

## Troubleshooting

### Common Issues

#### Connection to ERPNext Failed
**Problem:** Cannot connect to ERPNext instance
**Solution:**
- Verify `ERPNEXT_URL` is correct
- Check network connectivity
- Ensure API credentials are valid
- Check ERPNext server status

#### Authentication Errors
**Problem:** 401 Unauthorized responses
**Solution:**
- Regenerate API keys in ERPNext
- Verify `.env` file is loaded
- Check token expiration

#### Port Already in Use
**Problem:** EADDRINUSE error
**Solution:**
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
# Or change PORT in .env
```

#### Module Not Found
**Problem:** Cannot find module errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode

Enable verbose logging:
```bash
LOG_LEVEL=debug npm run dev
```

---

## FAQ

**Q: What version of ERPNext is supported?**
A: ERPNext v13 and above. Some features may require v14+.

**Q: Can I use this with Frappe Framework directly?**
A: Yes, the integration works with any Frappe-based application.

**Q: Is TypeScript required?**
A: No, but TypeScript definitions are available for better IDE support.

**Q: How do I handle large data imports?**
A: Use pagination and batch processing. See the `utils/batchProcessor.js` module.

**Q: Can I run multiple instances?**
A: Yes, ensure each instance has unique configuration and database connections.

**Q: How often should I rotate API keys?**
A: We recommend rotating every 90 days for security best practices.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 ERPNext Integration Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Support

### Getting Help

- 📖 **Documentation** - You're reading it!
- 🐛 **Issues** - [Open an issue](../../issues) for bugs or feature requests
- 💬 **Discussions** - [GitHub Discussions](../../discussions) for questions
- 📧 **Email** - Contact maintainers for sensitive issues

### Resources

- [ERPNext Documentation](https://docs.erpnext.com/)
- [Frappe Framework Docs](https://frappeframework.com/docs)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

### Community

Join our community channels:
- Slack/Discord (if available)
- Stack Overflow (tag: `erpnext-integration`)
- Twitter: @YourProjectHandle

---

## Acknowledgments

- [ERPNext](https://erpnext.com/) - The amazing open-source ERP
- [Frappe Technologies](https://frappe.io/) - Creators of ERPNext
- [Node.js Foundation](https://nodejs.org/) - JavaScript runtime
- All contributors and supporters of this project

---

<div align="center">

**Made with ❤️ by the ERPNext Integration Team**

[Back to top](#erpnext-integration-project)

</div>