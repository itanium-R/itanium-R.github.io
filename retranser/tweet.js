function tweet(){
    let url = "https://itanium-r.github.io/retranser/index.html";
    //url += "?input="    + ElmId("input").value;
    url += "?fromLang=" + ElmId("fromLang").value;
    url += "&toLang="   + ElmId("toLang").value;
    url += "&input="    + ElmId("input").value.replace(" ","+");
    //url += "&input="    + ElmId("input").value;
    alert(url);
    url = encodeURIComponent(url);
    alert(url); 
    let message = document.getElementById("retranslated").value;
    message += "←";
    message += document.getElementById("translated").value;
    message += "←";
    message += document.getElementById("input").value;
    message += encodeURIComponent( "／再翻やくん" ); //ページタイトル。同上。

    document.open("https://twitter.com/share?url=" + url + 
                  "&text=" + message + "&count=none&lang=ja",
                  "_blank",
                  "toolbar=no,location=no,menubar=no,status=no");
}