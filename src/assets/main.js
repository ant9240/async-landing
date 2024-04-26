const API = 'https://youtube138.p.rapidapi.com/channel/videos/?id=UC55-mxUj5Nj3niXFReG44OQ&filter=videos_latest&hl=en&gl=US';

const content = document.getElementById('content');

const options = {
    method: 'GET',
	headers: {
        'X-RapidAPI-Key': '7dbd182706msh630c29308d00aa5p18a517jsn7e891c82103a',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data
}

(async () => {
    try {
        const videos = await fetchData(API);
        let htmlView = '';
        for (let i = 0; i < 12; i++) {
            let element = videos.contents[i];
            const img = element.video.thumbnails[3].url;
            const title = element.video.title;
            let view = `
            <div class="group relative">
              <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${img}" alt="${title}" class="w-full">
              </div>
              <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  ${title}
                </h3>
              </div>
            </div>
            `;
            htmlView += view
        }
        content.innerHTML = htmlView
    } catch (error) {
        console.error("Error: ",error);
    }
})();
