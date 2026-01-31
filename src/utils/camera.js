export async function takePhoto() {
  if (!navigator.mediaDevices?.getUserMedia) {
    alert('Kamera nije dostupna na ovom uređaju')
    return null
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })

    const video = document.createElement('video')
    video.style.position = 'fixed'
    video.style.top = '-10000px'
    document.body.appendChild(video)

    video.srcObject = stream
    await video.play()

    await new Promise(resolve => setTimeout(resolve, 300))

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480

    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0)

    stream.getTracks().forEach(t => t.stop())
    document.body.removeChild(video)

    return canvas.toDataURL('image/png')
  } catch (err) {
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      alert('Pristup kameri je odbijen. Omogućite kameru u postavkama browsera.')
    } else {
      alert('Greška pri pristupu kameri: ' + err.message)
    }
    return null
  }
}