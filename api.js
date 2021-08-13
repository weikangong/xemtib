export async function fetchExchange() {
    try {
    const res = await fetch("http://localhost:3334/volume");
    const json = await res.json();
    return json;
    } catch (err) {
        console.error(err);
        Promise.reject();
    }
}