var imagePath = [["./Images/WorldRabiesDay/20210911_201239.webp", "World Rabies Day"],
["./Images/WorldRabiesDay/20210911_201254-_1_.webp", "World Rabies Day"],
["./Images/WorldRabiesDay/20210911_201254.webp", "World Rabies Day"],
["./Images/WorldRabiesDay/20210911_211246-_1_.webp", "World Rabies Day"],
["./Images/WorldRabiesDay/20210911_211246.webp", "World Rabies Day"],
["./Images/NORC/IMG-20190811-WA0034.jpg", "NORC"],
["./Images/NORC/IMG-20190811-WA0081.jpg", "NORC"],
["./Images/NORC/IMG-20190811-WA0082.jpg", "NORC"],
["./Images/NORC/IMG-20190912-WA0051.jpg", "NORC"],
["./Images/MewatMedicalCollege/IMG-20161025-WA0033.jpg", "Mewat Medical College"],
["./Images/MewatMedicalCollege/IMG-20161025-WA0034.jpg", "Mewat Medical College"],
["./Images/MewatMedicalCollege/IMG-20161026-WA0000.jpg", "Mewat Medical College"],
["./Images/MewatMedicalCollege/IMG-20161026-WA0004.jpg", "Mewat Medical College"],
["./Images/MewatMedicalCollege/IMG-20161026-WA0005.jpg", "Mewat Medical College"],
["./Images/MewatMedicalCollege/IMG_20161025_135244.jpg", "Mewat Medical College"],
["./Images/MewatMedicalCollege/IMG_20161025_135303.jpg", "Mewat Medical College"],
["./Images/MewatMedicalCollege/IMG_20161025_135352.jpg", "Mewat Medical College"],
["./Images/Apricon/IMG-20170711-WA0071.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0072.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0073.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0074.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0075.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0076.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0077.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0078.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0079.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0080.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0081.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0082.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0083.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0084.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0085.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0086.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0087.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0088.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0089.jpg", "Apricon"],
["./Images/Apricon/IMG-20170711-WA0090.jpg", "Apricon"],];

for(var i=0;i<imagePath.length;i++){
    var obj = `<div class="col-md-4 ftco-animate">
                    <a href="${imagePath[i][0]}" class="photography-entry img image-popup d-flex justify-content-center align-items-center" style="background-image: url(${imagePath[i][0]});">
                        <div class="overlay"></div>
                        <div class="text text-center">
                            <h3>${i}</h3>
                            <span class="tag">${imagePath[i][1]}</span>
                        </div>
                    </a>
                </div>`;
    console.log(obj);
    document.getElementById('imgSpace').innerHTML += obj;
}