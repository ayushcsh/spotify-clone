console.log("lets write some js ");
async function getsongs(){
    let a = await fetch("http://127.0.0.1:5500/songs/liked");
    let response = await a.text();
    
    let div = document.createElement("div");
    div.innerHTML = response;
    
    // Select all <a> tags that point to mp3 files
    let links = div.querySelectorAll('a[href$=".mp3"]');
    
    // Extract hrefs and names
    let songs = Array.from(links).map(link => ({
        name: link.textContent.trim(),
        url: link.href
    }));
    
    return songs; 
}


async function main(){
    let songs = await getsongs()
    console.log(songs);

    var audio  = new Audio(songs[0].url);
    audio.play();
}

main()

document.querySelectorAll(".playlist-item").forEach(item => {
    item.addEventListener("click", async () => {
        const folder = item.getAttribute("data-folder");
        songs = await getSongs(folder); // this updates the right side!
        playMusic(songs[0]); // autoplay first song
    });
});