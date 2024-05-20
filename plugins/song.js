  import fetch from 'node-fetch'
  import ytdl from 'youtubedl-core'
  import yts from 'youtube-yts'
  import fs from 'fs'
  import { pipeline } from 'stream'
  import { promisify } from 'util'
  import os from 'os'

  const streamPipeline = promisify(pipeline)

  const handler = async (m, { conn, command, text, args, usedPrefix }) => {
    if (!text) throw `give a text to search Example: *${usedPrefix + command}* sefali odia song`
    conn.GURUPLAY = conn.GURUPLAY ? conn.GURUPLAY : {}
    m.react('⏳')
    const result = await searchAndDownloadMusic(text)
    const r1 = result.allLinks[0];

    const selectedUrl = r1.url
    let title = generateRandomName()
    const audioStream = ytdl(selectedUrl, {
      filter: 'audioonly',
      quality: 'highestaudio',
    })

    const tmpDir = os.tmpdir()

    const writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`)

    await streamPipeline(audioStream, writableStream)

    const doc = {
      audio: {
        url: `${tmpDir}/${title}.mp3`,
      },
      mimetype: 'audio/mpeg',
      ptt: false,
      waveform: [100, 0, 50, 0, 20, 0, 100],
      fileName: `${title}`,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: r1.title,
          body: 'THILINA KAVISHAN',
          thumbnailUrl: result.thumbnail,
          sourceUrl: 'https://chat.whatsapp.com/LrBTuSAa2IiDLnqX6UWMAt',
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    }

    await conn.sendMessage(m.chat, doc, { quoted: m })
    m.react('✅')
    
    
  }

  handler.help = ['play']
  handler.tags = ['downloader']
  handler.command = [/^(song)$/i,/^(music)$/i,/^(play)$/i]
  handler.limit = true
  export default handler

  async function searchAndDownloadMusic(query) {
    try {
      const { videos } = await yts(query)
      if (!videos.length) return 'Sorry, no video results were found for this search.'

      const allLinks = videos.map(video => ({
        title: video.title,
        url: video.url,
      }))

      const jsonData = {
        title: videos[0].title,
        description: videos[0].description,
        duration: videos[0].duration,
        author: videos[0].author.name,
        allLinks: allLinks,
        videoUrl: videos[0].url,
        thumbnail: videos[0].thumbnail,
      }

      return jsonData
    } catch (error) {
      return 'Error: ' + error.message
    }
  }

  async function fetchVideoBuffer() {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accntroless-Co-Allow-Origin': '*',
        },
      })
      return await response.buffer()
    } catch (error) {
      return null
    }
  }

  function generateRandomName() {
    const adjectives = [
      'happy',
      'sad',
      'funny',
      'brave',
      'clever',
      'kind',
      'silly',
      'wise',
      'gentle',
      'bold',
    ]
    const nouns = ['cat', 'dog', 'bird', 'tree', 'river', 'mountain', 'sun', 'moon', 'star', 'cloud']

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]

    return randomAdjective + '-' + randomNoun
  }