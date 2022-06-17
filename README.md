# MicroNews

**MicroNews** is an open source news app that allows users to access the latest news stories quickly and efficiently.  

The app itself is built using Flutter with a Node.js backend responsible for for the web-scraping components and Firebase Cloud Firestore for the database. 

### Support for News Sources

The app currently supports web-scraping articles from the BBC, TechCrunch, The Economist and Politico. Articles from these websites are split into the categories of "International", "Technology". "Finance", and "Politics". Support for other news websites and news categories may come in the future.

<a href="https://www.politico.com/">
<img src="https://static.politico.com/da/f5/44342c424c68b675719324b1106b/politico.jpg" height="130" width="20%"> </a>
<a href="https://techcrunch.com/"><img src="https://images.squarespace-cdn.com/content/584ee3cc2994cac9e545aadd/1531318367142-P5YRXFM4Q2EVA3ABJO9P/Tech-Crunch-Cuseum-Press-Mention-Version-1-2.jpg?content-type=image%2Fjpeg" height="130" width="20%"></a>
<a href="https://www.economist.com/"><img src="https://prnewswire2-a.akamaihd.net/p/1893751/sp/189375100/thumbnail/entry_id/1_j5tc473u/def_height/785/def_width/1500/version/100011/type/2/q/100" height="130" width="20%"></a>
<a href="https://www.bbc.com/"><img src="https://m.files.bbci.co.uk/modules/bbc-morph-news-waf-page-meta/4.1.4/bbc_news_logo.png" height="130" width="20%"></a>

### Installation

The app can be run on Android by navigating into the app directory and running:

``flutter run --release`` 

IOS releases have not yet been tested.

### Usage

News articles in MicroNews are represented by "**cards**":

<img src="https://i.ibb.co/WGSYfgT/Screenshot-20200919-133050.jpg" height="500">

Clicking on a card will reveal the contents of that article:

<img src="https://i.ibb.co/ckgt6qd/Screenshot-20200919-133059.jpg" height="500">

Swiping up and down allows navigation between articles in a news category:

<img src="https://i.ibb.co/PxQL5WK/Screenshot-20200919-133122.jpg" height="500">

Swiping to the left reveals an app drawer with the rest of the available news categories:  

<img src="https://i.ibb.co/Q8xQwxX/Screenshot-20200919-133144.jpg" height="500">
