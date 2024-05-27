import fg from 'api-dylux'
import axios from 'axios';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { promises as fs } from 'fs';

var data = {}
const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const jdata = await fs.readFile('data.json', 'utf8');
  const jsonData = JSON.parse(jdata);
  if(jsonData[m.sender]){
    m.react('🔎');
    const search = 'game of thrones';
    const url = 'https://cinesubz.co/?s='+text;
    const response = axios.get(url)
    const res = await response
    const dom = new JSDOM(res.data);
    const document = dom.window.document;
    if(document.querySelector('.result-item')){
    const result = document.querySelector('.result-item');
    const heading = result.querySelector('.title').querySelector('a');
    const hlink = heading.href
    const title = heading.innerHTML
    const img = result.querySelector('.thumbnail').querySelector('a').querySelector('img').src;
    const img2 =img.split("?");
    m.react('⏳')
    const imageResponse = await fetch(img2[0])
    const imgBuffer = await imageResponse.buffer()

      var s3 = '';
      var s3_1 = '';
      var link = {};
      if(result.querySelector('.tvshows')){

    const response2 = axios.get(hlink)
    const res2 = await response2
    const dom2 = new JSDOM(res2.data);
    const document2 = dom2.window.document;

        const s1 = document2.getElementById('seasons');
        const s2 = s1.querySelectorAll('.se-c');
        data.len = s2.length;
        for (let x = 0; x < s2.length; x++) {
            s3=s3+`\n\n*season ${x+1}*\n`
            const s4 = s2[x].querySelectorAll('a');
            const simg = s2[x].querySelectorAll('img');
            for (let x1 = 0; x1 < s4.length; x1++) {
                const s5 = s4[x1];
                s3=s3+'\n> *`'+(x+1)+'.'+(x1+1)+'`* - '+s5.innerHTML;
              link[(x+1)+'.'+(x1+1)] = {
                "url": s5.href,
                "name" : s5.innerHTML,
                "img" : simg[x1].src
              }

            }

        }
      link.id = 1;
        s3_1 = '\n_ඔබට භාගත කිරිමට අවශය Episodes එකෙහි නම්බරය අප වෙත යොමු කරන්න (උදා: 1.2)_';
    }else{
        const response2 = axios.get(hlink)
        const res2 = await response2
        const dom2 = new JSDOM(res2.data);
        const document2 = dom2.window.document;
        const s1 = document2.getElementById('directdownloadlinks') || document2.getElementById('direct1') || document2.getElementById('direct360p') || document2.getElementById('direct480p') || document2.getElementById('direct720p');
        const s2 = s1.querySelector('tbody');
        const s2_1 = s2.querySelectorAll('tr');
        data.len  = s2_1.length;
        for(let x = 0; x < s2_1.length; x++){
          let s5 = s2_1[x].querySelector('.button-download').innerHTML.split(" ")[1];
          let s4 = s5 + ' ('+s2_1[x].querySelectorAll('td')[1].innerHTML+')';
          s3 =s3 +'\n\n' + (x+1)+ ' - ' + s4;
          link[x+1] = s2_1[x].querySelector('a').href
        }
      link.id = 2;
        link.img = img2[0];
        link.title = title;
        s3_1 = '\n_ඔබට භාගත කිරිමට අවශය ගොනුවෙ අංකය අප වෙත යොමු කරන්න_';
}
    const stext =`\n*Title* :\n> ${title}\n${s3_1}
${s3}`;
        


    //console.log(JSON.stringify(data))
      
      const { key } = await conn.sendFile(m.chat, imgBuffer, 'img.jpg',
        stext
        , m);
      conn.GURUPLAY[m.sender] = {
        key,
        timeout: setTimeout(() => {
          conn.sendMessage(m.chat, {
            delete: key,
          })
          delete conn.GURUPLAY[m.sender]
        }, 150 * 300),
      }
      data[key.id] = link;
    }else{

        m.reply(`Results not found: ${args}`)
    }
}else{
    m.reply('contact +94719036042 and signup')
}





}

handler.before = async (m, { conn }) => {
  conn.GURUPLAY = conn.GURUPLAY ? conn.GURUPLAY : {}
  if (m.isBaileys || !(m.sender in conn.GURUPLAY)) return
  const { result, key, timeout } = conn.GURUPLAY[m.sender]
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return
  const choice = m.text.trim()
  const inputNumber = Number(choice)
  //JSON.stringify(key)
  conn.GURUPLAY[m.sender] = {
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
        delete: key,
      })
      delete conn.GURUPLAY[m.sender]
    }, 150),
  }
  if (inputNumber >= 1 && inputNumber <= (data.len+0.99)) {
    m.react('⏳')
    if(data[key.id]['id'] ==2){
      const response4 = axios.get(data[key.id][inputNumber])
      const res4 = await response4
      const dom4 = new JSDOM(res4.data);
      const document4 = dom4.window.document;
      let e=document4.getElementById("link").getAttribute("href"),
        t=e;
        t=t.replace("srilanka","srilanka1"),
        t=t.replace("srilank2","srilanka3"),
        t=t.replace("go"+"ogle."+"com","cs"+"king."+"csher"+"oku01."+"workers.dev"),t!==e


      const newURL = changeDomainAndRedirect(t);

      async function getFileSizeFromURL(url) {
        try {
          const response = await fetch(url, { method: 'HEAD' });

          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
          }

          const contentLength = response.headers.get('content-length');

          if (!contentLength) {
            throw new Error('Content-Length header is missing');
          }

          const fileSizeInBytes = parseInt(contentLength, 10);
          const fileSizeInGB = fileSizeInBytes / (1024 * 1024 * 1024);

          

          if (fileSizeInGB <= 1.5) {
            await conn.sendMessage(
              m.chat,
              {
                document: { url: url },
                mimetype: 'video/mp4',
                fileName: '[SHAN-MD] '+data[key.id]['title']+'.mp4',
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                      title: '𝘱𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘵𝘩𝘪𝘭𝘪𝘯𝘢 |\n'+data[key.id]['title'],
                      body: 'THILINA KAVISHAN',
                      thumbnailUrl: data[key.id]['img'],
                      sourceUrl: 'https://chat.whatsapp.com/LrBTuSAa2IiDLnqX6UWMAt',
                      mediaType: 1,
                      renderLargerThumbnail: true,
                    },
                  },
                },
              { quoted: m }
            )
          } else {
            m.reply('The file exceeds the limit.');
          }
        } catch (error) {
            m.reply('Error fetching file size:', error);
        }
      }

      // Replace with the actual URL of the file
      getFileSizeFromURL(newURL);



      
      
    }else if(data[key.id]['id'] ==1){
    //m.reply('inputNumber')
      const data1 = data[key.id][inputNumber]
        const response3 = axios.get(data1['url'])
        const res3 = await response3
        const dom3 = new JSDOM(res3.data);
        const document3 = dom3.window.document;

        const s1 = document3.getElementById('download');
        const s2 = s1.querySelector('tbody');
        const s2_1 = s2.querySelectorAll('tr');
        const s3 = s2_1[0].querySelector('a').href
      
      const name1 = document3.querySelector('.epih1').innerHTML;
        //link.img = data1['img'];
        //link.title = name1;
        //s3_1 = '\n_ඔබට භාගත කිරිමට අවශය ගොනුවෙ අංකය අප වෙත යොමු කරන්න_';
      
      
      //m.reply(name1+'\n'+s3);


      


      const response4 = axios.get(s3)
      const res4 = await response4
      const dom4 = new JSDOM(res4.data);
      const document4 = dom4.window.document;
      let e=document4.getElementById("link").getAttribute("href"),
        t=e;
        t=t.replace("srilanka","srilanka1"),
        t=t.replace("srilank2","srilanka3"),
        t=t.replace("go"+"ogle."+"com","cs"+"king."+"csher"+"oku01."+"workers.dev"),t!==e

      const newURL = changeDomainAndRedirect(t)
      //m.reply('new'+newURL)
      


      async function getFileSizeFromURL(url) {
        try {
          const response = await fetch(url, { method: 'HEAD' });

          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
          }

          const contentLength = response.headers.get('content-length');

          if (!contentLength) {
            throw new Error('Content-Length header is missing');
          }

          const fileSizeInBytes = parseInt(contentLength, 10);
          const fileSizeInGB = fileSizeInBytes / (1024 * 1024 * 1024);



          if (fileSizeInGB <= 1.5) {
            await conn.sendMessage(
              m.chat,
              {
                document: { url: url },
                mimetype: 'video/mp4',
                fileName: '[SHAN-MD] '+name1+'.mp4',
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                      title: '𝘱𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘵𝘩𝘪𝘭𝘪𝘯𝘢 |\n'+name1,
                      body: 'THILINA KAVISHAN',
                      thumbnailUrl: data1['img'],
                      sourceUrl: 'https://chat.whatsapp.com/LrBTuSAa2IiDLnqX6UWMAt',
                      mediaType: 1,
                      renderLargerThumbnail: true,
                    },
                  },
                },
              { quoted: m }
            )
          } else {
            m.reply('The file exceeds the limit.');
          }
        } catch (error) {
            m.reply('Error fetching file size:', error);
        }
      }

      // Replace with the actual URL of the file
      getFileSizeFromURL(newURL);

      
      
    }
    //console.log(JSON.stringify(key))
    
  } else {
    m.reply(
      'Invalid sequence number. Please select the appropriate number from the list above.\nBetween 1 to '+ data.len
    )
  }
}

handler.help = ['move <url>']
handler.tags = ['downloader']
handler.command = ['m',/^((movie|movies)(downloder|dl)?)$/i,/^((film|tv)(downloder|dl)?)$/i,/^(movie)$/i]
handler.diamond = true

export default handler


function changeDomainAndRedirect(currentURL) {

    // Check if the current domain matches the pattern 'cscloud.eu.org/server11/'
    if (currentURL.includes('https://csking.csheroku01.workers.dev/server11/')) {
        const path = currentURL.replace('https://csking.csheroku01.workers.dev/server11/', '');
        const newURL = 'https://s11.csheroku01.workers.dev/' + path;
        return newURL
    } 

    // Check if the current domain matches the pattern 'cscloud.eu.org/server12/'
    if (currentURL.includes('https://csking.csheroku01.workers.dev/server12/')) {
        const path = currentURL.replace('https://csking.csheroku01.workers.dev/server12/', '');
        const newURL = 'https://s11.csheroku01.workers.dev/' + path;
        return newURL
    } 
    // Check if the current domain matches the pattern 'cscloud.eu.org/server13/'
    if (currentURL.includes('https://csking.csheroku01.workers.dev/server13/')) {
        const path = currentURL.replace('https://csking.csheroku01.workers.dev/server13/', '');
        const newURL = 'https://s11.csheroku01.workers.dev/' + path;
        return newURL
    } 

    // Check if the current domain matches the pattern 'cscloud.eu.org/server21/'
    else if (currentURL.includes('https://csking.csheroku01.workers.dev/server21/')) {
        const path = currentURL.replace('https://csking.csheroku01.workers.dev/server21/', '');
        const newURL = 'https://s21.csheroku01.workers.dev/' + path;
        return newURL
    }

    // Check if the current domain matches the pattern 'cscloud.eu.org/server22/'
    else if (currentURL.includes('https://csking.csheroku01.workers.dev/server22/')) {
        const path = currentURL.replace('https://csking.csheroku01.workers.dev/server22/', '');
        const newURL = 'https://s21.csheroku01.workers.dev/' + path;
        return newURL
    } 

    // Check if the current domain matches the pattern 'cscloud.eu.org/server23/'
    else if (currentURL.includes('https://csking.csheroku01.workers.dev/server23/')) {
        const path = currentURL.replace('https://csking.csheroku01.workers.dev/server23/', '');
        const newURL = 'https://s21.csheroku01.workers.dev/' + path;
        return newURL
    }

    // Check if the current domain matches the pattern 'cscloud.eu.org/server3/'
    else if (currentURL.includes('https://csking.csheroku01.workers.dev/server3/')) {
        const path = currentURL.replace('https://csking.csheroku01.workers.dev/server3/', '');
        const newURL = 'https://s31.csheroku01.workers.dev/' + path;
        return newURL
    }

    else if (currentURL.includes('https://csking.csheroku01.workers.dev/server4/')) {
        const path = currentURL.replace('https://csking.csheroku01.workers.dev/server4/', '');
        const newURL = 'https://s324.csheroku01.workers.dev/' + path;
        return newURL
    }
    else {
        return false
    }
}





