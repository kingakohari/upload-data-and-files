const formComponent = `
    <form id="form">
        <input type="text" name="title">
        <input type="file" name="picture">
        <button>Send</button>
    </form>
`;


function loadEvent() {
    console.log("hello")

    const rootElement = document.getElementById('root')
    rootElement.insertAdjacentHTML("beforeend", formComponent);

    const formElement = document.getElementById('form')
    formElement.addEventListener("submit", (e) =>{
        e.preventDefault();
        console.dir('e');

        const formData = new FormData();
        formData.append("title", e.target.querySelector(input[name="title"]).value);
        formData.append("picture", e.target.querySelector(input[name="picture"]).files[0]);

        const fetchSettings = {
            method: "POST",
            body: formData
        }

        fetch('/', fetchSettings)
            .then(async data => {
                if (data.status === 200){
                    const res = await data.json()
                    e.target.outerHTML = `<img src="${res.imageName}">`;
                    console.dir(data);
                }
            })
            .catch(error => {
                e.target.outerHTML= '${error}'
                console.dir(error);
            })
    });


}
window.addEventListener("load", loadEvent)