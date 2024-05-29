import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import path from 'path';

import admin from "firebase-admin";

if (!admin.apps.length) {
admin.initializeApp({
  credential: admin.credential.cert({
                                     "type": "service_account",
                                     "project_id": "thilina-52f9f",
                                     "private_key_id": "9f6d22af03e5aa65599e800eba43a8fd68ae5fcf",
                                     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCj4dnjCsPUc9ec\n3UG307olrR/e0SqmvsU+kFeYCXOyWU9XOW/HYTzIQmhit9uFNi2K3csa9KIQ3L3X\n+tJOw3UZWDh0FtjEKhzCE4TXM5vIzxS/+7/XmC4gdkiPf5SL4K/GaYLjQYYewyZN\nqZDu+o8ju+m26laD35NaN+J2jmHeedD01JYa9fNn0WQxxNBctWbNuG0nZ0l/VLrk\nVRSIc0mlWla/nfTDYo3fdlWBYOi1Ncn/j6npU7kiv59TrhoX3CTys9q8SBxNJOBo\nF3mJN1e1kGcXkCTT4ndYxuGdNwek38v1WONgqmvbETGQsln9ySJBG6EjpRv+R7XV\nF8kOYugtAgMBAAECggEACcbLHnihmXFWYdzv3bfmI/dBrnjgnX/wo7yCrTxAcwRR\nmmIqdpoowR2iZ+PmAaVrbscFJdTa55HzoAiDjAABuAMDoyagbzC/9HKrpcGbao2y\nrt1QODFeQcDXWqWBcXLJqawuYGuj76k0Bhq2iGXZgjKPTRffv2WSvyVpqimbpw+Z\njvtcaV9HVLyvF79iu5ANi7p9uss6YZdKZuQIsbbvxYCLmUlgHqrbpp41gdH3VbPS\nT5AcjZOOf9cFD2ev5zaCqK8/Tpv1bS0/aW3GvWSSdwmxx+orLhVt8tagy4HfOSlH\nl7YwM2qPRVxsqygkrfs36ugp6bPr1NuNl+ov/EJvYQKBgQDP42vi73ziDITPba5L\n5nJmIJ19uu0zNqW8BfSN5FF0rd3IT3v1zH9XTE/MQJcjFVFEte4kcRvsQhZ78f4Q\ndm2vSbNuwe782PSuji37zezEoAAOXyehMbqxjVAnVqrr6mpqyXTP8cdwAXelR85p\n+r34XIS8yA6uotvrCs8Z1MrTCQKBgQDJzzyxuZUAxIXBVCdKzOd0zl2xjKxilBfI\nqYds99aQpMm6NeyEUeeJJ+1onvWRLQ33w05xboUamMC9Kc6jwJKAzPSi28YkgjjX\n0TwXqTh307Qhsz0eDzP4rRDStkwyZ1VEeHMsqxlfmeMZuXBVq51GbvZkxTGe1HG4\nnzaY2HvBBQKBgQDEcynhguTljGT4y7H4waV7gviw9rLuQYbunkYSzB55f0/k2c/P\nYFc5vMBvyN3J5nwszStkvopfgbhTmkO3dOKD0cbBNHzN7YuTZIJpwJgs2vISorMF\nbcP5wwtqkUjltVio3wUG+Hi6DHju9GNH3Q4mI++/oeHV/8qIW2eIBoFAWQKBgQC9\nmAaLabCEshx/DpKDgZGJeT8oyOJDEqJtkGd8hjJ8XXRvjq2PemstvecavQwzwcI3\nnLMbehtua0fX72kFCqwYeXTzc8npDrZce2QbTo2QdcHrTzsB/IJ1BBKkA0P+rnm7\nA/YgZvZFjIuA5WiV886kFydAcMo3T5svOdTPL8LECQKBgBJgmGqHKUR7NePWtea8\nHEJhFCc1uvWvrXYrkqjhQ1ZZsDivzqDCuWlNPq7tw7XqHAuCw0TfOGsOeaT2DWp4\nTk5s3XfFv5tkYI1HPX6RiYEGcjKDB0/3PE1gfYvWu66ZCajvryWzSPcisAstAeGS\nG/f4/pA9msQU3zP6ti38M6jN\n-----END PRIVATE KEY-----\n",
                                     "client_email": "firebase-adminsdk-frgvd@thilina-52f9f.iam.gserviceaccount.com",
                                     "client_id": "110772329023913653758",
                                     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                                     "token_uri": "https://oauth2.googleapis.com/token",
                                     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                                     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-frgvd%40thilina-52f9f.iam.gserviceaccount.com",
                                     "universe_domain": "googleapis.com"
                                   }
),
  databaseURL: "https://thilina-52f9f-default-rtdb.firebaseio.com" // Replace with your database URL
});
}
const fdb = admin.database();





export async function all(m) {
    // when someone sends a group link to the bot's dm
    if (
      !m.isBaileys &&
      !m.isGroup && !m.key.fromMe && m.text
    ) {
      
      const data = await fs.readFile('data.json', 'utf8');

      // Parsing JSON data
      const jsonData = JSON.parse(data);
      if(jsonData[m.key.remoteJid]){
        if(jsonData[m.key.remoteJid].step == 1){
          if(m.text == '1'){
            m.reply('what is your name : ');
            jsonData[m.key.remoteJid].step = 2;
            fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8')
          }
        }else if(jsonData[m.key.remoteJid].step == 2){
          if(!isProbablyName(m.text)){
            m.react('❌')
            m.reply('*⭕Name is not valid!.*\n\nPlease use a valid name format. \n> example: R.M Danapala Kapugoda')
          }else{
            m.react('✅');
            jsonData[m.key.remoteJid].step = 0;
            jsonData[m.key.remoteJid].name2 = m.text;
            jsonData[m.key.remoteJid].plan = 0;
            fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8');



            try {
              const ref = fdb.ref('whtsapp/'); // Update with your database path
              const newData = {
                jid: m.key.remoteJid,
                data: jsonData[m.key.remoteJid]
              };

              await ref.set(newData);
              console.log('Data updated successfully');
            } catch (error) {
              console.error('Error updating data:', error);
            }
            





            
            const ppUrl = await conn.profilePictureUrl(m.key.remoteJid,'image')
                    await conn.sendFile(m.chat, ppUrl, 'img.jpg',
                      `\nCongratulations! 🎉 Your registration was successful! Welcome aboard! 🚀

Name:
> *${m.text}*
Contact number:
> *${m.sender.split('@')[0]}*
User id:
> *${jsonData[m.key.remoteJid].id}*
`
                      );
            
            
            
          }
          console.log(isProbablyName(m.text))
          //jsonData[m.key.remoteJid]['name2'] = m.text;
          
        }
        
      }else{
        const ppUrl = await conn.profilePictureUrl(m.key.remoteJid,'image')
        await conn.sendFile(m.chat, ppUrl, 'img.jpg',
          `\n👋hi ${m.pushName} \n\n*🔰Join Us Today!*

Sign up now to unlock unlimited access to our extensive movie library. Enjoy the latest blockbusters and timeless classics, available for download at your convenience. Don’t miss out – create your account and start your movie adventure today!

Sign up and start downloading now!

_reply number👇_
> *1 - SignUp*
> ~*2 - LogIn*~
> ~*3 - Language*~
> ~*4 - Help*~
`
          );
        jsonData.index = jsonData.index + 1;

        jsonData[m.key.remoteJid] = {
          name: m.pushName,
          step : 1,
          id: String(jsonData.index).padStart(5, '0')
        }
        fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8')



        
        
      }


  //m.reply(JSON.stringify(m))
      console.log(m.key.remoteJid)

  return !0
}
}




function isProbablyName(str) {
    // Check if the string is empty or null
    if (!str) return false;

    // Split the string into words
    const words = str.split(' ');

    // Basic length check
    if (words.length > 5 || words.length === 0) return false;

    // Check each word
    for (const word of words) {
        if (word.length < 2 || word.length > 20) return false;
        // Check if the word contains any digit
        if (/\d/.test(word)) return false;
    }

    return true;
}
