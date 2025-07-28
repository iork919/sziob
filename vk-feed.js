const TOKEN = "vk1.a.pDIybt3bp8hKme4TNZEF05lusI82KCMAg9u_ZM-qJVhlSNWGLFnuh6IHKY1aqaiLWiuLIO2RZe5LaaQdlVMEpnYSYuYWjehcKgyTqVYDj-GUELYFeBj-UQy-pz8GEgL6FzljHKkZuR_GBi9mKnlD-S2WG8JsZOU18S9N_2-9ZItxt_-LSlSAKRhTsKD9zrfU_20Yl5rBtpQWktmeU81Yew";
const OWNER_ID = -171594852; // ID сообщества с минусом

async function fetchVideos() {
  const url = `https://api.vk.com/method/video.get?owner_id=${OWNER_ID}&access_token=${TOKEN}&v=5.131`;
  const response = await fetch(url);
  const data = await response.json();

  const container = document.getElementById("vk-video-feed");
  if (!container) return;

  container.innerHTML = "";

  if (data.response && data.response.items) {
    data.response.items.forEach((video) => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://vk.com/video_ext.php?oid=${video.owner_id}&id=${video.id}&hash=${video.access_key}`;
      iframe.width = "640";
      iframe.height = "360";
      iframe.allowFullscreen = true;
      iframe.frameBorder = 0;

      const title = document.createElement("h3");
      title.textContent = video.title;

      const date = document.createElement("p");
      date.textContent = new Date(video.date * 1000).toLocaleDateString();

      const block = document.createElement("div");
      block.style.marginBottom = "40px";
      block.appendChild(title);
      block.appendChild(iframe);
      block.appendChild(date);

      container.appendChild(block);
    });
  } else {
    container.innerHTML = "<p>Видео не найдены.</p>";
  }
}

document.addEventListener("DOMContentLoaded", fetchVideos);
