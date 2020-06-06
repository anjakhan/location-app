function getPosition() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

function main() {
    getPosition().then(resp => {
        const lat = resp.coords.latitude;
        const lon = resp.coords.longitude;
        console.log(lat, lon)
        
        var map = L.map('map').setView([lat, lon], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var geocodeService = L.esri.Geocoding.geocodeService()
        geocodeService.reverse()
            .latlng([lat, lon])
            .run(function (error, result) {
                if (error) {
                return;
            }
            const myLoc = document.getElementById("myLoc");
            myLoc.textContent = result.address.Match_addr
            L.marker(result.latlng).addTo(map);
        });

        // map.on('click', function (e) {
        //     geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
        //     console.log(e.latlng)
        //         if (error) {
        //         return;
        //     }
        //     L.marker(result.latlng).addTo(map).bindPopup(result.address.Match_addr).openPopup();
        //     });
        // });
    });
}

main();