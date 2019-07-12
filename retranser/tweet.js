function tweet(){
    let url = "https://itanium-r.github.io/retranser/index.html";
    url += "?fromLang=" + ElmId("fromLang").value;
    url += "&toLang="   + ElmId("toLang").value;
    url += "&input="    + encodeURIComponent(ElmId("input").value);
    url = encodeURIComponent(url);
    let message = ElmId("retranslated").value;
    message += "←";
    message += ElmId("translated").value;
    message += "←";
    message += ElmId("input").value;
    message += encodeURIComponent( "／再翻やくん" ); //ページタイトル。同上。

    document.open("https://twitter.com/share?url=" + url + 
                  "&text=" + message + "&count=none&lang=ja",
                  "_blank",
                  "toolbar=no,location=no,menubar=no,status=no");
}