(()=>{

    // generate div element
    // arg: style
    const generateButton = (style)=>{
        const button = document.createElement('div');

        for(const element in style){
            button.style[element] = style[element];
        }
        return button;
    };
    
    const control_pad = generateButton({
        backgroundColor: '#999',
        
        position: 'fixed',
        top: '30px',
        right: '30px',
        width: '300px',
        height: '100px',
        zIndex: 1e5,
    });

    const button_left = generateButton({
        width: '35%',
        height: '100%',
        display: 'inline-block'
    });

    const button_middle = generateButton({
        width: '30%',
        height: '100%',
        display: 'inline-block'
    });

    const button_right = generateButton({
        width: '35%',
        height: '100%',
        display: 'inline-block'
    });

    // append div element to html body
    control_pad.appendChild(button_left);
    control_pad.appendChild(button_middle);
    control_pad.appendChild(button_right);
    document.body.appendChild(control_pad);

    // get video elements
    const videos = document.getElementsByTagName('video');

    //
    let isMouseDown = false;
    let mouseX = 0, mouseY = 0;

    control_pad.addEventListener('mousedown', ()=>{
        isMouseDown = true;
    });

    control_pad.addEventListener('mouseup', ()=>{
        isMouseDown = false;
        mouseX = 0;
        mouseY = 0;
    });

    control_pad.addEventListener('mousemove', (event)=>{
        console.info('controllpad moved');
        if(isMouseDown==true){
            console.info('mouse dragging');
            if(mouseX==0 && mouseY==0){
                mouseX = event.clientX;
                mouseY = event.clientY;
                return;
            }
            let dX = event.clientX - mouseX;
            let dY = event.clientY - mouseY;
            mouseX = event.clientX;
            mouseY = event.clientY;
            console.info(`mouseX, mouseY = ${mouseX}, ${mouseY}`);
            console.info(`mouseX, mouseY = ${dX}, ${dY}`);
        }
    });

    button_left.addEventListener('mouseup', ()=>{
        console.info('right button clicked');

        if(isMouseDown==true) return;

        for(const video of videos){
            video.currentTime = Math.max(0, video.currentTime - 10);
        }
    });

    button_middle.addEventListener('mouseup', ()=>{
        console.info('right middle clicked');

        if(isMouseDown==true) return;
        
        // 再生中なら、全てのビデオを停止する
        // 停止中なら、全てのビデオを再生する
        for(const video of videos){
            if(video.paused) video.play();
            else video.pause();
        }

    });

    button_right.addEventListener('click', ()=>{
        console.log('right button clicked');

        if(isMouseDown==true) return;

        for(const video of videos){
            video.currentTime = Math.min(video.duration, video.currentTime + 10);
        }
    });

    console.log('script end');
})();