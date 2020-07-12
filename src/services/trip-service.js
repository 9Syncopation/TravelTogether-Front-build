import HttpService from './http-service'

export default {
    query,
    getById,
    update
}

function query() {
    return HttpService.get('trip')
}

function getById(tripId) {
    return HttpService.get(`trip/${tripId}`)
}

function update(trip) {
    return HttpService.put(`trip/update`,trip)
}