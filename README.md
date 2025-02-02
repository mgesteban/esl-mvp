# ESL Lesson Planner

An AI-powered tool for generating ESL lesson plans quickly and efficiently.

## Features

- Generate complete ESL lesson plans with AI assistance
- Customizable lesson parameters (level, topic, duration)
- Save and manage lesson plans locally
- Print-friendly lesson format
- Responsive design for all devices

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd esl-lesson-planner
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` and add your OpenAI API key (get one from https://platform.openai.com/api-keys)

4. Start the development server:
```bash
npm run dev
```

## Development

- Built with React + TypeScript
- Uses Tailwind CSS for styling
- OpenAI API for lesson generation
- Local storage for data persistence

## Project Structure

```
src/
├── components/         # React components
├── services/          # Service classes
├── types/             # TypeScript types
└── App.tsx            # Main application
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
