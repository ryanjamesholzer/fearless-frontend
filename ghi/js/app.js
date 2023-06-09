function createCard(name, location, description, pictureUrl, starts, ends) {
    return `
      <div class="col">
        <div class="card" style="box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.35); margin: 20px;">
            <img src="${pictureUrl}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class="card-subtitle text-muted">${location}</h6>
                <p class="card-text">${description}</p>
                <footer class="card-footer">${starts}-${ends}</>
            </div>
        </div>
      </div>
    `;
  }


function errorAlert(e) {
    return `<div class="alert alert-danger" role="alert">${e}</div>`
}


window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      let e = "There has been an error!";
      const html = errorAlert(e);
      const error = document.querySelector('.row');
      error.innerHTML = html;
      // Figure out what to do when the response is bad
    } else {
      const data = await response.json();

      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const name = details.conference.name;
          const location = details.conference.location.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const starts = new Date(details.conference.starts).toLocaleDateString();
          const ends = new Date(details.conference.ends).toLocaleDateString();
          const html = createCard(name, location, description, pictureUrl, starts, ends);
          const column = document.querySelector('.row');
          column.innerHTML += html;
        }
      }

    }
  } catch (e) {
      console.error(e);
      const html = errorAlert(e);
      const error = document.querySelector('.row');
      error.innerHTML = html;

    // Figure out what to do if an error is raised
  }

});
