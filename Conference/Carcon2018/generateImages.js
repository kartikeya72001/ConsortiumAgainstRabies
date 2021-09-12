var imagePath = ["./Images/Carcon20180000.jpeg",
"./Images/Carcon20180001.jpeg",
"./Images/Carcon20180002.jpeg",
"./Images/Carcon20180003.jpeg",
"./Images/Carcon20180004.jpeg",
"./Images/Carcon20180005.jpeg",
"./Images/Carcon20180006.jpeg",
"./Images/Carcon20180007.jpeg",
"./Images/Carcon20180008.jpeg",
"./Images/Carcon20180009.jpeg",
"./Images/Carcon20180010.jpeg",
"./Images/Carcon20180011.jpeg",
"./Images/Carcon20180012.jpeg",
"./Images/Carcon20180013.jpeg",
"./Images/Carcon20180014.jpeg",
"./Images/Carcon20180015.jpeg",
"./Images/Carcon20180016.jpeg",
"./Images/Carcon20180017.jpeg",
"./Images/Carcon20180018.jpeg",
"./Images/Carcon20180019.jpeg",
"./Images/Carcon20180020.jpeg",
"./Images/Carcon20180021.jpeg",
"./Images/Carcon20180022.jpeg",];

for(var i=0;i<imagePath.length;i++){
    var obj = `<div class="col-sm-6 col-md-4">
                    <a class="lightbox" href="${imagePath[i]}">
                        <img src="${imagePath[i]}" alt="Rocks">
                    </a>
                </div>`;
    document.getElementById('imgSpace').innerHTML += obj;
}