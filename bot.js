
const { TwitterApi } = require("twitter-api-v2");
const fs = require("fs");
const { type } = require("os");
const axios = require('axios');
const cron = require('node-cron');



const tclient = new TwitterApi({

    appKey: "MKniYmFVtiJSnjfugqrcZi3UA",
    appSecret: "RVmblI43zKZztx9mur0jaBb0hkzuojhnPG9YSnXUnPeJxAtUsE",
    accessToken: "1112721153770962944-vvOWdHGjQrVwkwxNA0mPMXzxfq6IQF",
    accessSecret: "g0bS4Kr4vZ4VibQ2vn9kIzmwW3As5urknHSKxROCltI2I"
})



const rwclient = tclient.readWrite ;

 

function tweet(totweet)
{

    
     rwclient.v1.tweet(totweet);

}


//tweet("hello");

function getdataandtweet()
{



axios.get('http://history.muffinlabs.com/date')
    .then(response => {
    const data = response.data.data ? response.data.data : {}
    let tweet2
    if (data.Events && data.Events.length) {
        //tweet the first event in the array                                  
        tweet2 = 'On  '+ response.data.date + ' Year ' + data.Events[0].year + ' - ' + data.Events[0].text  ;
        tweet23 =  ' And On ' + response.data.date + ' Year ' + data.Events[(data.Events.length)-1].year + ' - ' + data.Events[(data.Events.length)-1].text ;
    } else {
        tweet2 = 'And Nothing happened today :)' ;
        tweet23 = 0;
    }
  
 tweet(tweet2);
 if( tweet23 != 0)
 {
 tweet(tweet23);
}
   

}).catch (err => {
    console.error(err)
})

 


}



// ...

// Backup a database at 11:59 PM every day.
var minuit  ; 
var hour ;
 
 hour=Math.floor(Math.random() * 15) + 7;
 minuit = Math.floor(Math.random() * 59);
console.log(hour+' '+minuit);
 
 
console.log(new Date().getMinutes());
console.log(new Date().getHours());
//////////////////////////////////////////
function startloop(hour1,minuit1)
{
while( new Date().getHours() <= hour1  || new Date().getMinutes() <= minuit1)
{                
    console.log(new Date().getMinutes());
    console.log(new Date().getHours());

          if(hour1 == new Date().getHours() && minuit1 == new Date().getMinutes() )
          {
                getdataandtweet();
                break;
                
          } 
          if( hour1 < new Date().getHours() )
          {
                  break;
          }



 



        }

          
         
 
}

function calculatesec(sh,sm)
{
    var secremaining;
     var  hoursremainging  =  sh-(new Date().getHours()) 
     var  minutesremaining =  sm-(new Date().getMinutes())
      
     
             secremaining = ((hoursremainging*60)+minutesremaining)*60;
             return secremaining;
     

}


function scheduletheloop(h,m)
{
   
    var timetoset = calculatesec(h,m);
    timetoset = timetoset -300;
    console.log(timetoset);

setTimeout(() => {
   startloop(h,m);
   console.log("enter the void");
},timetoset*1000);

}
 


///////////////////////////////////////////
 
cron.schedule( '0 6 * * *', function() {
    console.log('---------------------');
    console.log('Running Cron Job');

     hour=Math.floor(Math.random() * 15) + 7;            //  from 7 to 22 or from 7 am to 10 pm or 7:00am to 10:00pm
      minuit = Math.floor(Math.random() * 59);           //  0-60  
       
        console.log(new Date().getMinutes());
        console.log(new Date().getHours());
        
        
 
                
            scheduletheloop(hour,minuit);
                
   

 
 
 
   
  });
  