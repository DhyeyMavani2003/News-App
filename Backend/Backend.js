const axios = require('axios');
const cheerio = require('cheerio');
const express = require("express");
// const app = express();
var admin = require("firebase-admin");
var serviceAccount = require("./Serviceaccountkey.json");
var sleep = require('sleep');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// const port=3000;
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// var server = app.listen(3000,startup);
// app.get('/parse/bbc/',parseBBC);
// app.get('/parse/TechCrunch',parseTC);

// function startup()  {
//     console.log("Server starting on port "+port.toString());
// }

function parseBBC(link,location){
    if (["0","1","2","3","4","5","6","7","8","9"].indexOf(link.charAt(link.length-1))==-1){
        console.log("Not even trying: "+link);
        return;
    }
    return axios.get(link)
        .then((response)=>{
            if (response.status == 200){
                const html = response.data;
                var $ = cheerio.load(html);
                var arr = [];
                var title = $('h1[class="story-body__h1"]').text();
                var date = $('div[class="date date--v2"]').html();

                if (date == null){
                    let date_ob = new Date();
                    date = months[date_ob.getMonth()] + " " + date_ob.getDate().toString()
                }

                try{
                var imgLink = $('img')[0].attribs.src;
                }catch(error){
                    console.log("error adding not found img");
                    var imgLink = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png";
                }
                var body = $('div[class="story-body__inner"]').find('p').each(function(i, elem) {
                    arr[i] = $(this).text();
                });

                totalArticle = {
                    "title":title,
                    "link":link,
                    "date":date,
                    "imglink":imgLink,
                    "body":arr,
                    "corp":"BBC"
                };
                if (title!=null){
                db.collection('BBC').doc(title).set(totalArticle);
                db.collection(location).doc(title).set(totalArticle);
                }
            }
            //res.send("Inserted article: "+title+"\n");
            console.log("Inserted article: "+title+"\n")
        }
    ).catch((err)=>{
        console.log("error from "+link);
        //console.log(err);
        //res.send("No response from "+link);
    });
}

function parseTC(link,location){
    return axios.get(link)
        .then((response)=>{
            if (response.status == 200){
                const html = response.data;
                var $ = cheerio.load(html);
                var arr = [];
                var title = $('h1[class="article__title"]').text();
                var date = $('time[class="full-date-time"]').html();

                if (date == null){
                    let date_ob = new Date();
                    date = months[date_ob.getMonth()] + " " + date_ob.getDate().toString()
                }

                try{
                    var imgLink = $('img[class=article__featured-image]').attr('src');
                    console.log(imgLink);
                }catch (error){
                    console.log("error, adding image not found");
                    var imgLink = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png";
                }
                var body = $('div[class="article-content"]').find('p').each(function(i, elem) {
                    arr[i] = $(this).text();
                });

                totalArticle = {
                    "title":title,
                    "link":link,
                    "date":date,
                    "imglink":imgLink,
                    "body":arr,
                    "corp":"TechCrunch"
                };


                db.collection('TechCrunch').doc(title).set(totalArticle);
                db.collection(location).doc(title).set(totalArticle);

            }
            //res.send("Inserted article: "+title+"\n");
            console.log("Inserted article: "+title+"\n")
        }
    ).catch((err)=>{
        console.log("Error from "+link);
        //console.log(err);
        //res.send("No response from "+link);
    });
}

function parseEconomist(link,location){
    return axios.get(link)
        .then((response)=>{
            if (response.status == 200){
                const html = response.data;
                var $ = cheerio.load(html);
                var arr = [];
                var title = $('span[class="article__headline"]').text();
                var date = $('div[class="date date--v2"]').html();

                if (date == null){
                    let date_ob = new Date();
                    date = months[date_ob.getMonth()] + " " + date_ob.getDate().toString()
                }

                try{
                var imgLink = $('img')[0].attribs.src;
                }catch(error){
                    console.log("error adding not found img");
                    var imgLink = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png";
                }
                var body = $('div[class="ds-layout-grid ds-layout-grid--edged layout-article-body"]').find('p').each(function(i, elem) {
                    arr[i] = $(this).text();
                });

                totalArticle = {
                    "title":title,
                    "link":link,
                    "date":date,
                    "imglink":imgLink,
                    "body":arr,
                    "corp":"The Economist"
                };
                if (title!=null){
                db.collection('The Economist').doc(title).set(totalArticle);
                db.collection(location).doc(title).set(totalArticle);
                }
            }
            //res.send("Inserted article: "+title+"\n");
            console.log("Inserted article: "+title+"\n")
        }
    ).catch((err)=>{
        console.log("error from "+link);
        //console.log(err);
        //res.send("No response from "+link);
    });
}

function ParsePolitico(link,location){
    if (["0","1","2","3","4","5","6","7","8","9"].indexOf(link.charAt(link.length-1))==-1){
        console.log("Not even trying: "+link);
        return;
    }
    return axios.get(link)
    .then((response)=>{
        if (response.status == 200){
            const html = response.data;
            var $ = cheerio.load(html);
            var arr = [];
            var title = $('h2[class="headline"]').text();
            var date = $('time').text();

            if (date == null){
                let date_ob = new Date();
                date = months[date_ob.getMonth()] + " " + date_ob.getDate().toString()
            }

            try{
            var imgLink = $('img')[0].attribs.src;
            }catch(error){
                console.log("error adding not found img");
                var imgLink = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png";
            }
            var body = $('div[class="story-text"]').find('p').each(function(i, elem) {
                arr[i] = $(this).text();
            });

            totalArticle = {
                "title":title,
                "link":link,
                "date":date,
                "imglink":imgLink,
                "body":arr,
                "corp":"Politico"
            };
            if (title!=null){
            db.collection('Politico').doc(title).set(totalArticle);
            db.collection(location).doc(title).set(totalArticle);
            }
        }
        //res.send("Inserted article: "+title+"\n");
        console.log("Inserted article: "+title+"\n")
    }
).catch((err)=>{
    console.log("error from "+link);
    //console.log(totalArticle);
    //console.log(err);
    //res.send("No response from "+link);
});   
}

/////////////////////////////////

async function deleteCollection(collectionPath, batchSize) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);
  
    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }
  
  async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();
  
    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }
  
    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  
    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve);
    });
  }
  
function getAllArticles(link,site,feed){
    if (site=="Economist"){
        axios.get(link).then((response)=>{
                const html = response.data;
                var $ = cheerio.load(html);
                $('a')
                .each(function(i, elem) {
                    link = $(this).attr('href');
                    if (link[0]=="/"){link = "http://economist.com"+link}
                    if (link[0]=="h"){
                        parseEconomist(link,feed);
                    }
                })
            });
    }
    else if (site=="BBC"){
        axios.get(link).then((response)=>{
            const html = response.data;
            var $ = cheerio.load(html);
            $('a')
            .each(function(i, elem) {
                link = $(this).attr('href');
                if (link[0]=="/"){link = "http://bbc.com"+link}
                if (link[0]=="h"){
                    parseBBC(link,feed);
                }
            })
        });
    }
    else if (site=="TechCrunch"){
        axios.get(link).then((response)=>{
            const html = response.data;
            var $ = cheerio.load(html);
            $('a')
            .each(function(i, elem) {
                link = $(this).attr('href');
                if (link[0]=="/"){link = "http://techcrunch.com"+link}
                if (link[0]=="h"){
                    parseTC(link,feed);
                }
            })

        });
    }
    else if (site=="Politico"){
        axios.get(link).then((response)=>{
            const html = response.data;
            var $ = cheerio.load(html);
            $('a')
            .each(function(i, elem) {
                link = $(this).attr('href');
                if (link[0]=="/"){link = "http://politico.com"+link}
                if (link[0]=="h"){
                    ParsePolitico(link,feed);
                }
            })

        });
    }
    else {
        console.log("Invalid site")
    }
}


function updateEverything(feed){
    // deleteCollection(feed,5).then(()=>{
    //     console.log("Refreshing DB...");
    //     }
    // );
    if (feed=="Technology"){
        getAllArticles("https://techcrunch.com/","TechCrunch","Technology");
        getAllArticles("https://www.bbc.com/news/technology","BBC","Technology");
        getAllArticles("https://www.economist.com/science-and-technology/","Economist","Technology");
    }
    else if (feed=="International"){
        getAllArticles("https://www.economist.com/international/","Economist","International");
        getAllArticles("https://www.bbc.com/news/world","BBC","International");
    }
    else if (feed=="Finance"){
        getAllArticles("https://www.economist.com/finance-and-economics/","Economist","Finance");
        getAllArticles("https://www.economist.com/business/","Economist","Finance");
        getAllArticles("https://www.bbc.com/news/business","BBC","Finance");

    }
    else if (feed=="Politics"){
        getAllArticles("https://www.politico.com/","Politico","Politics");
    }
}

updateEverything("International");
updateEverything("Politics");
updateEverything("Finance");
updateEverything("Technology");
