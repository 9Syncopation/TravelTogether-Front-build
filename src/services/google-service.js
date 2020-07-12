
export default {
    setWayPoint,
    getDirecService,
    getDirecRender,
    getWayPts,
    getRequest
}


function getDirecService(google) {
    return new google.maps.DirectionsService();
}

function getDirecRender(google) {
    return new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });
}

function setWayPoint(lat, lng, google) {
    return {
        location: new google.maps.LatLng(
            lat,
            lng
        ),
        stopover: true
    }
}

function getWayPts(markers, google) {
    let wayPts = [];
    markers.forEach((marker, idx) => {
        if (idx === 0 || idx === markers.length - 1) return;
        wayPts.push(
            setWayPoint(
                marker.position.lat,
                marker.position.lng,
                google
            )
        );
    });
    return wayPts;
}

function getRequest(origin, dest, wayPoints, google) {
    return {
        origin: setLatLng(
            origin.position.lat,
            origin.position.lng,
            google
        ),
        destination: setLatLng(
            dest.position.lat,
            dest.position.lng,
            google
        ),
        waypoints: wayPoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING
    };
}

function setLatLng(lat, lng, google) {
    return new google.maps.LatLng(
        lat,
        lng
    )
}

