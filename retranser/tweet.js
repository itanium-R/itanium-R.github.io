function tweet(){
    let url = encodeURIComponent("https://itanium-r.github.io/retranser/start.html"); 
    let message = document.getElementById("retranslated").value;
    message += "←";
    message += document.getElementById("translated").value;
    message += "←";
    message += document.getElementById("input").value;
    message += encodeURIComponent( "／再翻やくん" ); //ページタイトル。同上。

    document.open("https://twitter.com/share?url=" +
                  url + "&text=" + 
                  message + "&count=none&lang=ja",
                  "_blank",
                  "toolbar=no,location=no,menubar=no,status=no");
}