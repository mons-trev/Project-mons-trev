var express= require('express');
const { contentType } = require('express/lib/response');
const { default: request } = require('sync-request');

var mysql = require('sync-mysql');

var db = new mysql({
  host     : 'us-cdbr-east-05.cleardb.net',
  user     : 'b7a965a82fe8df',
  password : 'bd534b63',
  database : 'heroku_3e0f2bb1afe4250'
});


var jongsung_flag=true;
var app= express();

function kortoeng(name){
var arrChoSung= [
  0x3131, 0x3132, 0x3134, 0x3137, 0x3138,
        0x3139, 0x3141, 0x3142, 0x3143, 0x3145, 0x3146, 0x3147, 0x3148,
        0x3149, 0x314a, 0x314b, 0x314c, 0x314d, 0x314e
];
var arrJungSung= [
  0x314f, 0x3150, 0x3151, 0x3152,
        0x3153, 0x3154, 0x3155, 0x3156, 0x3157, 0x3158, 0x3159, 0x315a,
        0x315b, 0x315c, 0x315d, 0x315e, 0x315f, 0x3160, 0x3161, 0x3162,
        0x3163
];
var arrJongSung= [
  0x0000, 0x3131, 0x3132, 0x3133,
        0x3134, 0x3135, 0x3136, 0x3137, 0x3139, 0x313a, 0x313b, 0x313c,
        0x313d, 0x313e, 0x313f, 0x3140, 0x3141, 0x3142, 0x3144, 0x3145,
        0x3146, 0x3147, 0x3148, 0x314a, 0x314b, 0x314c, 0x314d, 0x314e
];

var arrChoSungEng= [
  "r", "R", "s", "e", "E",
      "f", "a", "q", "Q", "t", "T", "d", "w",
      "W", "c", "z", "x", "v", "g"
];

var arrJungSungEng= [
  "k", "o", "i", "O",
      "j", "p", "u", "P", "h", "hk", "ho", "hl",
      "y", "n", "nj", "np", "nl", "b", "m", "ml",
      "l"
];

var arrJongSungEng= [
  "", "r", "R", "rt",
      "s", "sw", "sg", "e", "f", "fr", "fa", "fq",
      "ft", "fx", "fv", "fg", "a", "q", "qt", "t",
      "T", "d", "w", "c", "z", "x", "v", "g"
];

var arrSingleJaumEng= [
  "r", "R", "rt",
      "s", "sw", "sg", "e","E" ,"f", "fr", "fa", "fq",
      "ft", "fx", "fv", "fg", "a", "q","Q", "qt", "t",
      "T", "d", "w", "W", "c", "z", "x", "v", "g"
];
//charCodeAt, fromCharCode
var word= name;
var result= "";
var resultEng= "";
var i=0;


for (i = 0; i < word.length; i++) {

        /*  한글자씩 읽어들인다. */
        var chars = String.fromCharCode((word.charAt(i).charCodeAt(0) - 0xAC00));
        //console.log(chars);//네모로 출력
        //console.log(chars.charCodeAt(0));// 숫자로 출
        if (chars.charCodeAt(0) >= 0 && chars.charCodeAt(0) <= 11172) {
          /* A. 자음과 모음이 합쳐진 글자인경우 */

          /* A-1. 초/중/종성 분리 */
          var chosung 	= parseInt(chars.charCodeAt(0) / (21 * 28));
          var jungsung 	= parseInt(chars.charCodeAt(0) % (21 * 28) / 28);
          var jongsung 	= parseInt(chars.charCodeAt(0) % (21 * 28) % 28);
          if(jongsung == 0){
            jongsung_flag=false;
          }
          /* 알파벳으로 */
          resultEng = resultEng + arrChoSungEng[chosung] + arrJungSungEng[jungsung];
          if (jongsung != 0x0000) {
            /* A-3. 종성이 존재할경우 result에 담는다 */
           
            resultEng =  resultEng + arrJongSungEng[jongsung];
          }

        } else {
          /* B. 한글이 아니거나 자음만 있을경우 */

          /* 자음분리 */
          result = result + String.fromCharCode(chars.charCodeAt(0) + 0xAC00);

          /* 알파벳으로 */
          if( chars.charCodeAt(0)>=34097 && chars.charCodeAt(0)<=34126){
            /* 단일자음인 경우 */
            var jaum 	= (chars.charCodeAt(0)-34097);
            resultEng = resultEng + arrSingleJaumEng[jaum];
          } else if( chars.charCodeAt(0)>=34127 && chars.charCodeAt(0) <=34147) {
            /* 단일모음인 경우 */
            var moum 	= (chars.charCodeAt(0)-34127);
            resultEng = resultEng + arrJungSungEng[moum];
          } else {
            /* 알파벳인 경우 */
            resultEng = resultEng + String.fromCharCode(chars.charCodeAt(0) + 0xAC00);//quswldms
          }
        }

      }
      return resultEng;
    }

function kortoroman(name) {
      var arr= [];// 로마자 변환 이름 full로 저장 배열 선언
      var client_id = 'R7WtlpIf1Lx0BOA7Fq34';//개발자센터에서 발급받은 Client ID
      var client_secret = 'EVQJo3CFbK'; //개발자센터에서 발급받은 Client Secret
      var api_url = 'https://openapi.naver.com/v1/krdict/romanization?query=' + encodeURI(name);
      var request = require('sync-request');
      var options = {
         url: api_url,
         headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
      };
      
      var res = request('GET', api_url, {//동기 사용
      headers: {'X-Naver-Client-Id':client_id, 
     'X-Naver-Client-Secret': client_secret}
      }  
    );
      //console.log(res);

    
   var arr=[];
   var i;
   var firstnamearr=[];//번역해서 나온 이름 배열
   var lastnamearr= [];//번역해서 나온 성 배열
   var return_full= new Array(2);
   for(i=0; i<JSON.parse(res.getBody('utf8')).aResult[0].aItems.length;i++){
      var result=JSON.parse(res.getBody('utf8')).aResult[0].aItems[i].name.split(' ');
      firstnamearr[i]=result[1].toLowerCase();
      lastnamearr[i]=result[0].toLowerCase();
   }

   var set= new Set(firstnamearr);//중복제거
   var uniquefirstarr= [...set];
   set.clear;
   set=new Set(lastnamearr);//중복제거
   var uniquelastarr= [...set];
   set.clear;
   return_full[0]=uniquelastarr;//성 저장
   return_full[1]=uniquefirstarr;//이름 저장
    return return_full;
}
var langarr= ['ko','en','fr','it','zh-CN','en'];


function papago(options) {
  var api_url = "https://openapi.naver.com/v1/papago/n2mt";
  var request = require("sync-request");
    var res = request("POST", api_url, options);
  return JSON.parse(res.getBody('utf8')).message.result.translatedText;
}

app.get('/', function(req, res){

  
 
var total= db.query(`SELECT * FROM insta`)[0].total;

  res.send(`
  <!doctype html>
  <html>
  <head>
    <title>instagram name</title>
    <meta charset="utf-8">
  
  
    <link href="https://fonts.googleapis.com/css?family=Dancing+Script" rel="stylesheet">
    <head>
      <style>
          body {
              background: #FC466B; 
              background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B);  
              background: linear-gradient(to right, #3F5EFB, #FC466B); 
    }
   /* centering the insta logo */  
   body {  
     display: flex;  
     justify-content: center;  
     align-items: center;  
     width: 100vw;  
     height: 100vh;  
     overflow: hidden;
     text-align: center;
      
   }  
   .innerbox {  
     width: 120px;  
     height: 120px;  
     border: 10px solid #fff;  
     border-radius: 32px;  
     display: grid;  
     place-items: center;  
     position: relative;  
     box-shadow: 0.2 0.2 0.2 0.2 rgba(0, 0, 0, 0.2);
   }  
   .innerbox::before {  
     content: '';  
     width: 45px;  
     height: 45px;  
     border: 10px solid #fff;  
     border-radius: 50%;  
     background: transparent;  
     position: absolute;  
     box-shadow: 0.2 0.2 0.2 0.2 rgba(0, 0, 0, 0.2);
  
   }  
   /* top right circle of insta */  
   .innerbox::after {  
     content: '';  
     width: 10px;  
     height: 10px;  
     border: 2px solid #fff;  
     border-radius: 50%;  
     background: #fff;  
     position: absolute;  
     top: 8px;  
     right: 10px;  
   }  
  
  
   
   #text {
      font-family: 'Dancing Script';
      font-size: 2.3em;
      color: rgb(228, 224, 224);
      font-weight: 30;
      text-shadow: 1px 1px 1px rgba(100, 30, 30, 0.891);
   }
   .insta {
     position: absolute;
     transform: translate(-50% -60px, -50%);
     bottom: 60%;
   }
   #name{
     position:absolute;
     bottom: 20%;
     margin: 19px;
   }
   input[type="text"]{ 
     height: auto; /* 높이 초기화 */ 
     line-height: normal; /* line-height 초기화 */ 
     padding: 1.3em .9em; /* 여백 설정 */ 
     border: 1px solid #999; border-radius: 0; /* iSO 둥근모서리 제거 */ 
     /*outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */ 
     -webkit-appearance: none; /* 브라우저별 기본 스타일링 제거 */ 
     -moz-appearance: none; 
     appearance: none;
    border-radius: 7px;
    background-color:rgba(0, 0, 0, 0.2);
    color: white;
    border-color: #5d5241;
  
    }
    input::placeholder {
      color: rgb(174, 171, 171);
    }
    /* CSS */
  #submit {
    background-color: #fbeee0;
    border: 2px solid #422800;
    border-radius: 40px;
    box-shadow: #422800 4px 4px 0 0;
    color: #422800;
    cursor: pointer;
    display: inline-block;
    font-weight: 600;
    font-size: 18px;
    padding: 0 5px;
    line-height: 50px;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    
  }
  #visit {
    color: white; 
    text-shadow: 1.5px 1.5px 1.2px rgba(30, 30, 90, 1);
    font-weight: 20;
    font-family: 'Dancing Script';
    color: rgb(228, 224, 224);
  }
  #submit:hover {
    background-color: #fff;
  }
  
  #submit:active {
    box-shadow: #422800 2px 2px 0 0;
    transform: translate(2px, 2px);
  }
  
  @media (min-width: 700px) {
    #submit {
      min-width: 120px;
      padding: 0 25px;
    }
  }
    .visited {
      position: absolute;
    }
    #visit{
      position: absolute;
      transform: translate(-49% , 350%);
    }
  
      </style>
    </head>
    <body>
      <div class="insta">  
          <div class="innerbox" style="   box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);
          ">  
          </div>  
        </div>
        <div class="write"><h3 id="text">get your own instagram ID</h3></div>
        
        
        <div id="name">
          <form action="final" name="nameform" method="get">
            <input type="text" name="name" placeholder="한글 이름">
            <input type="text" name="birth" placeholder="생일 6자리 ex)000927">
            <input type="submit" value="submit" id="submit" style="width: 70px">
          </form>
        </div>
        
        <div class="visited">
       <h2 id= "visit" > ${total} visited </h2> 
        </div>
      
    </body>
    </html>
  `);
});


app.get('/final',function(req,res){
    
    
    db.query('UPDATE insta SET total=total+1 WHERE id=1');

    var total2= db.query(`SELECT * FROM insta`)[0].total;
    
    
    var korname= req.query.name;//"변지은"
    var birth= req.query.birth;//"000927"
    var b_year= birth.slice(0,2);//"00"
    var b_month= birth.slice(2,4);//"09"
    var b_date= birth.slice(4,6);//"27"
    
    
    //use_name1=b_month+"._."+name+"._."+b_date;
   
    var keyboardeng=kortoeng(korname);//quswldms
   
    /////////////////////////////////////////////////////////////////   
    var romanlist= kortoroman(korname);
    var firstnamearr= romanlist[1];
    var lastnamearr= romanlist[0];
    var fullromanname= romanlist[0][0]+romanlist[1][0];
    var fullromanname2= romanlist[1][0]+romanlist[0][0];
    var firstnamereverse= firstnamearr[0].split("").reverse().join("");
    //console.log(fullromanname);//return_full[0] : 성배열, return_full[1] : 이름배열
    var k_e;
    //var e_f;
    var k_f;
    var k_j;
    var j_e;
    var k_ch;
    var ch_e; 
    var k_es;
    var k_e_real;
    //var e_f_real;
    var k_f_real;
    var j_e_real;  
    var ch_e_real; 
    var k_es_real;
   function optionchange(so,tar,query){
     var api_url = "https://openapi.naver.com/v1/papago/n2mt";
     var client_id = '57rMHCFwfiBpTBQrZjFc';
     var client_secret = 'qdpmoarPox';
     var options = {
       url: api_url,
       body: `source=${so}&target=${tar}&text=${query}`,//form 말고 body, header에 Content-Type 추가
       headers: {
         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
         "X-Naver-Client-Id": client_id,
         "X-Naver-Client-Secret": client_secret,
       },
     };
     return options;
   }
   var namefortrans;
     if(korname.length==3){
       namefortrans=korname.substring(1,3);
     }
     else if(korname.length==4){
       namefortrans=korname.substring(2,4);
     }
     else{
       namefortrans=korname.substring(1,korname.length);
     }
     var trans_list=[];
 
     function filter(t){
       t=t.toLowerCase();
       var sentence_flag=false;
     
       for(var i=0; i<t.length; i++){
         
         if(t.charAt(i)===" "){
           sentence_flag=true;
         }
       }
       if(sentence_flag==true){
         t=null;
         return t;
       }
       else{
         t= t.replace(/[^a-z]/g, "_");
         trans_list.push(t);
         return t;
       }
     };
 
     options= optionchange("ko","en", namefortrans);
     k_e=papago(options);
     k_e_real=filter(k_e);
     
     //options= optionchange("en","fr", k_e);
     //e_f=papago(options);
     //e_f_real=filter(e_f);
 
     options= optionchange("ko","fr", namefortrans);
     k_f=papago(options);
     k_f_real=filter(k_f);
 
     options= optionchange("ko","ja", namefortrans);
     k_j=papago(options);
     //k_j_real=filter(k_j);
 
     options= optionchange("ja","en", k_j);
     j_e=papago(options);
     j_e_real=filter(j_e);
 
     options= optionchange("ko","zh-CN", namefortrans);
     k_ch=papago(options);
 
     options= optionchange("zh-CN","en", k_ch);
     ch_e=papago(options);
     ch_e_real=filter(ch_e);
 
     options= optionchange("ko","es", namefortrans);
     k_es=papago(options);
     k_es_real=filter(k_es);
     
 
     for(var i=0; i<trans_list.length; i++){
       trans_list[i]="_"+trans_list[i]+"_"+firstnamearr[0].charAt(firstnamearr[0].length-2)+firstnamearr[0].charAt(firstnamearr[0].length-1);
     }

     for(var i=0; i<firstnamearr.length; i++){
      if(firstnamearr[i].length<4){
       while(firstnamearr[i].length<4){
         firstnamearr[i]=firstnamearr[i]+firstnamearr[i].charAt(firstnamearr[i].length-1);
       }
         firstnamearr[i]+="_.";
      }
    }
 
   
    var except_vowel="";
    for(var i=0; i<fullromanname.length; i++){
      var a= fullromanname[i];
      switch(a){
        case 'a':
          break;
        case 'e':
          break;
        case 'i':
          break;
        case 'o':
          break;
        case 'u':
          break;
        default:
          except_vowel=except_vowel+fullromanname[i];
          break;
      }
    }
    var except_vowel_lastname="";
    for(var i=0; i<lastnamearr[0].length; i++){
      var a= lastnamearr[0].charAt(i);
      switch(a){
        case 'a':
          break;
        case 'e':
          break;
        case 'i':
          break;
        case 'o':
          break;
        case 'u':
          break;
        default:
          except_vowel_lastname=except_vowel_lastname+lastnamearr[0].charAt(i);
          break;
      }
    }
    var except_vowel_firstname="";
    for(var i=0; i<firstnamearr[0].length; i++){
      var a= firstnamearr[0].charAt(i);
      switch(a){
        case 'a':
          break;
        case 'e':
          break;
        case 'i':
          break;
        case 'o':
          break;
        case 'u':
          break;
        case 'y':
          break;
        default:
          except_vowel_firstname=except_vowel_firstname+firstnamearr[0].charAt(i);
          break;
      }
      if(except_vowel_firstname.length<4){

      }
    }
    function insert_num_func(){
      var insert_num= firstnamearr[0];
      var i= [Math.floor(fullromanname.length/3), Math.floor(fullromanname.length/2)];//바꿀 문자열 인덱스
      var charat= [fullromanname.charAt(i[0]), fullromanname.charAt(i[1])];
      for(var j=0;j<i.length;j++){
        switch(charat[j]){
          case 'a':
          case 'k':
          case 'u':
            insert_num=insert_num.substring(0,i[j])+"1"+insert_num.substring(i[j]+1,insert_num.length);
            break;
            
          case 'b':
          case 'l':
          case 'v':
            insert_num=insert_num.substring(0,i[j])+"2"+insert_num.substring(i[j]+1,insert_num.length);
            break;

          case 'c':
          case 'm':
          case 'w':
            insert_num=insert_num.substring(0,i[j])+"3"+insert_num.substring(i[j]+1,insert_num.length);
            break;

          case 'd':
          case 'n':
          case 'x':
            insert_num=insert_num.substring(0,i[j])+"4"+insert_num.substring(i[j]+1,insert_num.length);
            break;

          case 'e':
          case 'o':
          case 'y':
            insert_num=insert_num.substring(0,i[j])+"5"+insert_num.substring(i[j]+1,insert_num.length);
             break;

          case 'f':
          case 'p':
          case 'z':
            insert_num=insert_num.substring(0,i[j])+"6"+insert_num.substring(i[j]+1,insert_num.length);
            break;

          case 'g':
          case 'q':
            insert_num=insert_num.substring(0,i[j])+"7"+insert_num.substring(i[j]+1,insert_num.length);
            break;

          case 'h':
          case 'r':
            insert_num=insert_num.substring(0,i[j])+"8"+insert_num.substring(i[j]+1,insert_num.length);
            break;

          case 'i':
          case 'x':
            insert_num=insert_num.substring(0,i[j])+"9"+insert_num.substring(i[j]+1,insert_num.length);
            break;

          case 'j':
          case 't':
            insert_num=insert_num.substring(0,i[j])+"0"+insert_num.substring(i[j]+1,insert_num.length);
            break;

        }
      }
      return insert_num;
    }
    var insert_num=insert_num_func();

    function convert_xy_fun(){
      return firstnamearr[0].substring(0,1)+"xx"+firstnamearr[0].substring(3,firstnamearr[0].length);
    }
    var convert_xy= convert_xy_fun();
    var firstname_ing=[];
    for(var i=0; i<firstnamearr.length; i++){
      
      if(jongsung_flag==true){
      if(i<firstnamearr.length/3){
      firstname_ing[i]=firstnamearr[i]+"ing";
      }
      else if(i<firstnamearr.length/2){
        firstname_ing[i]=firstnamearr[i]+"._ing";
      }
      else{
        firstname_ing[i]=firstnamearr[i]+"_ing";
      }
    }
      else if(jongsung_flag==false){
        if(i<firstnamearr.length/3){
          firstname_ing[i]=firstnamearr[i]+firstnamearr[i].charAt(firstnamearr[i].length-1)+firstnamearr[i].charAt(firstnamearr[i].length-1);
          }
          else if(i<firstnamearr.length/2){
            firstname_ing[i]=firstnamearr[i]+"._"+firstnamearr[i].charAt(firstnamearr[i].length-1);
          }
          else{
            firstname_ing[i]=firstnamearr[i]+"_"+firstnamearr[i].charAt(firstnamearr[i].length-1);
          }
      }
    }
    
    function keyboardkwang_fun(){
      var num= (parseInt)(Math.random()*3)+4;
      var random_name= "";
      for(var j=0; j<num; j++){
        var a= (parseInt)(Math.random()*26)+97;
        var c= String.fromCharCode(a);
      random_name=random_name+c;
      }
      return random_name;
    }

    var random_name=keyboardkwang_fun();
    var random_name2=keyboardkwang_fun();
    var random_name3=keyboardkwang_fun();
    var random_name4=keyboardkwang_fun();
    var random_name5=keyboardkwang_fun();
    random_name3=random_name3.substring(0,Math.floor(random_name3.length/3))+"_"+random_name3.substring(Math.floor(random_name3.length/3),random_name3.length);
    random_name4=random_name4.substring(0,Math.floor(random_name4.length/2))+"__"+random_name4.substring(Math.floor(random_name4.length/3),random_name4.length);
    random_name5=random_name5.substring(0,Math.floor(random_name5.length/4))+"."+random_name5.substring(Math.floor(random_name5.length/4),random_name5.length);


    var name_birth= [];
    var keyboardtyping= [];
    var modify_name= [];
    var trans_name= [];
    var reverse_name= [];
    var keyboardkwang= [];

    var list= {
      name_birth: [
        fullromanname, fullromanname2, lastnamearr[0]+firstnamearr[0]+"_", lastnamearr[0]+"_"+firstnamearr[0], lastnamearr[0]+"_."+firstnamearr[0],
        lastnamearr[0].charAt(0)+firstnamearr[0], firstnamearr[0]+"."+lastnamearr[0].charAt(0), firstnamearr[0]+"_"+lastnamearr[0].charAt(0),
        fullromanname+b_month+b_date, firstnamearr[0]+b_month+b_date, firstnamearr[0]+b_year, firstnamearr[0]+b_month
      ],
      keyboardtyping: [
        keyboardeng, keyboardeng+b_month+b_date, keyboardeng+b_year, "_"+keyboardeng+b_month
      ],
      modify_name: [//배열 유의
        firstnamearr, firstname_ing, except_vowel, except_vowel_lastname+"_"+except_vowel_firstname, "_"+except_vowel_firstname+except_vowel_firstname,
        except_vowel_firstname+"_"+except_vowel_lastname, insert_num, convert_xy
      ],
      trans_name: [
        trans_list
      ],
      reverse_name: [
        firstnamereverse, firstnamereverse+"_", firstnamereverse+b_month, firstnamereverse+b_year
      ],
      keyboardkwang: [
        random_name, random_name2, random_name3, random_name4, random_name5
      ]
    };
    /*
    <input id=${id} value=${object[i]}>
    <button onclick="copy_to_clipboard()">클립보드로 복사</button>
    */
    
    function list_print(cl, object){
        var elements= '<ul style="list-style: none; padding-left: 0;">';
        var i=0;
        while(i<object.length){

            elements+=`<li><div id="box1"><input id= ${cl} class= "input" value=${object[i]} readonly><input class ="button"type="button" value= "c" onclick="copy_to_clipboard(event)"></div></li><br>`;
            i++;        
        }
        elements+='</ul>'
        return elements;
      }
      
      function list_print_include_arr(cl, object){
        var elements= '<ul style="list-style: none; padding-left: 0;">';
        var i=0;
        while(i<object.length){
          if(Array.isArray(object[i])){
            for(var j=0;j<object[i].length; j++){
              elements+= `<li><div id="box1"><input class= "input" id= ${cl} value=${object[i][j]} readonly><input class ="button" type="button" value= "c" onclick="copy_to_clipboard(event)"></div></li><br>`
            }
          }
          else{
            elements+=`<li><div id="box1"><input id= ${cl} class= "input" value=${object[i]} readonly><input class ="button" type="button" value= "c" 
            onclick="copy_to_clipboard(event)"></div></li><br>`;
            //<button onclick="copy_to_clipboard(event)">c</button>


          }         
          i++;
        }
        elements+='</ul>'
        return elements;
      }
      function getid(event){
        console.log(event);
      }
      
      var template=`
      <!doctype html>
      <html style="color: white;">
        <head>
          <link href="https://fonts.googleapis.com/css?family=Dancing+Script" rel="stylesheet">
          
          <style>
          
            nav {
                border-bottom: 1px solid rgba(226, 233, 231, 0.43);
                padding-top: 10px;
                text-align: center;
                font-family: sans-serif;
                font-weight=30;
            }  
           .container {
               display: flex;
               margin: 60px;
           }
           
            #columns{
              column-count:2;
              column-gap: 50px;
              padding:20px; 
              text-align: center;
              
            }
            #columns figure{
              display: inline-block;
              border:1px solid rgba(226, 233, 231, 0.43);
              margin:0;
              margin-bottom: 15px;
              padding:10px;
              box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
              text-align: center;
              width: 70%;
            }
            
            #columns figure figcaption{
              border-top:1px solid rgba(226, 233, 231, 0.43);
              padding:10px;
              margin-top:11px;
              text-align: center;
              font-size:0.8em;
            }
            .input {
              border: none;
              text-align: center;
              outline: none;
              background: none;
              vertical-align: center;
              color: white;
              
            }
            
            .button {
              background-color: #fbeee0;
              border: 2px solid #422800;
              border-radius: 25px;
              height: 30px;
              width: 27px;
              box-shadow: #422800 4px 4px 0 0;
              color: #422800;
              cursor: pointer;
              display: inline-block;
              font-weight: 600;
              font-size: 15px;
              padding: 0 18px;
              line-height: 15px;
              text-align: center;
              text-decoration: none;
              user-select: none;
              -webkit-user-select: none;
              touch-action: manipulation;
            }
            
            .button:hover {
              background-color: #fff;
            }
            
            .button:active {
              box-shadow: #422800 2px 2px 0 0;
              transform: translate(2px, 2px);
            }
            
            @media (min-width: 700px) {
              .button {
                min-width: 50px;
                min-height: 20px;
                padding: 0 5px;
              }
            }
            #box1 {
              position: relative;
            }

            
          </style>
          <script>

         
          function copy_to_clipboard(event)
           {

            console.log(event.target.previousElementSibling);
            var copyText = event.target.previousElementSibling;
            copyText.select();
            
            copyText.setSelectionRange(0, 99999);
            document.execCommand("Copy");
            alert('복사되었습니다, 감사합니다.');
            var eventid=event.target.previousElementSibling.id;
            console.log(eventid);
            }
      
          
          </script>
        </head>
        <body style="background: #FC466B; 
        background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B); 
        background: linear-gradient(to right, #3F5EFB, #FC466B); 
        
        ">
            <nav style="font-size: 4em; text-shadow: 2px 2px 2px rgba(3, 3, 3, 0.891);">Get Your ID
              <h6 style="font-size: 0.5em; font-family: Gulim; margin: 40px;">c 버튼을 누르면 복사됩니다</h6>
          </nav>
          <div id="columns">
            <figure style="background: rgba(226, 233, 231, 0.06)">
              <figcaption style="font-size:1.5em; background: rgba(226, 233, 231, 0.18);" >basic</figcaption>
              <figcaption>${list_print(1, list.name_birth)}</figcaption>
            </figure>
       
            <figure style="background: rgba(226, 233, 231, 0.06)">
            <figcaption style="font-size:1.5em; background: rgba(226, 233, 231, 0.18);">typing</figcaption>
              <figcaption>${list_print(2, list.keyboardtyping)}</figcaption>
            </figure>
       
            <figure style="background: rgba(226, 233, 231, 0.06)">
              <figcaption style="font-size:1.5em; background: rgba(226, 233, 231, 0.18);">transform</figcaption>
              
              <figcaption>${list_print_include_arr(3, list.modify_name)}</figcaption>
            </figure>
       
            <figure style="background: rgba(226, 233, 231, 0.06)">
            <figcaption style="font-size:1.5em; background: rgba(226, 233, 231, 0.18);">translate</figcaption>
              <figcaption>${list_print_include_arr(4, list.trans_name)}</figcaption>
            </figure>
       
            <figure style="background: rgba(226, 233, 231, 0.06)">
              <figcaption style="font-size:1.5em; background: rgba(226, 233, 231, 0.18);">reverse</figcaption>
              <figcaption>${list_print(5, list.reverse_name)}</figcaption>
            </figure>
       
            <figure style="background: rgba(226, 233, 231, 0.06)">
              <figcaption style="font-size:1.5em; background: rgba(226, 233, 231, 0.18);">keyboard kwangg</figcaption>
              <figcaption>${list_print(6, list.keyboardkwang)}</figcaption>
            </figure>   
       
          </div>
           
           
        </body>
      </html>
    `
    res.send(template);
    

  });
  
   
    
  app.listen(process.env.PORT || 3000, function(){
    console.log('Conneted 3000 port!');
});

/*    콜백 대신 sync-request사용.. 주석처리
//////////////////////////////////////////////////////////////////////////////////한국어,영어, 프랑스어
   function asynctest(fn){
    request.post(options, function(error, response, body) {//한국어에서 영어로
    //console.log(body);//callback으로 맨 마지막 호출
     k_e=JSON.parse(body).message.result.translatedText;
     console.log(k_e);
     ///////////
     options2= {
      method:"POST",
      url: api_url,
      form: {'source':'en', 'target':'fr', 'text':k_e},
      headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
     request.post(options2, function(error, response, body) {//영어에서 프랑스어로
      if(!error&&response.statusCode==200){
        //console.log(body); 
        e_f= JSON.parse(body).message.result.translatedText;
        console.log(e_f);
        
      }
      fn(k_e, e_f);
    
      });
    });
  };
  ///////////////////////////////////////////////////한국어 프랑스어 이탈리아어
  
  function asynctest2(fn){
    request.post(options, function(error, response, body) {//한국어에서 영어로
    //console.log(body);//callback으로 맨 마지막 호출
    console.log(body);
     k_f=JSON.parse(body).message.result.translatedText;
     console.log(k_f);
     ///////////
     options2= {
      method:"POST",
      url: api_url,
      form: {'source':'fr', 'target':'it', 'text':k_f},
      headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
     request.post(options2, function(error, response, body) {//영어에서 프랑스어로
      //if(!error&&response.statusCode==200){
        //console.log(body); 
        f_i= JSON.parse(body).message.result.translatedText;
        console.log(f_i);
        
      //}
      fn(k_f, f_i);
    
      });
    });
  };










  function copy_to_clipboard(event) {

            console.log(event.target.previousElementSibling);
            var copyText = event.target.previousElementSibling;
            copyText.select();
            
            copyText.setSelectionRange(0, 99999);
            document.execCommand("Copy");
            console.log('복사되었습니다, 감사합니다.');
            var eventid=event.target.previousElementSibling.id;
            console.log(eventid);

            var xhr = new XMLHttpRequest(); 

            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
              if (xhr.status === 200) {
              console.log("작업내용 작성");
            }
          }
        }
      }
  */





