document.addEventListener('keypress', (event) => {
    //let name = event.key;
    let code = event.code;

    audio.play()

    currentScene.keyCodesInQue.push(code);
})