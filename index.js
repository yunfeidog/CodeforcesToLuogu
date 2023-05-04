// ==UserScript==
// @name         Codeforces与洛谷题目链接跳转
// @namespace    https://github.com/yunfeidog
// @version      1.0
// @description  try to take over the world!
// @author       dogyunfei
// @match        https://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(()=>{
    if(window.location.host==="codeforces.com"){
        let str=window.location.href
        let bigBox=document.querySelector("#sidebar");
        let myButton=document.createElement('button');
        myButton.textContent="点击我去洛谷";
        bigBox.appendChild(myButton);

        let problemId=getProblemId(str);
        let problemChar=getProblemChar(str);
        console.log(problemId);
        console.log(problemChar);
        //给按钮添加点击事件
        myButton.addEventListener('click',()=>{
            location.assign("https://www.luogu.com.cn/problem/CF"+problemId+problemChar);
        })
    }else{
        let str=window.location.href
        // 找到最后一个 / 的位置
        var lastSlashIndex = str.lastIndexOf("/");
        // 从 URL 中截取出 ID 和最后的字符
        var idStr = str.slice(lastSlashIndex + 1, -1); // "CF1714D"
        let idNum =''+ parseInt(idStr.slice(2, 6)); // 1714
        let lastChar ='' +idStr.charAt(idStr.length - 1); // "D"
        var url='https://codeforces.com/contest/'+idNum+"/problem/"+lastChar;
        console.log(url);
        window.addEventListener('load', ()=>{
            let mybutton=document.createElement('button');
            mybutton.textContent="去打CF";
            mybutton.addEventListener('click',()=>{location.assign(url)});
            // 在这里编写需要在页面全部加载完毕后执行的操作
            let cf=document.querySelector("#app > div.main-container > main > div > section.side > div:nth-child(1) > div > div:nth-child(1) > span:nth-child(2)");
            let bigBox=document.querySelector("#app > div.main-container > div.wrapper.wrapped.lfe-body.header-layout.normal > div.header > div.functional > div.operation");
            console.log(cf);
            cf.addEventListener('click',()=>{location.assign(url)});
            bigBox.appendChild(mybutton)
        });
    }
})();


function getProblemId(str){
    let pos = str.indexOf("contest/") + "contest/".length;
    let contestNum = "";
    while (str[pos] >= '0' && str[pos] <= '9') {
        contestNum += str[pos];
        pos++;
    }
    return contestNum;
}

function getProblemChar(str){
    let pos = str.indexOf("problem/") + "problem/".length;
    let problemLetter = str.substr(pos);
    return problemLetter;
}
