if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showGymsNearby, handleLocationError);
} else {
    document.getElementById('location-input').style.display = 'block';
}

function handleLocationError(error) {
    console.log("Geolocation error:", error.message);
    document.getElementById('location-input').style.display = 'block';
}

function showGymsNearby(position) {
    const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
    console.log("User location:", userLocation); 
    initializeMap(userLocation);
}

let selectedGyms = [];

function initializeMap(location) {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 15,
    });

    
    new google.maps.Marker({
        position: location,
        map: map,
        title: "Your Location",
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#00F",
            fillOpacity: 0.7,
            strokeWeight: 2,
            strokeColor: "#FFFFFF",
        },
    });

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
        {
            location: location,
            radius: 5000,
            type: "gym",
        },
        (results, status) => {
            console.log("Nearby gyms status:", status); 
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                results.forEach((place) => {
                    const marker = new google.maps.Marker({
                        position: place.geometry.location,
                        map: map,
                        title: place.name,
                    });

                    marker.addListener("click", () => {
                        addGymDetails(place.place_id, map);

                        
                        if (!selectedGyms.includes(place.place_id)) {
                            selectedGyms.push(place.place_id);
                            marker.setIcon({
                                url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                            });
                        }
                    });
                });
            } else {
                console.error("Nearby search failed:", status);
            }
        }
    );
}

function addGymDetails(placeId, map) {
    const service = new google.maps.places.PlacesService(map);

    
    service.getDetails(
        { placeId: placeId },
        (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const detailsDiv = document.getElementById("gym-details");
                detailsDiv.style.display = "grid"; 

                const gymInfo = document.createElement("div");
                gymInfo.className = "gym-info";

                const detailsContent = `
                    <h3>${place.name}</h3>
                    <p><strong>Address:</strong> ${place.vicinity}</p>
                    <p><strong>Rating:</strong> ${place.rating || 'N/A'}</p>
                    <p><strong>Phone:</strong> ${place.formatted_phone_number || 'N/A'}</p>
                    <p><strong>Website:</strong> ${place.website ? `<a href="${place.website}" target="_blank">${place.website}</a>` : 'N/A'}</p>
                    <p><strong>Facilities:</strong> ${place.types ? place.types.join(', ') : 'N/A'}</p>
                `;
                gymInfo.innerHTML = detailsContent;

                detailsDiv.appendChild(gymInfo); 
                detailsDiv.scrollIntoView({ behavior: "smooth" });
            } else {
                console.error("Place details request failed:", status);
            }
        }
    );
}

function findGymsByAddress() {
    const address = document.getElementById('location').value;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
            const location = results[0].geometry.location;
            initializeMap(location);
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}