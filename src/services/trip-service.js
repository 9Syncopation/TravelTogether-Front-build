import HttpService from './http-service'

export default {
    query,
    getById,
    update
}

function query() {
    return HttpService.get('api/trip')
}

function getById(tripId) {
    return HttpService.get(`api/trip/${tripId}`)
}

function update(trip) {
    return HttpService.put(`api/trip/update`,trip)
}