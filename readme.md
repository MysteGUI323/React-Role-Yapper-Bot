<!-- STREAMING_CHUNK:Writing project title and description... -->
# Yapper Reaction Role Bot 🤖

A lightweight, robust bot for the Yapper chat platform that allows server members to self-assign roles by reacting to a message with an emoji. Built using Node.js and the official Yapper SDK.

## ✨ Features

* **Self-Serve Roles:** Users can add or remove their own roles simply by clicking an emoji.
* **Persistent Storage:** Saves active reaction roles to a local `reaction_roles.json` file. The bot never forgets your setups, even if it restarts!
* **Auto-Cleanup:** The bot automatically deletes your setup command to keep the chat looking clean and professional.
* **Yapper Hosting Ready:** Designed to be easily linked to Yapper's built-in 24/7 Bot Hosting.

<!-- STREAMING_CHUNK:Listing prerequisites and setup steps... -->
## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
* **Node.js** v18 or newer installed on your machine.
* A Yapper Bot account and **Token** (create one at Yapper Settings → Developer).
* The official `yapper.js` library file (downloaded from the Yapper Developer portal) placed in the same folder as the bot.

## 🚀 Setup & Installation

1. **Clone the repository:**
   Download or clone this project to your local machine.

2. **Add the SDK:**
   Ensure the `yapper.js` file is located in the root directory alongside `bot.js`.

3. **Configure your Token:**
   Create a file named `.env` in the root folder and paste your bot token inside:
   ```env
   YAPPER_BOT_TOKEN=your_secret_token_goes_here
   ```
   *(Never share your `.env` file or upload it to GitHub!)*

4. **Run the bot:**
   Open a terminal in the folder and run:
   ```bash
   npm start
   ```

<!-- STREAMING_CHUNK:Documenting usage instructions and permissions... -->
## 🎮 How to Use

Once the bot is online in your server, use the following slash command to create a reaction role:

**Syntax:**
`/reactrole <emoji> <role_id> <message>`

**Example:**
`/reactrole 🍕 123456789 Click the pizza to get the Pizza Lover role!`

The bot will post the message, react to it with the 🍕 emoji, and delete your original command. Anyone who clicks the 🍕 will be given the role `123456789`.

## 🔐 Required Permissions

For the bot to function correctly, go to **Server Settings → Members → [Your Bot] → Roles** and ensure it has a role with the following permissions:
* **Manage Roles:** Required to give and take roles from users. *(Note: The bot's role must be placed higher in the server's role list than the roles it is trying to assign!)*
* **Manage Messages:** Required to delete the setup command message you type.

<!-- STREAMING_CHUNK:Explaining Yapper hosting instructions... -->
## ☁️ 24/7 Yapper Hosting

Want to keep the bot online without running your PC all day? Yapper offers built-in hosting!
1. Upload this code to a public GitHub repository (Make sure your `.env` file is ignored/not uploaded).
2. Go to your Yapper Developer Portal and submit your bot to be a **Verified bot**.
3. Once verified, go to the **Hosting** tab in your bot's settings.
4. Link your GitHub repository. Yapper will automatically inject the `YAPPER_BOT_TOKEN` environment variable and run the `npm start` script for you!

---
*Created for the Yapper platform.*