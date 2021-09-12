var imagePath = ["./Images/Carcon20190000.jpeg",
"./Images/Carcon20190001.jpeg",
"./Images/Carcon20190002.jpeg",
"./Images/Carcon20190003.jpeg",
"./Images/Carcon20190004.jpeg",
"./Images/Carcon20190005.jpeg",
"./Images/Carcon20190006.jpeg",
"./Images/Carcon20190007.jpeg",
"./Images/Carcon20190008.jpeg",
"./Images/Carcon20190009.jpeg",
"./Images/Carcon20190010.jpeg",
"./Images/Carcon20190011.jpeg",
"./Images/Carcon20190012.jpeg",
"./Images/Carcon20190013.jpeg",
"./Images/Carcon20190014.jpeg",
"./Images/Carcon20190015.jpeg",
"./Images/Carcon20190016.jpeg", ];

for(var i=0;i<imagePath.length;i++){
    var obj = `<div class="col-sm-6 col-md-4">
                    <a class="lightbox" href="${imagePath[i]}">
                        <img src="${imagePath[i]}" alt="Rocks">
                    </a>
                </div>`;
    document.getElementById('imgSpace').innerHTML += obj;
}