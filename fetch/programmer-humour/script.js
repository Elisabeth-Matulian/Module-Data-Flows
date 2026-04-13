const url = "https://xkcd.now.sh/?comic=latest";
fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));