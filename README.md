ChefBot – AI-Powered Culinary Assistant

ChefBot is an advanced AI cooking and food-ordering assistant built using Google Gemini 2.5 Flash. It offers natural conversation, real-time Google Search, and automated order placement through function calling. Designed for smart kitchens, food-delivery apps, and interactive cooking assistants, ChefBot delivers fast, context-aware, and reliable responses.

Features
AI Chef Assistant

ChefBot behaves like a professional chef. It provides recipes, ingredient substitutes, cooking instructions, meal plans, and general food knowledge. Responses are tailored using a custom prompt defining the ChefBot persona.

Google Search Integration

ChefBot can access real-time information using built-in Google Search tools. It can look up:

Recipe ideas

Ingredient details

Restaurant information

Food-related facts and nutritional data

Automated Order Placement

ChefBot can understand when the user wants to place a food order. Using function calling, it extracts:

Dish names and quantities

Delivery address

Delivery time

Special instructions

This data is passed to backend logic to process the order. The bot then returns a confirmation message to the user.

Backend Function Calling System

The project includes structured function schemas, a function executor, and a unified AI service. When the model triggers a function call, the backend automatically handles it and returns the result to the conversation.

Real Chat Experience

ChefBot integrates seamlessly with a frontend chat interface. The backend manages the full flow, including message handling, AI response generation, function-calling decisions, and execution.

Tech Stack

Next.js / React

Node.js backend

Google Gemini 2.5 Flash

JavaScript

Function Calling

Google Search Tools

Project Structure

AI service files for Gemini communication

Function schemas defining order and search capabilities

Function executor for backend actions

Chat API route handling messages

Frontend chat interface for user interaction

Project Setup

Clone the repository

Install dependencies

Add a Google API key to environment variables

Start the development server

Access the chatbot in your browser

Running the Project

After setup, run the development server and interact with ChefBot at the default local URL. The chatbot will handle recipes, cooking questions, live searches, and food-order placements automatically.

Production Deployment

Build and run the production version using your preferred hosting service or deployment platform compatible with Next.js.

Contribution

Contributions, improvements, and feature requests are welcome. Open an issue or submit a pull request to help improve ChefBot.
hello
