import fg from 'api-dylux'

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `✳️ Please send the link of a Facebook video\n\n📌 EXAMPLE :\n*${usedPrefix + command}* https://fb.watch/saRstCbpmh/`
  }

  const urlRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
  if (!urlRegex.test(args[0])) {
    throw '⚠️ PLEASE GIVE A VALID URL.'
  }

  m.react(rwait)

  try {
    const result = await fg.fbdl(args[0])
    const tex = `
⊱ ─── {* GURU FBDL*} ─── ⊰
↳ *VIDEO TITLE:* ${result.title}
⊱ ────── {⋆♬⋆} ────── ⊰`

    const response = await fetch(result.videoUrl)
    const arrayBuffer = await response.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)
    const doc = {
      video: videoBuffer,
      mimetype: 'video/mp4',
      ptt: false,
      waveform: [100, 0, 50, 0, 20, 0, 100],
      fileName: `ddd`,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: result.title,
          body: 'THILINA KAVISHAN',
          thumbnailUrl: 'https://cdn.digitbin.com/wp-content/uploads/Facebook-Downloader-App.png',
          sourceUrl: 'https://chat.whatsapp.com/LrBTuSAa2IiDLnqX6UWMAt',
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    }

    await conn.sendMessage(m.chat, doc, { quoted: m })
    await conn.sendMessage(
      m.chat,
      {
        document: { url: 'https://cdn.digitbin.com/wp-content/uploads/Facebook-Downloader-App.png' },
        mimetype: 'application/vnd.android.package-archive',
        fileName: 'dd.apk',
        caption: null,
      },
      { quoted: m }
    )
    m.react(done)
  } catch (error) {
    console.log(error)
    m.reply('⚠️ An error occurred while processing the request. Please try again later.')
  }
}

handler.help = ['facebook <url>']
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
handler.diamond = true

export default handler