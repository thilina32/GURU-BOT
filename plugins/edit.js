import { promises as fs } from 'fs';
const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  
  m.react('☣');

  const path2 = text.split(' ');
  const path = path2[0];

  if (!text) {
    return conn.reply(m.chat, `Usage: ${usedPrefix + command} <url>`, m);
  }

  

  try {
    // Fetch the content from the URL
    const index = text.indexOf(path);
    const content = text.slice(0, index) + text.slice(index + path.length).trim();

    // Define a local filename (you might want to make this dynamic or configurable)

    // Save the content to a local file
    await fs.writeFile(path, content);

    conn.reply(m.chat, `Content downloaded and saved to ${path}`, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'An error occurred while fetching the content.', m);
  }
};

handler.help = ['move <url>'];
handler.tags = ['downloader'];
handler.command = [/^(edit)$/i];
handler.rowner = true

export default handler;
