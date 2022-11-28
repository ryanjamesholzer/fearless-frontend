window.addEventListener('DOMContentLoaded', async () => {


    const payloadCookie =  await cookieStore.get('jwt_access_payload');
    //console.log(payloadCookie);
    //console.log(typeof(payloadCookie));

    if (payloadCookie) {
        //const encodedPayload = JSON.parse(payloadCookie.value);

        const decodedPayload = atob(payloadCookie.value);

        const payload = JSON.parse(decodedPayload);

        console.log(payload);

        if (payload.user.perms.includes("events.add_conference") && payload.user.perms.includes("events.add_location") && payload.user.perms.includes("presentations.add_presentation")) {
            const locationLinkTag = document.getElementById('hidden-location');
            locationLinkTag.classList.remove("d-none");
            const conferenceLinkTag = document.getElementById('hidden-conference');
            conferenceLinkTag.classList.remove('d-none');
            const presentationLinkTag = document.getElementById('hidden-presentation');
            presentationLinkTag.classList.remove('d-none');
        }


    }
})
