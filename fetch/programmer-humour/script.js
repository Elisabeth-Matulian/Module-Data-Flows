const url = "https://xkcd.now.sh/?comic=latest";
const image = document.getElementById("image");

fetch(url)
    .then((response) => response.json())
    .then((data) => image.src = data.img)
    .catch((error) => { 
        console.log(error)
    });