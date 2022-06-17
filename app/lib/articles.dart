import 'package:flutter/material.dart';

class Article{
  String title, corp, date, author, imgLnk;
  List articleTxt; 

  Article({ this.title,this.corp,this.date,this.author,this.articleTxt,this.imgLnk});

}

class ArticleCard extends StatelessWidget {
  final Article art;
  const ArticleCard(this.art);


  @override
  Widget build(BuildContext context) {
    return Container(
          child: 
          Card(
            elevation: 5,
            color: Color(0xfff4f4f4),
            shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
            ),
          semanticContainer: true,
          clipBehavior: Clip.antiAliasWithSaveLayer,
            child:Padding(
            padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
            child:
            Column(
              mainAxisSize: MainAxisSize.max,
              children: <Widget>[
            FittedBox(
            child:Image.network(
                art.imgLnk,
            ),
            fit: BoxFit.fill,
            ),
            Column(
              children: <Widget>[
              Align(
                alignment: Alignment.topLeft,
                child:
                Text(art.title,
                  style: TextStyle(
                    fontSize: 24, 
                    fontFamily: 'NewsCycle',
                    fontWeight: FontWeight.bold,
                    color: Color(0xff1a1c20)
                  ),
                ),
              ),
              

              Align(
                alignment: Alignment.bottomLeft,
                child: Text(art.corp,
                  style: TextStyle(
                    fontSize: 20, 
                  ),
                textAlign: TextAlign.left,
                ),
              ),
              
              Align(
                alignment: Alignment.bottomLeft,
                child: Text(art.date,
                style: TextStyle(
                  fontSize: 20, 
                ),
                textAlign: TextAlign.left,
                ),
              ),
              ]
              
            ),
            ])
          )
        ),
      );

  }
}

class BackCard extends StatelessWidget {
  final Article art;
  const BackCard(this.art);
  @override
  Widget build(BuildContext context) {
    return Container(
      child:Card(
            elevation: 5,
            color: Color(0xfff4f4f4),
            shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
            ),
          semanticContainer: true,
          clipBehavior: Clip.antiAliasWithSaveLayer,
            child:Padding(
            padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
            child:
            Column(
              mainAxisSize: MainAxisSize.max,
              children: <Widget>[
              Text(art.title+"\n", style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                  textAlign: TextAlign.center,
                ),
                Expanded(
                    child: ListView(
                      children:art.articleTxt.map((item)=>Text(item+"\n")).toList()
                    )
                ),
              ]
            )
          )
      )
    );
  }
}

