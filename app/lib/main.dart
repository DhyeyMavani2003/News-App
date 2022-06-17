import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'articles.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flip_card/flip_card.dart';
import 'package:flutter/services.dart';

void main(){
  runApp(MaterialApp(
    home:Home()
    ));

}



class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
  
}

class _HomeState extends State<Home> {
  
  var typeNews = "Technology";

  void updateTypeNews(typeNewsNew){
    setState(() {
      typeNews = typeNewsNew;
    });
  }

  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp,DeviceOrientation.portraitDown]);
    SystemChrome.setEnabledSystemUIOverlays([SystemUiOverlay.bottom]);
    var colors = {"International":Colors.blue,"Technology":Colors.orange,"Finance":Colors.green,"Politics":Colors.red};
    return Scaffold(
    drawer: Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          Container(
          height: 90.0,
          child:DrawerHeader(
            child: RichText(
            text: TextSpan(
                    style:TextStyle(fontSize: 40),
                    text: "Micro",
                    children: <TextSpan>[
                      TextSpan(text: "News ",style: TextStyle(fontWeight: FontWeight.bold)),
                    ],
                ),
                ),
              decoration: BoxDecoration(
                color: colors[typeNews],
              ),
            ),
          ),
          ListTile(title: Row(children: [Icon(Icons.public,size: 40,color: Colors.blue,),SizedBox(width: 10),Text("International",style: TextStyle(fontSize: 20),)],) ,onTap:(){updateTypeNews("International");Navigator.pop(context);},),
          ListTile(title: Row(children: [Icon(Icons.tv,size: 40,color: Colors.orange,),SizedBox(width: 10),Text("Technology",style: TextStyle(fontSize: 20),)],),onTap:(){updateTypeNews("Technology");Navigator.pop(context);}),
          ListTile(title: Row(children: [Icon(Icons.trending_up,size: 40,color: Colors.green,),SizedBox(width: 10),Text("Finance",style: TextStyle(fontSize: 20),)],), onTap:(){updateTypeNews("Finance");Navigator.pop(context);}),
          ListTile(title: Row(children: [Icon(Icons.speaker_notes,size: 40,color: Colors.red,),SizedBox(width: 10),Text("Politics",style: TextStyle(fontSize: 20),)],), onTap:(){updateTypeNews("Politics");Navigator.pop(context);}),
          
      ]

      ),
    ),
    backgroundColor: colors[typeNews],
    appBar: AppBar(
      title:RichText(
        text: TextSpan(
          text: "Micro",
          children: <TextSpan>[
            TextSpan(text: "News ",style: TextStyle(fontWeight: FontWeight.bold)),
            TextSpan(text: typeNews)
          ],
      ),
      ),
      centerTitle: true, 
      backgroundColor: colors[typeNews],
      elevation: 0,
    ),

    body: 
    StreamBuilder(
      stream:Firestore.instance.collection(typeNews).snapshots(),
      builder: (context,snapshot){
        if(!snapshot.hasData){
          return Text("Loading");
        }
        return CarouselSlider(
          options: CarouselOptions(
            height: MediaQuery.of(context).size.height,
            enableInfiniteScroll: false,
            autoPlay: false,
            viewportFraction: 1.0,
            scrollDirection:Axis.vertical,
            enlargeCenterPage: true,
          ),
          items:snapshot.data.documents.map<Widget>((DocumentSnapshot document) {
            return 
            FlipCard(
            direction: FlipDirection.HORIZONTAL, // default
            flipOnTouch: true,
            front: Container(
              child: ArticleCard(Article(title: document.data['title'],imgLnk:document.data['imglink'],date: document.data['date'],corp: document.data['corp'])),
            ),
            back: Container(
                child: BackCard(Article(title: document.data['title'],articleTxt: document.data["body"])),
            ),
          );  
          }).toList(),
      );
      },
    )

    );
  }

}

