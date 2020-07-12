export default{
    load,
    store
}

function load(key) {
    const json = sessionStorage.getItem(key);
    const value = JSON.parse(json)
    return value;
}

function store(key, value) {
    const json = JSON.stringify(value);
    sessionStorage.setItem(key, json)
}