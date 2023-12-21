async function fetchNewsData() {
  const promises = magazines.map((x) => {
    return fetch(`https://api.rss2json.com/v1/api.json?rss_url=${x}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        return myJson;
      });
  });
  const results = await Promise.all(promises);
  return results;
}

function addAccordionDOM(data, id) {
  const { feed, items } = data;
  let index = "collapse_" + id;
  let accordion = document.getElementById("accordionExample");
  accordion.innerHTML += `
    <div class="accordion-item">
        <h2 class="accordion-header" id=${"heading_" + index}>
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target=#${index} aria-expanded="false" aria-controls=${index}>
            ${feed.title}
        </button>
        </h2>
        <div id=${index} class="accordion-collapse collapse" aria-labelledby=${
    "heading_" + index
  } data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-indicators">
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  </div>
                  <div class="carousel-inner">
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                  </button>
              </div>
            </div>
        </div>
    </div>
    `;
    
  let buttonsDiv = document.querySelector(`#${index} .accordion-body #carouselExampleIndicators .carousel-indicators`);

  let itemsDiv = document.querySelector(`#${index} .accordion-body #carouselExampleIndicators .carousel-inner`);
    items.forEach((item,idx) => {
        let buttonid = idx+1
        buttonsDiv.innerHTML += `
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to=${buttonid} aria-label="Slide ${buttonid}"></button>
        `
        let div = document.createElement('div')
        div.className = idx === 0 ? 'carousel-item active' : 'carousel-item'
        div.innerHTML = `
          <img src=${item['enclosure']['link']} class="w-100" >
          <h4>${item.title}</h4>
          <p>${item.author} ${new Date(item.pubDate).toLocaleDateString('en-IN')}</p>
          <p>${item.description}</p>
        `
        itemsDiv.append(div);
      });
}

async function main() {
  let dataList = await fetchNewsData();
  dataList.forEach((feed, index) => {
    addAccordionDOM(feed, index);
  });
  let sdada = document.querySelector(".accordion-item button")
  sdada.className = "accordion-button"
  sdada.ariaExpanded = "true"
  console.log(sdada);
  document.getElementById('collapse_0').className = "accordion-collapse collapse show"
}
main();
