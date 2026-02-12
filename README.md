# Social Support Portal

## Setup

npm install
npm run dev

## How to set up the OpenAI API Key
- Create / Log in to your OpenAI account(https://platform.openai.com)
- Go to the API Keys page 
  - Select “View API keys” (https://platform.openai.com/api-keys)
- Create a new API key
  - Give it a name
  - Click Create
- Key look like  sk-xxxxxxxxxxxxxxxxxxxxxxxx
- Paste key in env file 


## Environment

Create .env file:
VITE_OPENAI_KEY=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

## Tech stack used
- Framework           : React.js
- UI Library          : Tailwind CSS
- Form Handling       : React Hook Form
- State Management    : Context API
- API Calls           : Axios
- Internationalization: React-i18next
- Routing             : React Router


## Features

- Multi-step wizard
- GPT Integration
- EN / AR with RTL
- Context API state
- LocalStorage persistence
- Accessible Modal
