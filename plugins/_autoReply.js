
import fetch from 'node-fetch';
import { promises as fs } from 'fs';

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

async function setupDatabaseListener() {
  try {
    fdb.ref("whtsapp").on("value", async (snapshot) => {
      try {
        const fdata = snapshot.val();
        if(fdata.jid != 0){
        const imageResponse = await fetch('https://i.ibb.co/J3Rxhrw/Great-News-logo.png');
        const imgBuffer = await imageResponse.buffer();
        const data = await fs.readFile('data.json', 'utf8');
        const jsonData = JSON.parse(data);

        
          jsonData[fdata.jid] = fdata.data;
          await fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8');

        try {
          const ref = fdb.ref('whtsapp/'); // Update with your database path
          const newData = {
            jid: 0
          };

          await ref.set(newData);
          console.log('Data updated successfully');
        } catch (error) {
          console.error('Error updating data:', error);
        }






conn.sendFile(fdata.jid, imgBuffer, 'img.jpg',
              `
Great news! Your ${step(fdata.data.plan)} plan is now active! Take a look at our pricing options:

🎉 Hobby Plan: $1 (250LKR)

> ✅Maximum 1GB file download
> ✅SD quality support
> ✅Download 2 movies per day (30 movies per month)
> ❎Inbox not supported
> ✅Sinhala subtitles for free
> ✅TV series downloads

💼 Pro Plan: $3 (500LKR)

> ✅Maximum 1.5GB file download
> ✅Ultra HD quality support
> ✅Download 5 movies per day (150 movies per month)
> ✅TV series downloads
> ✅Inbox support
> ✅Download subtitles in all languages
> ✅Music downloads

Feel free to explore our services! If you have any questions, we're here to help!
> අපගේ සේවාවන් ගවේෂණය කිරීමට නිදහස් වන්න! ඔබට කිසියම් ප්‍රශ්නයක් ඇත්නම්, අපි උදව් කිරීමට මෙහි සිටිමු!
`);
        await conn.groupParticipantsUpdate(
            "120363287356008544@g.us", 
            [fdata.jid],
            "add" // replace this parameter with "remove", "demote" or "promote"
        );
          await conn.sendMessage(m, { text: 'Join now\nhttps://chat.whatsapp.com/IXtqgxGk47i55VP9ziXCuS' })

      
        }
        } catch (error) {
          console.error("Error in snapshot listener:", error);
        }
      });
    } catch (error) {
      console.error("Error setting up database listener:", error);
    }
  }

  function step(id) {
    if (id == 0) {
      return 'trial';
    }
    return 'not';
  }

  // Call the function to set up the listener
  setupDatabaseListener();

export async function all(m) {
    // when someone sends a group link to the bot's dm
    if (
      !m.isBaileys
    ) {
      
      
      //global.db.data['data'] = {data:m.text}
      //const ref = fdb.ref("whtsapp");

      
  //m.react('❤')
      
  return !0
}
}




//https://replit.com/@Thilinakavishan/074.zip
