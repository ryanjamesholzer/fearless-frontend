function createCard(name, location, description, pictureUrl, starts, ends) {
    return `
      <div class="col-sm-6 col-md-4 mb-1">
        <div class="shadow-lg p-3 mb-5 bg-body rounded">
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


  window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error("There has been an error!")
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
            const startDate = new Date(details.conference.starts)
            const starts = `${startDate.getMonth()}/${startDate.getDate()}/${startDate.getFullYear()}`;
            const endDate = new Date(details.conference.ends);
            const ends = `${endDate.getMonth()}/${endDate.getDate()}/${endDate.getFullYear()}`;
            const html = createCard(name, location, description, pictureUrl, starts, ends);
            const column = document.querySelector('.row');
            column.innerHTML += html;
          }
        }

      }
    } catch (e) {
        return `
        <div class="alert alert-danger" role="alert">
            Something went wrong!
        </div>`
      // Figure out what to do if an error is raised
    }

  });
