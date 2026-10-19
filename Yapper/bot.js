import { Bot } from './yapper.js';
import fs from 'fs';

// Initialize the bot using the token from the .env file
const bot = new Bot(process.env.YAPPER_BOT_TOKEN);

const DATA_FILE = 'reaction_roles.json';

// Persistent storage for our reaction roles.
let reactionRoles = {};

// Load existing reaction roles from disk if the file exists
if (fs.existsSync(DATA_FILE)) {
  try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    reactionRoles = JSON.parse(rawData);
    console.log(`Loaded ${Object.keys(reactionRoles).length} reaction roles from disk.`);
  } catch (err) {
    console.error('Failed to parse reaction_roles.json:', err);
  }
}

// Helper to persist the mappings to disk
function saveRolesToDisk() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(reactionRoles, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save reaction roles:', err);
  }
}

// Keep track of the bot's username so we can ignore its own reactions
let botUsername = '';

bot.on('ready', (me) => {
  botUsername = me.username;
  console.log(`Logged in as ${me.username}. Ready to assign roles!`);
});

// Command to setup a new reaction role
bot.command('reactrole', 'Create a reaction role: /reactrole <emoji> <role_id> <message>', async (msg) => {
  if (msg.argv.length < 3) {
    return msg.reply('Usage: /reactrole <emoji> <role_id> <message>');
  }

  const emoji = msg.argv[0];
  const roleId = msg.argv[1];
  const text = msg.argv.slice(2).join(' ');

  try {
    const sentMsg = await bot.send(msg.channel_id, text, {});
    
    // Save the mapping for this specific message ID
    reactionRoles[sentMsg.id] = {
      emoji: emoji,
      roleId: roleId
    };

    // Persist the new mapping to our JSON file
    saveRolesToDisk();

    // The bot reacts to its own message first to give users a button to click
    await bot.react(msg.channel_id, sentMsg.id, emoji);
    
    // Delete the original command message sent by the user
    try {
      await bot.delete(msg.channel_id, msg.id);
    } catch (delError) {
      console.error('Failed to delete original message. Does the bot have Manage Messages permission?', delError);
    }
    
  } catch (error) {
    console.error('Failed to setup reaction role:', error);
    msg.reply('Error setting up the reaction role. Check my permissions!');
  }
});

bot.on('reaction_add', async (ev) => {
  // Ignore the bot's own reactions
  if (ev.username === botUsername) return;

  const roleData = reactionRoles[ev.message_id];
  if (roleData && roleData.emoji === ev.emoji) {
    try {
      await bot.addRole(ev.server_id, ev.user_id, roleData.roleId);
      console.log(`Gave role ${roleData.roleId} to ${ev.username}`);
    } catch (error) {
      console.error(`Failed to add role ${roleData.roleId}:`, error);
    }
  }
});

bot.on('reaction_remove', async (ev) => {
  // Ignore the bot's own reactions
  if (ev.username === botUsername) return;

  const roleData = reactionRoles[ev.message_id];
  if (roleData && roleData.emoji === ev.emoji) {
    try {
      await bot.removeRole(ev.server_id, ev.user_id, roleData.roleId);
      console.log(`Removed role ${roleData.roleId} from ${ev.username}`);
    } catch (error) {
      console.error(`Failed to remove role ${roleData.roleId}:`, error);
    }
  }
});

bot.on('error', (e) => console.error('Bot Error:', e));

// Start the bot
bot.start();