function updateVideoSource(quality) {
    const input = document.getElementById(`input${quality}`);
    const videoUrl = input.value;
    const videoPlayer = document.getElementById(`videoPlayer${quality}`);
    const source = document.getElementById(`videoSource${quality}`);

    source.src = "";
    videoPlayer.pause();

    // Verifica o tipo de arquivo e define o tipo correto
    if (videoUrl.endsWith('.m3u8')) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(videoPlayer);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                videoPlayer.play();
            });
        } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
            source.src = videoUrl;
            videoPlayer.load();
            videoPlayer.play();
        } else {
            alert('Seu navegador não suporta HLS.');
        }
    } else if (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.endsWith('.ogg')) {
        source.src = videoUrl;
        source.type = getVideoType(videoUrl);
        videoPlayer.load();
        videoPlayer.play();
    } else {
        alert('Formato de vídeo não suportado.');
    }
}

function getVideoType(url) {
    if (url.endsWith('.mp4')) {
        return 'video/mp4';
    } else if (url.endsWith('.webm')) {
        return 'video/webm';
    } else if (url.endsWith('.ogg')) {
        return 'video/ogg';
    }
    return '';
}



