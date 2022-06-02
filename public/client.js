window.onload = () => {
    console.log('Client-side code running');

    const getButton = document.getElementById('getButton');
    const postButton = document.getElementById('postButton');
    const putButton = document.getElementById('putButton');
    const delButton = document.getElementById('delButton');

    getButton.addEventListener('click', function(getEvent) {
        console.log('get was requested');
        fetch('http://10.196.127.244:3000/api/courses', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => console.log(data));
    });

    // postButton.onclick = function () {

    // }

    postButton.addEventListener('click', function(postEvent) {
        console.log('post was requested');

        //https://stackoverflow.com/questions/29775797/fetch-post-json-data
        //correctly posting json file referenced vp_arth's answer (3rd from top)
        fetch('http://10.196.127.244:3000/api/courses/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: "new class" })

            })
            .then((response) => response.json())
            .then((data) => console.log(data));
    });

    putButton.addEventListener('click', function(putEvent) {
        console.log('put was requested');
        fetch('http://10.196.127.244:3000/api/courses/', { method: 'PUT' })
            .then((response) => response.json())
            .then((data) => console.log(data));
    });

    delButton.addEventListener('click', function(delEvent) {
        console.log('delete was requested');
        fetch('http://10.196.127.244:3000/api/courses/', { method: 'DELETE' })
            .then((response) => response.json())
            .then((data) => console.log(data));
    });
}